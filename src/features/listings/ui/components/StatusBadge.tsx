import { STATUS, StatusKey } from "../../constants";

interface Props {
    statusId: number;
    statusLabel: string;
}

export const StatusBadge = ({ statusId, statusLabel }: Props) => {
    const color =
        STATUS[statusId as StatusKey]?.color ?? "bg-gray-100 text-gray-600";

    return (
        <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${color}`}>
      {statusLabel}
    </span>
    );
};
