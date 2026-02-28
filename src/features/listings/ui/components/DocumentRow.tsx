import {ListingDocument} from "@/features/listings";


interface Props {
    document: ListingDocument;
}

export const DocumentRow = ({ document }: Props) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 flex-shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            </div>
            <div>
                <p className="text-sm font-medium text-gray-800">{document.name}</p>
                <p className={`text-xs font-medium ${document.isAvailable ? "text-green-600" : "text-gray-400"}`}>
                    {document.isAvailable ? "Available" : "Not Available"}
                </p>
            </div>
        </div>

        {document.isAvailable && document.url && (
            <div className="flex items-center gap-2">
                <a
                    href={document.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 text-xs font-medium text-gray-600 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors"
                >
                    View
                </a>
                <a
                    href={document.url}
                    download
                    className="px-3 py-1.5 text-xs font-medium text-gray-600 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors"
                >
                    Download
                </a>
            </div>
        )}
    </div>
);