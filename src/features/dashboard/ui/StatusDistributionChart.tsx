"use client";

import { Card } from "@/shared/components/ui/card";
import type { StatusSeriesItem } from "@/features/dashboard/types";

const COLORS: Record<string, string> = {
  Pending: "var(--brand-orange)",
  Active: "var(--primary)",
  Sold: "var(--brand-cyan)",
  Rejected: "var(--brand-red)",
};

function normalizeStatusName(v: string) {
  const s = v.trim();
  const low = s.toLowerCase();
  if (low === "pending" || low === "pendingapproval" || low === "pending approvals") return "Pending";
  if (low === "active") return "Active";
  if (low === "sold" || low === "completed") return "Sold";
  if (low === "rejected" || low === "inactive") return "Rejected";
  return s;
}

function buildOrdered(items: StatusSeriesItem[]): StatusSeriesItem[] {
  const map = new Map<string, number>();
  for (const it of items) {
    const k = normalizeStatusName(String(it.status));
    map.set(k, (map.get(k) ?? 0) + (Number(it.value) || 0));
  }

  const orderedKeys = ["Pending", "Active", "Sold", "Rejected"];
  const out: StatusSeriesItem[] = [];
  for (const k of orderedKeys) {
    if (map.has(k)) out.push({ status: k, value: map.get(k) ?? 0 });
  }
  for (const [k, v] of map.entries()) {
    if (!orderedKeys.includes(k)) out.push({ status: k, value: v });
  }
  return out;
}

export default function StatusDistributionChart({
  title,
  data,
  isLoading,
}: {
  title: string;
  data: StatusSeriesItem[];
  isLoading?: boolean;
}) {
  if (isLoading) {
    return (
      <Card className="p-5">
        <div className="h-5 w-56 rounded bg-muted" />
        <div className="mt-4 h-[260px] animate-pulse rounded bg-muted" />
      </Card>
    );
  }

  const ordered = buildOrdered(data ?? []);
  const total = ordered.reduce((s, x) => s + (Number(x.value) || 0), 0);

  const size = 220;
  const stroke = 34;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;

  let offset = 0;

  return (
    <Card className="p-5">
      <div className="text-base font-semibold">{title}</div>

      {total <= 0 ? (
        <div className="mt-6 text-sm text-muted-foreground">No data</div>
      ) : (
        <div className="mt-4 flex h-[260px] flex-col items-center justify-center">
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={title}>
            <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
              <circle
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="transparent"
                stroke="var(--border)"
                strokeWidth={stroke}
              />
              {ordered.map((seg) => {
                const v = Number(seg.value) || 0;
                const portion = v / total;
                const dash = portion * c;
                const color = COLORS[String(seg.status)] ?? "var(--muted-foreground)";
                const el = (
                  <circle
                    key={String(seg.status)}
                    cx={size / 2}
                    cy={size / 2}
                    r={r}
                    fill="transparent"
                    stroke={color}
                    strokeWidth={stroke}
                    strokeDasharray={`${dash} ${c - dash}`}
                    strokeDashoffset={-offset}
                    strokeLinecap="butt"
                  />
                );
                offset += dash;
                return el;
              })}
            </g>
          </svg>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
            {ordered.map((seg) => {
              const color = COLORS[String(seg.status)] ?? "var(--muted-foreground)";
              return (
                <div key={String(seg.status)} className="flex items-center gap-2 text-muted-foreground">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
                  <span className="text-foreground">{String(seg.status)}</span>
                  <span>({Number(seg.value) || 0})</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Card>
  );
}
