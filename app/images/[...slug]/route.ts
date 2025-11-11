const escapeSvg = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const buildSvg = (label: string) => {
  const width = 640;
  const height = 360;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="${width}" height="${height}" fill="#111827" rx="24" />
  <rect x="20" y="20" width="${width - 40}" height="${height - 40}" rx="18" fill="#1f2937" stroke="#374151" stroke-width="2" />
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#9ca3af" font-family="Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="22">${escapeSvg(
    label
  )}</text>
</svg>`;
};

export function GET(
  _request: Request,
  { params }: { params: { slug?: string[] } }
) {
  const slug = params.slug?.join("/") || "placeholder";
  const label =
    slug.length > 42 ? `${slug.slice(0, 39).trimEnd()}…` : slug || "placeholder";
  const svg = buildSvg(label);
  return new Response(svg, {
    status: 200,
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=86400, immutable",
    },
  });
}
