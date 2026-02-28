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

  const options = useMemo<ChartOptions<"bar">>(
    () => ({
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
              return `Commission: ${Math.round(v / 1000)}K`;
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 1000000,
          ticks: {
            stepSize: 250000,
            callback: (value) => `${Number(value) / 1000}K`,
          },
        },
        x: {
          grid: { display: false },
        },
      },
    }),
    [title]
  );

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