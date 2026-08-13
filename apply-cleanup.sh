#!/usr/bin/env bash
set -euo pipefail

if [ ! -f "package.json" ] || [ ! -d "src" ]; then
  echo "ERROR: Jalankan script ini dari root repository project."
  exit 1
fi

echo "[1/4] Menghapus komponen admin yang sudah tidak dipakai..."
rm -f \
  "src/components/admin/AdminAddProductPage.tsx" \
  "src/components/admin/AdminDeleteProductPage.tsx" \
  "src/components/admin/AdminStockPage.tsx" \
  "src/components/admin/AdminWalletTopups.tsx"

echo "[2/4] Menghapus route fitur admin produk..."
rm -rf "src/app/(admin)/admin/panel/products"

echo "[3/4] Menghapus API admin saldo/produk/testimoni..."
rm -rf \
  "src/app/api/qevanora-admin/products" \
  "src/app/api/qevanora-admin/testimonials" \
  "src/app/api/qevanora-admin/topups"

echo "[4/4] Membersihkan icon yang sudah benar-benar tidak direferensikan..."
for icon in product.svg testimonial.svg dollar-line.svg; do
  icon_path="src/icons/$icon"

  if [ -f "$icon_path" ]; then
    if grep -R -F "$icon" src \
      --exclude="$icon" \
      --exclude-dir=node_modules \
      --exclude-dir=.next \
      >/dev/null 2>&1; then
      echo "KEEP: $icon_path masih dipakai file lain."
    else
      rm -f "$icon_path"
      echo "DELETE: $icon_path"
    fi
  fi
done

echo
echo "Cleanup selesai."
echo "Jalankan: npm run build"
echo "Lalu cek: git status"
