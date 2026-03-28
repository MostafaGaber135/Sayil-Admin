interface Props {
    label: string;
    value: React.ReactNode;
}

export const InfoRow = ({ label, value }: Props) => (
    <div className="flex items-start justify-between py-3 border-b border-gray-50 last:border-0">
        <span className="text-sm text-gray-400 shrink-0 w-40">{label}</span>
        <span className="text-sm text-gray-800 font-medium text-right">{value}</span>
    </div>
);
