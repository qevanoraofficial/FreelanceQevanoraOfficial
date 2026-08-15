#!/usr/bin/env bash
set -euo pipefail

if [ ! -f "package.json" ] || [ ! -d "src" ]; then
  echo "ERROR: Jalankan dari root repository."
  exit 1
fi

rm -rf \
  "src/app/(admin)/admin/panel/products" \
  "src/app/(admin)/qevanora-control/panel/products" \
  "src/app/api/qevanora-admin/products" \
  "src/app/api/qevanora-admin/testimonials" \
  "src/app/api/qevanora-admin/topups"

rm -f \
  "src/components/admin/AdminAddProductPage.tsx" \
  "src/components/admin/AdminDeleteProductPage.tsx" \
  "src/components/admin/AdminStockPage.tsx" \
  "src/components/admin/AdminWalletTopups.tsx" \
  "src/icons/dollar-line.svg"

for icon in product.svg testimonial.svg; do
  icon_path="src/icons/$icon"
  if [ -f "$icon_path" ]; then
    if grep -R -F "$icon" src --exclude="$icon" --exclude-dir=.next --exclude-dir=node_modules >/dev/null 2>&1; then
      echo "KEEP: $icon_path masih dipakai."
    else
      rm -f "$icon_path"
      echo "DELETE: $icon_path"
    fi
  fi
done

bad=0
for token in AdminAddProductPage AdminDeleteProductPage AdminStockPage AdminWalletTopups dollar-line.svg DollarLineIcon; do
  if grep -R -n -F "$token" src --exclude-dir=.next --exclude-dir=node_modules >/tmp/qevanora_refs.txt 2>/dev/null; then
    echo "MASIH ADA REFERENSI: $token"
    cat /tmp/qevanora_refs.txt
    bad=1
  fi
done

if [ "$bad" -ne 0 ]; then
  echo "STOP: masih ada referensi yatim."
  exit 2
fi

echo "Cleanup selesai. Jalankan: npm run build"
