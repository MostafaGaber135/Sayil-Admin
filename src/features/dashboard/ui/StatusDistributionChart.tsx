"use client";

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

import { useStatusDistribution } from "../hooks/dashboard.hooks";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export default function StatusDistributionChart() {
  const { data: series, isLoading } = useStatusDistribution();

  const labels = (series ?? []).map((x) => x.label);
  const values = (series ?? []).map((x) => x.value);

  const data: ChartData<"doughnut", number[], string> = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: [
          "#f59e0b",
          "#3b82f6",
          "#14b8a6",
          "#ef4444",
        ],
        borderWidth: 2,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Listing Status Distribution",
        align: "start",
        font: { size: 20, weight: "bold" },
        padding: { bottom: 20 },
      },
    },
    cutout: "65%",
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md h-[360px]">
      {isLoading ? (
        <div className="h-full w-full rounded-xl bg-slate-50 animate-pulse" />
      ) : (
        <Doughnut data={data} options={options} />
      )}
    </div>
  );
}