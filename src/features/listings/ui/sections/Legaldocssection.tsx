'use client';
import { UseFormSetValue, UseFormWatch, FieldErrors } from "react-hook-form";
import {ListingFormValues} from "@/features/listings/validation";


interface Props {
    setValue: UseFormSetValue<ListingFormValues>;
    watch: UseFormWatch<ListingFormValues>;
    errors: FieldErrors<ListingFormValues>;
}

export const LegalDocsSection = ({ setValue, watch, errors }: Props) => {
    return (
        <div className="space-y-4">
            <DocUploader
                label="Title Deed"
                required
                fieldName="titleDeedUrl"
                currentUrl={watch("titleDeedUrl")}
                error={errors.titleDeedUrl?.message}
                onUpload={(url) => setValue("titleDeedUrl", url)}
            />
            <DocUploader
                label="National ID Copy"
                required
                fieldName="nationalIdCopyUrl"
                currentUrl={watch("nationalIdCopyUrl")}
                error={errors.nationalIdCopyUrl?.message}
                onUpload={(url) => setValue("nationalIdCopyUrl", url)}
            />
            <DocUploader
                label="Land Survey Report"
                required
                fieldName="landSurveyReportUrl"
                currentUrl={watch("landSurveyReportUrl")}
                error={errors.landSurveyReportUrl?.message}
                onUpload={(url) => setValue("landSurveyReportUrl", url)}
            />
        </div>
    );
};

// ── Reusable Doc Uploader ──
interface DocUploaderProps {
    label: string;
    required?: boolean;
    fieldName: string;
    currentUrl?: string;
    error?: string;
    onUpload: (url: string) => void;
}

const DocUploader = ({ label, required, currentUrl, error, onUpload }: DocUploaderProps) => {

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        // const formData = new FormData();
        // formData.append("file", file);
        // const { data } = await axios.post("/api/upload", formData);
        // onUpload(data.url);
    };

    const isUploaded = !!currentUrl;

    return (
        <div className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl bg-gray-50/50">

            {/* Icon */}
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${isUploaded ? "bg-green-100" : "bg-gray-100"}`}>
                {isUploaded
                    ? <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    : <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                }
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-gray-700">{label}</p>
                    {required && <span className="text-xs bg-red-50 text-red-500 px-2 py-0.5 rounded-full">Required</span>}
                </div>
                {isUploaded
                    ? <p className="text-xs text-green-600 truncate mt-0.5">{currentUrl}</p>
                    : <p className="text-xs text-gray-400 mt-0.5">PDF, JPG, PNG (Max 10MB)</p>
                }
                {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
            </div>

            {/* Upload Button */}
            <label className={`flex-shrink-0 px-4 py-2 text-xs font-medium rounded-lg cursor-pointer transition-colors
        ${isUploaded
                ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                : "bg-gray-900 text-white hover:bg-black"
            }`}>
                {isUploaded ? "Replace" : "Upload Document"}
                <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={handleChange} />
            </label>

        </div>
    );
};
