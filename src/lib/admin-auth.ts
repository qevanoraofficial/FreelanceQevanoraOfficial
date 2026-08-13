import {
  createHmac,
  randomBytes,
  scryptSync,
  timingSafeEqual,
} from "node:crypto";

export const ADMIN_SESSION_COOKIE = "qevanora_admin_session_v2";
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 8;

const PASSWORD_SALT = "b0dd08be7da0ee73f5acb20c14fd392c";
const PASSWORD_HASH =
  "3297dba8a2af8561a2d94ba6dbfb7d14dcb33b7ff618a7a16938272844bc81f7096e17cec4ce9844c8841763600b69d7c6420dacab0a4ddae78f6aad9b0e654b";

type AdminSessionPayload = {
  version: 2;
  expiresAt: number;
  nonce: string;
};

function getSessionSecret(): string {
  const secret =
    process.env.ADMIN_SESSION_SECRET || process.env.ORDER_SESSION_SECRET || "";

  if (secret.length < 32) {
    throw new Error(
      "ADMIN_SESSION_SECRET atau ORDER_SESSION_SECRET wajib minimal 32 karakter.",
    );
  }

  return secret;
}

function sign(value: string): string {
  return createHmac("sha256", getSessionSecret())
    .update(value)
    .digest("base64url");
}

function safeEqual(first: string, second: string): boolean {
  const firstBuffer = Buffer.from(first);
  const secondBuffer = Buffer.from(second);

  return (
    firstBuffer.length === secondBuffer.length &&
    timingSafeEqual(firstBuffer, secondBuffer)
  );
}

export function verifyAdminPassword(password: string): boolean {
  const calculatedHash = scryptSync(password, PASSWORD_SALT, 64);
  const expectedHash = Buffer.from(PASSWORD_HASH, "hex");

  return (
    calculatedHash.length === expectedHash.length &&
    timingSafeEqual(calculatedHash, expectedHash)
  );
}

export function createAdminSessionToken(): string {
  const payload: AdminSessionPayload = {
    version: 2,
    expiresAt: Date.now() + ADMIN_SESSION_MAX_AGE * 1000,
    nonce: randomBytes(18).toString("hex"),
  };

  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString(
    "base64url",
  );

  return `${encodedPayload}.${sign(encodedPayload)}`;
}

export function verifyAdminSessionToken(token?: string | null): boolean {
  if (!token) {
    return false;
  }

  const [encodedPayload, signature, ...rest] = token.split(".");

  if (!encodedPayload || !signature || rest.length > 0) {
    return false;
  }

  try {
    if (!safeEqual(signature, sign(encodedPayload))) {
      return false;
    }

    const payload = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf8"),
    ) as Partial<AdminSessionPayload>;

    return (
      payload.version === 2 &&
      typeof payload.expiresAt === "number" &&
      payload.expiresAt > Date.now() &&
      typeof payload.nonce === "string" &&
      payload.nonce.length >= 16
    );
  } catch {
    return false;
  }
}
