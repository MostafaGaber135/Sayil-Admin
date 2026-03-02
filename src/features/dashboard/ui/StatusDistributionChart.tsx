"use client";

import { useMemo } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  type ChartData,
  type ChartOptions,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

import type { StatusSeriesItem } from "@/features/dashboard/types";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

type Props = {
  title: string;
  data: StatusSeriesItem[];
  isLoading?: boolean;
};

export default function StatusDistributionChart({
  title,
  data: series,
  isLoading,
}: Props) {
  const labels = useMemo(
    () => (series ?? []).map((x) => String(x.label ?? x.status ?? "")),
    [series]
  );
  const values = useMemo(() => (series ?? []).map((x) => x.value), [series]);

  const chartData = useMemo<ChartData<"doughnut", number[], string>>(
    () => ({
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: ["#f59e0b", "#3b82f6", "#14b8a6", "#ef4444"],
          borderWidth: 2,
        },
      ],
    }),
    [labels, values]
  );

  const options = useMemo<ChartOptions<"doughnut">>(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: title,
          align: "start",
          font: { size: 20, weight: "bold" },
          padding: { bottom: 20 },
        },

        tooltip: {
          callbacks: {
            label: (ctx) => {
              const label = ctx.label ?? "";
              const v = Number(ctx.parsed ?? 0);
              return `• ${label} (${v})`;
            },
          },
        },

        legend: {
          position: "bottom",
          labels: {
            usePointStyle: true,
            pointStyle: "circle",
            boxWidth: 10,
            boxHeight: 10,
            padding: 18,
            generateLabels: (chart) => {
              const dataset = chart.data.datasets[0];
              const dataArr = (dataset?.data ?? []) as unknown as number[];
              const bgArr = (dataset?.backgroundColor ?? []) as string[] | string;

              return (chart.data.labels ?? []).map((l, i) => {
                const textLabel = String(l ?? "");
                const v = Number(dataArr[i] ?? 0);

                const fillStyle = Array.isArray(bgArr) ? bgArr[i] : bgArr;

                return {
                  text: `${textLabel} (${Number.isFinite(v) ? v : 0})`,
                  fillStyle,
                  strokeStyle: fillStyle,
                  lineWidth: 0,
                  hidden: !chart.getDataVisibility(i),
                  index: i,
                };
              });
            },
          },
          onClick: (e, legendItem, legend) => {
            const index = legendItem.index;
            if (index === undefined) return;
            legend.chart.toggleDataVisibility(index);
            legend.chart.update();
          },
        },
      },

      cutout: "65%",
    }),
    [title]
  );

  const hasData =
    labels.length > 0 && values.some((v) => Number.isFinite(v) && v > 0);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md h-[360px]">
      {isLoading ? (
        <div className="h-full w-full rounded-xl bg-slate-50 animate-pulse" />
      ) : hasData ? (
        <Doughnut data={chartData} options={options} />
      ) : (
        <div className="text-sm text-muted-foreground">No data</div>
      )}
    </div>
  );
}