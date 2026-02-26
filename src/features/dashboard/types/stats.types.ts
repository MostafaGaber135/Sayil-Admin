import type { ReactNode } from "react";

export type StatCardProps = {
  title: string;
  value: string | number;
  changeText: string;
  subText: string;
  icon?: ReactNode;
  iconBgClassName?: string;
  changeClassName?: string;
};
