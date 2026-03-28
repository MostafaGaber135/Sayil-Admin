"use client";

import { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
  type Plugin,
  type TooltipItem,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import type { LocationSeriesItem } from "@/features/dashboard/types";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type Props = {
  title: string;
  data: LocationSeriesItem[];
  isLoading?: boolean;
};

const chartAreaBorder: Plugin<"bar"> = {
  id: "chartAreaBorder",
  afterDraw(chart) {
    const { ctx, chartArea } = chart;
    if (!chartArea) return;

    const { left, top, right, bottom } = chartArea;

    ctx.save();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(15, 23, 42, 0.35)";

    ctx.beginPath();
    ctx.moveTo(left, top);
    ctx.lineTo(left, bottom);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(left, bottom);
    ctx.lineTo(right, bottom);
    ctx.stroke();

    ctx.restore();
  },
};

export default function CommissionByLocationChart({
  title,
  data: series,
  isLoading,
}: Props) {
  const labels = useMemo(() => (series ?? []).map((x) => x.label), [series]);
  const values = useMemo(() => (series ?? []).map((x) => x.value), [series]);

  const data = useMemo<ChartData<"bar", number[], string>>(
    () => ({
      labels,
      datasets: [
        {
          label: "Commission",
          data: values,
          backgroundColor: "#4fbfc8",
          borderRadius: {
            topLeft: 6,
            topRight: 6,
            bottomLeft: 0,
            bottomRight: 0,
          },
          borderSkipped: false,
          barThickness: 120,
          maxBarThickness: 140,
          categoryPercentage: 0.8,
          barPercentage: 0.9,
        },
      ],
    }),
    [labels, values]
  );

  const options = useMemo<ChartOptions<"bar">>(() => {
    const maxValue = values.length ? Math.max(...values) : 100;
    const yMax = maxValue <= 0 ? 100 : maxValue;
    const stepSize = Math.max(1, Math.ceil(yMax / 4));

    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: title,
          align: "start",
          font: { size: 20, weight: "bold" },
          padding: { bottom: 20 },
        },
        tooltip: {
          callbacks: {
            label: (ctx: TooltipItem<"bar">) => {
              const v = ctx.parsed.y ?? 0;
              if (v >= 1_000_000) return `Commission: ${(v / 1_000_000).toFixed(1)}M`;
              if (v >= 1_000) return `Commission: ${Math.round(v / 1_000)}K`;
              return `Commission: ${v}`;
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: yMax,
          ticks: {
            stepSize,
            callback: (value) => {
              const n = Number(value);
              if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
              if (n >= 1_000) return `${Math.round(n / 1_000)}K`;
              return `${n}`;
            },
          },
        },
        x: {
          grid: { display: false },
        },
      },
    };
  }, [title, values]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md h-[420px]">
      {isLoading ? (
        <div className="h-full w-full rounded-xl bg-slate-50 animate-pulse" />
      ) : (
        <Bar data={data} options={options} plugins={[chartAreaBorder]} />
      )}
    </div>
  );
}