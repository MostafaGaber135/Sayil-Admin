"use client";

import { Card } from "@/shared/components/ui/card";
import type { LocationSeriesItem } from "@/features/dashboard/types";

function niceMax(v: number) {
  if (v <= 0) return 1;
  const exp = Math.floor(Math.log10(v));
  const base = Math.pow(10, exp);
  const frac = v / base;
  const niceFrac = frac <= 1 ? 1 : frac <= 2 ? 2 : frac <= 5 ? 5 : 10;
  return niceFrac * base;
}

function ticks(max: number, count = 5) {
  const step = max / (count - 1);
  return Array.from({ length: count }, (_, i) => Math.round(i * step));
}

export default function ListingsByLocationChart({
  title,
  data,
  isLoading,
}: {
  title: string;
  data: LocationSeriesItem[];
  isLoading?: boolean;
}) {
  if (isLoading) {
    return (
      <Card className="p-5">
        <div className="h-5 w-48 rounded bg-muted" />
        <div className="mt-4 h-[260px] animate-pulse rounded bg-muted" />
      </Card>
    );
  }

  const items = (data ?? []).slice(0, 8);
  const values = items.map((d) => d.value);
  const max = niceMax(Math.max(0, ...values));
  const t = ticks(max, 5);


  const W = 760;
  const H = 260;
  const padL = 52;
  const padR = 18;
  const padT = 10;
  const padB = 34;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;

  const barCount = Math.max(1, items.length);
  const gap = 18;
  const barW = Math.max(18, (innerW - gap * (barCount - 1)) / barCount);

  return (
    <Card className="p-5">
      <div className="text-base font-semibold">{title}</div>

      {items.length === 0 ? (
        <div className="mt-6 text-sm text-muted-foreground">No data</div>
      ) : (
        <div className="mt-4">
          <svg viewBox={`0 0 ${W} ${H}`} className="h-[260px] w-full" role="img">
            {t.map((tv) => {
              const y = padT + innerH - (tv / max) * innerH;
              return (
                <g key={tv}>
                  <line
                    x1={padL}
                    x2={W - padR}
                    y1={y}
                    y2={y}
                    stroke="var(--border)"
                    strokeDasharray="2 4"
                  />
                  <text
                    x={padL - 10}
                    y={y + 4}
                    textAnchor="end"
                    fontSize="12"
                    fill="var(--muted-foreground)"
                  >
                    {tv}
                  </text>
                </g>
              );
            })}

            {items.map((d, i) => {
              const x = padL + i * (barW + gap);
              const h = (d.value / max) * innerH;
              const y = padT + innerH - h;
              return (
                <g key={d.label}>
                  <rect x={x} y={y} width={barW} height={h} rx={8} fill="var(--primary)" />
                  <text
                    x={x + barW / 2}
                    y={padT + innerH + 22}
                    textAnchor="middle"
                    fontSize="12"
                    fill="var(--muted-foreground)"
                  >
                    {d.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      )}
    </Card>
  );
}
