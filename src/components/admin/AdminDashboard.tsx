import type { MemberSummary } from "@/lib/member-stats";
import type { VisitorSummary } from "@/lib/visitor-stats";

type AdminDashboardProps = {
  initialVisitorSummary: VisitorSummary;
  initialMemberSummary: MemberSummary;
  initialError?: string;
};

function formatNumber(value: number): string {
  return new Intl.NumberFormat("id-ID").format(Math.max(0, Number(value) || 0));
}

function MetricIcon({
  type,
}: {
  type: "visitors" | "today" | "members" | "new-members";
}) {
  if (type === "members" || type === "new-members") {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="12"
          cy="8"
          r="4"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M4 21a8 8 0 0 1 16 0"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        {type === "new-members" && (
          <path
            d="M18 4v4M16 6h4"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        )}
      </svg>
    );
  }

  if (type === "today") {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="3"
          y="5"
          width="18"
          height="16"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M16 3v4M8 3v4M3 10h18"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="12"
        r="2.5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function MetricCard({
  label,
  value,
  description,
  icon,
}: {
  label: string;
  value: number;
  description: string;
  icon: "visitors" | "today" | "members" | "new-members";
}) {
  return (
    <article className="relative min-w-0 overflow-hidden rounded-3xl border border-brand-500/15 bg-gradient-to-br from-white/[0.045] to-white/[0.015] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.18)]">
      <div className="pointer-events-none absolute -right-10 -top-12 h-28 w-28 rounded-full bg-brand-500/10 blur-3xl" />

      <div className="relative flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">
            {label}
          </p>
          <p className="mt-3 truncate text-3xl font-bold text-white sm:text-4xl">
            {formatNumber(value)}
          </p>
        </div>

        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-brand-500/20 bg-brand-500/10 text-brand-300">
          <MetricIcon type={icon} />
        </span>
      </div>

      <p className="relative mt-4 text-xs leading-5 text-gray-500">
        {description}
      </p>
    </article>
  );
}

export default function AdminDashboard({
  initialVisitorSummary,
  initialMemberSummary,
  initialError,
}: AdminDashboardProps) {
  return (
    <main className="min-w-0">
      <section className="relative overflow-hidden rounded-3xl border border-brand-500/15 bg-[#031126] p-5 text-white shadow-[0_20px_70px_rgba(0,0,0,0.24)] sm:p-7">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(214,166,47,0.12),transparent_38%)]" />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold tracking-[0.22em] text-brand-300">
              QEVANORA OFFICIAL
            </p>
            <h1 className="mt-2 text-2xl font-black sm:text-3xl">
              Admin Panel
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400">
              Dashboard statistik website dan anggota.
            </p>
          </div>

          <form action="/api/qevanora-admin/logout" method="post">
            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-brand-500 px-5 text-sm font-black text-[#031126] transition hover:bg-brand-400"
            >
              Keluar
            </button>
          </form>
        </div>
      </section>

      {initialError && (
        <div
          role="alert"
          className="mt-5 rounded-2xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-300"
        >
          {initialError}
        </div>
      )}

      <section className="mt-6 grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Total Pengunjung"
          value={initialVisitorSummary.totalVisitors}
          description="Total visitor yang tercatat."
          icon="visitors"
        />
        <MetricCard
          label="Pengunjung Hari Ini"
          value={initialVisitorSummary.todayVisitors}
          description="Visitor yang tercatat hari ini."
          icon="today"
        />
        <MetricCard
          label="Total Anggota"
          value={initialMemberSummary.totalMembers}
          description="Total akun anggota terdaftar."
          icon="members"
        />
        <MetricCard
          label="Anggota Baru Hari Ini"
          value={initialMemberSummary.newMembersToday}
          description="Pendaftaran anggota baru hari ini."
          icon="new-members"
        />
      </section>

      <section className="mt-6 grid min-w-0 grid-cols-1 gap-6 xl:grid-cols-2">
        <article className="min-w-0 rounded-3xl border border-brand-500/15 bg-[#031126] p-5 text-white sm:p-7">
          <h2 className="text-lg font-bold">Traffic 7 Hari</h2>
          <p className="mt-1 text-sm text-gray-500">
            Ringkasan pengunjung website selama tujuh hari terakhir.
          </p>

          <div className="mt-5 space-y-3">
            {initialVisitorSummary.last7Days.length > 0 ? (
              initialVisitorSummary.last7Days.map((item) => (
                <div
                  key={item.date}
                  className="flex items-center justify-between gap-4 rounded-xl border border-white/5 bg-white/[0.025] px-4 py-3"
                >
                  <span className="text-sm text-gray-400">{item.date}</span>
                  <span className="text-sm font-bold text-white">
                    {formatNumber(item.visitors)}
                  </span>
                </div>
              ))
            ) : (
              <p className="rounded-xl border border-white/5 bg-white/[0.025] px-4 py-5 text-sm text-gray-500">
                Belum ada data traffic.
              </p>
            )}
          </div>
        </article>

        <article className="min-w-0 rounded-3xl border border-brand-500/15 bg-[#031126] p-5 text-white sm:p-7">
          <h2 className="text-lg font-bold">Anggota 7 Hari</h2>
          <p className="mt-1 text-sm text-gray-500">
            Ringkasan pendaftaran anggota selama tujuh hari terakhir.
          </p>

          <div className="mt-5 space-y-3">
            {initialMemberSummary.last7Days.length > 0 ? (
              initialMemberSummary.last7Days.map((item) => (
                <div
                  key={item.date}
                  className="flex items-center justify-between gap-4 rounded-xl border border-white/5 bg-white/[0.025] px-4 py-3"
                >
                  <span className="text-sm text-gray-400">{item.date}</span>
                  <span className="text-sm font-bold text-white">
                    {formatNumber(item.members)}
                  </span>
                </div>
              ))
            ) : (
              <p className="rounded-xl border border-white/5 bg-white/[0.025] px-4 py-5 text-sm text-gray-500">
                Belum ada data anggota.
              </p>
            )}
          </div>
        </article>
      </section>
    </main>
  );
}
