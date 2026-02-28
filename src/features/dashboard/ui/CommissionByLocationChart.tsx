"use client";

import { Card } from "@/shared/components/ui/card";
import type { LocationSeriesItem } from "@/features/dashboard/types";

function niceStep(max: number) {
  if (max <= 0) return 1;
  const raw = max / 4;
  const exp = Math.floor(Math.log10(raw));
  const base = Math.pow(10, exp);
  const frac = raw / base;
  const niceFrac = frac <= 1 ? 1 : frac <= 2 ? 2 : frac <= 5 ? 5 : 10;
  return niceFrac * base;
}

function formatK(v: number) {
  const abs = Math.abs(v);
  if (abs >= 1_000_000) return `${Math.round(v / 1_000_000)}M`;
  if (abs >= 1_000) return `${Math.round(v / 1_000)}K`;
  return `${Math.round(v)}`;
}

export default function CommissionByLocationChart({
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
        <div className="h-5 w-64 rounded bg-muted" />
        <div className="mt-4 h-[260px] animate-pulse rounded bg-muted" />
      </Card>
    );
  }

  const items = (data ?? []).slice(0, 10);
  const values = items.map((d) => d.value);
  const maxValue = Math.max(0, ...values);
  const step = niceStep(maxValue);
  const max = step * 4;
  const ticks = Array.from({ length: 5 }, (_, i) => i * step);

  const W = 980;
  const H = 260;
  const padL = 58;
  const padR = 18;
  const padT = 10;
  const padB = 34;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;

  const barCount = Math.max(1, items.length);
  const gap = 26;
  const barW = Math.max(18, (innerW - gap * (barCount - 1)) / barCount);

  return (
    <Card className="p-5">
      <div className="text-base font-semibold">{title}</div>

      {items.length === 0 ? (
        <div className="mt-6 text-sm text-muted-foreground">No data</div>
      ) : (
        <div className="mt-4">
          <svg viewBox={`0 0 ${W} ${H}`} className="h-[260px] w-full" role="img">
            {ticks.map((tv) => {
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
                    {formatK(tv)}
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
                  <rect x={x} y={y} width={barW} height={h} rx={10} fill="var(--brand-cyan)" />
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
