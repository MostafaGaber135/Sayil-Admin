'use client';
import { useFormContext } from "react-hook-form";
import { ListingFormValues } from "@/features/listings/validation";

// FIX: No more props drilling — reads form state from context
export const BasicInfoSection = () => {
    const { register, formState: { errors } } = useFormContext<ListingFormValues>();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Title */}
            <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-medium text-gray-700">
                    Title <span className="text-red-500">*</span>
                </label>
                <input
                    {...register("title")}
                    placeholder="e.g. Residential land in North Riyadh"
                    className={inputCls(!!errors.title)}
                />
                <FieldError message={errors.title?.message} />
            </div>

            {/* Description */}
            <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-medium text-gray-700">Description</label>
                <textarea
                    {...register("description")}
                    rows={4}
                    placeholder="Describe the property..."
                    className={inputCls(false) + " resize-none"}
                />
            </div>

            {/* Area */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                    Area (m²) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <input
                        {...register("area")}
                        type="number"
                        placeholder="0"
                        className={inputCls(!!errors.area) + " pr-12"}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium">m²</span>
                </div>
                <FieldError message={errors.area?.message} />
            </div>

            {/* Price */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                    Price (SAR) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <input
                        {...register("price")}
                        type="number"
                        placeholder="0"
                        className={inputCls(!!errors.price) + " pr-14"}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium">SAR</span>
                </div>
                <FieldError message={errors.price?.message} />
            </div>

        </div>
    );
};

const inputCls = (hasError: boolean) =>
    `w-full bg-gray-50/50 border ${hasError ? "border-red-400" : "border-gray-200"} 
   text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500/20 
   focus:border-blue-500 block p-3 outline-none transition-all placeholder:text-gray-400`;

const FieldError = ({ message }: { message?: string }) =>
    message ? <p className="text-red-500 text-xs">{message}</p> : null;