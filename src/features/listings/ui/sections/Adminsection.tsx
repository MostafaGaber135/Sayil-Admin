'use client';
import { UseFormRegister, FieldErrors, UseFormWatch } from "react-hook-form";
import { ListingFormValues } from "../../validation";
import { ListingLookupsResponse } from "../..";


interface Props {
    register: UseFormRegister<ListingFormValues>;
    errors: FieldErrors<ListingFormValues>;
    watch: UseFormWatch<ListingFormValues>;
    lookups?: ListingLookupsResponse;

}

export const AdminSection = ({ register, errors, watch, lookups }: Props) => {

    const statusId = watch("statusId");

    const statusConfig: Record<number, { label: string; color: string; bg: string }> = {
        1: { label: "Property is pending approval", color: "text-yellow-700", bg: "bg-yellow-50 border-yellow-200" },
        2: { label: "Property has been rejected",   color: "text-red-700",    bg: "bg-red-50 border-red-200"       },
        3: { label: "Property is active and visible", color: "text-green-700", bg: "bg-green-50 border-green-200"  },
        4: { label: "Property has been sold",        color: "text-gray-700",   bg: "bg-gray-50 border-gray-200"    },
    };

    const currentStatus = statusConfig[statusId];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Owner */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Owner</label>
                    <select {...register("userId")} className={selectCls(!!errors.userId)}>
                        <option value="">No Owner Selected</option>
                        <option value="1">Khalid Al-Otaibi (khalid.otaibi@gmail.com)</option>
                        <option value="2">Fatima Al-Dosari (fatima.dosari@gmail.com)</option>
                        <option value="3">Mohammed Al-Harbi (mohammed.harbi@gmail.com)</option>
                    </select>
                    <FieldError message={errors.userId?.message} />
                </div>

                {/* Assigned Agent */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Assigned Agent</label>
                    <select {...register("agentId")} className={selectCls(!!errors.agentId)}>
                        <option value="">No Agent Selected</option>
                        <option value="1">Ahmed Al-Mansouri (ahmed.mansouri@sayil.com)</option>
                        <option value="2">Sara Al-Mahmoud (sara.mahmoud@sayil.com)</option>
                        <option value="5">Omar Al-Zahrani (omar.zahrani@sayil.com)</option>
                    </select>
                    <FieldError message={errors.agentId?.message} />
                </div>

                {/* Classification */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Land Classification</label>
                    <select {...register("classificationId")} className={selectCls(!!errors.classificationId)}>
                        <option value="">Select Classification</option>
                        {lookups?.data?.classifications?.map(c => (
                            <option key={c.id} value={c.id}> 
                                {c.name}                  
                            </option>
                        ))}
                    </select>
                    <FieldError message={errors.classificationId?.message} />
                </div>

                {/* Status */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Status</label>
                    <select {...register("statusId")} className={selectCls(!!errors.statusId)}>
                        <option value="">Select Status</option>
                        <option value="1">Pending</option>
                        <option value="2">Rejected</option>
                        <option value="3">Active</option>
                        <option value="4">Sold</option>
                    </select>
                    <FieldError message={errors.statusId?.message} />
                </div>

            </div>

            {/* Status Badge */}
            {currentStatus && (
                <div className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm ${currentStatus.bg} ${currentStatus.color}`}>
                    <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    {currentStatus.label}
                </div>
            )}

        </div>
    );
};

const selectCls = (hasError: boolean) =>
    `w-full bg-gray-50/50 border ${hasError ? "border-red-400" : "border-gray-200"} 
   text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500/20 
   focus:border-blue-500 block p-3 outline-none transition-all`;

const FieldError = ({ message }: { message?: string }) =>
    message ? <p className="text-red-500 text-xs">{message}</p> : null;
