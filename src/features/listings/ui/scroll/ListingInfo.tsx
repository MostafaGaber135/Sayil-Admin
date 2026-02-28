interface Props {
    title: string;
    city: string;
    region: string;
}

export const ListingInfo = ({ title, city, region }: Props) => (
    <div className="mb-5 pb-4 border-b border-gray-100">
        <p className="font-medium text-gray-900 line-clamp-1">{title}</p>
        <p className="text-sm text-gray-400 mt-0.5">
            {city}, {region}
        </p>
    </div>
);