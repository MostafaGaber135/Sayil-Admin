'use client';
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { useState } from "react";
import {useUploadImages} from "@/features/listings";
import {ListingFormValues} from "@/features/listings/validation";


interface Props {
    setValue: UseFormSetValue<ListingFormValues>;
    watch: UseFormWatch<ListingFormValues>;
}

export const MediaSection = ({ setValue, watch }: Props) => {
    const imageUrls = watch("imageUrls") ?? [];
    const videoUrl  = watch("explanatoryVideoUrl");
    const [isDragging, setIsDragging] = useState(false);

    const { mutate: uploadImages, isPending: isUploading } = useUploadImages();

    const handleUpload = (files: File[]) => {
        if (!files.length) return;
        uploadImages(files, {
            onSuccess: (urls) => {
                setValue("imageUrls", [...imageUrls, ...urls]);
            },
        });
    };

    // ── Drag Events ──
    const handleDragOver  = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true);  };
    const handleDragLeave = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); };
    const handleDrop      = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith("image/"));
        handleUpload(files);
    };

    // ── Click to Browse ──
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? []);
        handleUpload(files);
    };

    return (
        <div className="space-y-6">

            {/* Images Upload */}
            <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">Upload Images</label>

                {/* Drop Zone */}
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`flex flex-col items-center justify-center w-full h-36 border-2 border-dashed rounded-xl transition-all
            ${isDragging
                        ? "border-blue-400 bg-blue-50"
                        : "border-gray-200 hover:border-blue-400 hover:bg-blue-50/30"
                    }
            ${isUploading ? "opacity-60 pointer-events-none" : "cursor-pointer"}
          `}
                >
                    {isUploading ? (
                        <p className="text-sm text-blue-500 animate-pulse">Uploading...</p>
                    ) : (
                        <label className="flex flex-col items-center gap-2 cursor-pointer w-full h-full justify-center">
                            <svg className={`w-8 h-8 transition-colors ${isDragging ? "text-blue-400" : "text-gray-300"}`}
                                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p className={`text-sm transition-colors ${isDragging ? "text-blue-500" : "text-gray-400"}`}>
                                {isDragging ? "Drop images here" : "Click to upload or drag and drop"}
                            </p>
                            <p className="text-xs text-gray-300">PNG, JPG, WEBP — min 3 images</p>
                            <input type="file" multiple accept="image/*" className="hidden" onChange={handleInputChange} />
                        </label>
                    )}
                </div>

                {/* Preview */}
                {imageUrls.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {imageUrls.map((url, i) => (
                            <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200">
                                <img src={url} alt="" className="w-full h-full object-cover" />
                                <button
                                    type="button"
                                    onClick={() => setValue("imageUrls", imageUrls.filter((_, j) => j !== i))}
                                    className="absolute top-1 right-1 bg-black/50 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs hover:bg-red-500 transition-colors"
                                >×</button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Counter */}
                <p className={`text-xs ${imageUrls.length >= 3 ? "text-green-500" : "text-gray-400"}`}>
                    {imageUrls.length} / 3 minimum images {imageUrls.length >= 3 ? "✓" : "required"}
                </p>
            </div>


            <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">Upload Explanatory Video</label>
                <label className="flex items-center gap-4 w-full p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-all group">
                    <div className="w-10 h-10 bg-gray-100 group-hover:bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors">
                        <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                  d="M15 10l4.553-2.276A1 1 0 0121 8.723v6.554a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                        {videoUrl
                            ? <p className="text-sm text-blue-600 truncate">{videoUrl}</p>
                            : <>
                                <p className="text-sm text-gray-500">Choose Video File</p>
                                <p className="text-xs text-gray-300">MP4, MOV, AVI (Max 100MB)</p>
                            </>
                        }
                    </div>
                    <input type="file" accept="video/*" className="hidden" onChange={(e) => {

                    }} />
                </label>
            </div>

        </div>
    );
};
