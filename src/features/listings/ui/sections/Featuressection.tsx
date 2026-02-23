'use client';
import { useFieldArray, Control, UseFormRegister } from "react-hook-form";
import { ListingFormValues } from "../../types";

interface Props {
    control: Control<ListingFormValues>;
    register: UseFormRegister<ListingFormValues>;
    // 🔧 TODO: مرر الـ predefined features من الـ API
    // availableFeatures?: { id: string; label: string }[];
}

export const FeaturesSection = ({ control }: Props) => {

    // useFieldArray بيدير الـ dynamic list في الـ form
    const { fields, append, remove } = useFieldArray({
        control,
        // 🔧 NOTE: features في الـ schema هي array of strings
        // لو الـ API بيرجع objects هتحتاج تعدل الـ schema
        name: "features" as never,
    });

    return (
        <div className="space-y-4">

            {/* 🔧 TODO: لما الـ API يرجع الـ features، اعرضها هنا كـ chips قابلة للاختيار
          مثال:
          <div className="flex flex-wrap gap-2 mb-4">
            {availableFeatures.map(f => (
              <button type="button" key={f.id} onClick={() => append(f.label)}
                className="px-3 py-1 text-sm border rounded-full hover:bg-blue-50">
                + {f.label}
              </button>
            ))}
          </div>
      */}

            {/* Predefined Suggestions - مؤقتة لحد ما الـ API يجي */}
            <div>
                <p className="text-xs text-gray-500 mb-2">Quick add:</p>
                <div className="flex flex-wrap gap-2">
                    {PLACEHOLDER_FEATURES.map(f => (
                        <button
                            key={f}
                            type="button"
                            onClick={() => append(f)}
                            className="px-3 py-1 text-xs border border-gray-200 rounded-full text-gray-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
                        >
                            + {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Added Features List */}
            {fields.length > 0 ? (
                <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    {fields.map((field, index) => (
                        <div
                            key={field.id}
                            className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-3 py-1.5 text-sm text-gray-700 shadow-sm"
                        >
                            <span>{(field as any).value ?? field.id}</span>
                            <button
                                type="button"
                                onClick={() => remove(index)}
                                className="text-gray-400 hover:text-red-500 transition-colors ml-1"
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
                    <p className="text-xs text-gray-300 mt-1">Add features like "Near main road", "Utilities ready", etc.</p>
                </div>
            )}

            {/* Custom Feature Input */}
            <CustomFeatureInput onAdd={(val) => append(val)} />

        </div>
    );
};

// ── Custom Feature Input ──
const CustomFeatureInput = ({ onAdd }: { onAdd: (val: string) => void }) => {
    // 🔧 TODO: اعمل state محلي هنا عشان الـ input
    // const [value, setValue] = useState("");
    return (
        <div className="flex gap-2">
            <input
                type="text"
                placeholder='Add custom feature e.g. "Corner plot"'
                // 🔧 TODO: value={value} onChange={e => setValue(e.target.value)}
                className="flex-1 bg-gray-50/50 border border-gray-200 text-gray-900 text-sm rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 placeholder:text-gray-400"
            />
            <button
                type="button"
                // 🔧 TODO: onClick={() => { if(value.trim()) { onAdd(value.trim()); setValue(""); }}}
                className="px-4 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-black transition-colors"
            >
                Add
            </button>
        </div>
    );
};

// 🔧 TODO: شيل الـ array دي لما الـ API يجي
const PLACEHOLDER_FEATURES = [
    "Near main road",
    "Utilities ready",
    "Corner plot",
    "Flat terrain",
    "Paved street",
    "Near mosque",
];