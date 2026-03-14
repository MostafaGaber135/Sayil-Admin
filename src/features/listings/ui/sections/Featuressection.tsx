"use client";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { ListingFormValues } from "@/features/listings/validation";

export const FeaturesSection = () => {
  const { watch, setValue } = useFormContext<ListingFormValues>();
  const features: string[] = watch("features") ?? [];

  const append = (val: string) => {
    if (!val.trim() || features.includes(val.trim())) return;
    setValue("features", [...features, val.trim()], { shouldDirty: true });
  };

  const remove = (index: number) => {
    setValue(
      "features",
      features.filter((_, i) => i !== index),
      { shouldDirty: true },
    );
  };

  return (
    <div className="space-y-4">
      {/* Quick-add chips */}
      <div>
        <p className="text-xs text-gray-500 mb-2">Quick add:</p>
        <div className="flex flex-wrap gap-2">
          {PLACEHOLDER_FEATURES.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => append(f)}
              disabled={features.includes(f)}
              className="px-3 py-1 text-xs border border-gray-200 rounded-full text-gray-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              + {f}
            </button>
          ))}
        </div>
      </div>

      {/* Added features list */}
      {features.length > 0 ? (
        <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-xl border border-gray-100">
          {features.map((feature, index) => (
            <div
              key={`${feature}-${index}`}
              className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-3 py-1.5 text-sm text-gray-700 shadow-sm"
            >
              <span>{feature}</span>
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-gray-400 hover:text-red-500 transition-colors ml-1"
                aria-label={`Remove ${feature}`}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-xl">
          <p className="text-sm text-gray-400">No features added yet</p>
          <p className="text-xs text-gray-300 mt-1">
            Add features like "Near main road", "Utilities ready", etc.
          </p>
        </div>
      )}

      <CustomFeatureInput onAdd={append} />
    </div>
  );
};

const CustomFeatureInput = ({ onAdd }: { onAdd: (val: string) => void }) => {
  const [value, setValue] = useState("");

  const handleAdd = () => {
    if (!value.trim()) return;
    onAdd(value.trim());
    setValue("");
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleAdd();
          }
        }}
        placeholder='Add custom feature e.g. "Corner plot"'
        className="flex-1 bg-gray-50/50 border border-gray-200 text-gray-900 text-sm rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 placeholder:text-gray-400"
      />
      <button
        type="button"
        onClick={handleAdd}
        disabled={!value.trim()}
        className="px-4 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-black transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Add
      </button>
    </div>
  );
};

const PLACEHOLDER_FEATURES = [
  "Near main road",
  "Utilities ready",
  "Corner plot",
  "Flat terrain",
  "Paved street",
  "Near mosque",
];