interface Props {
    title: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
    className?: string;
}

export const Section = ({ title, icon, children, className = "" }: Props) => (
    <div className={`bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden ${className}`}>
        <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-2">
            {icon && <span className="text-gray-400">{icon}</span>}
            <h2 className="text-sm font-semibold text-gray-800">{title}</h2>
        </div>
        <div className="px-6 py-5">{children}</div>
    </div>
);
