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
} from "chart.js";
import { Bar } from "react-chartjs-2";

import type { LocationSeriesItem } from "@/features/dashboard/types";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type Props = {
  title: string;
  data: LocationSeriesItem[];
  isLoading?: boolean;
};

export default function ListingsByLocationChart({
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
          label: "Listings",
          data: values,
          backgroundColor: "#3b82f6",
          borderRadius: {
            topLeft: 6,
            topRight: 6,
          },
          borderSkipped: false,
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
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 600,
          ticks: { stepSize: 150 },
        },
        x: {
          grid: { display: false },
        },
      },
    }),
    [title]
  );

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md h-[360px]">
      {isLoading ? (
        <div className="h-full w-full rounded-xl bg-slate-50 animate-pulse" />
      ) : (
        <Bar data={data} options={options} />
      )}
    </div>
  );
}