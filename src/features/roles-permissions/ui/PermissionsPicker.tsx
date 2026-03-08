import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import type { Permission } from "../types";

function Checkbox({
  checked,
  onCheckedChange,
  disabled,
  "aria-label": ariaLabel,
}: {
  checked: boolean;
  onCheckedChange: (next: boolean) => void;
  disabled?: boolean;
  "aria-label"?: string;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        "size-5 rounded-md border flex items-center justify-center transition-colors cursor-pointer",
        checked
          ? "bg-blue-600 border-blue-600 text-white"
          : "bg-background border-input text-transparent",
        "border-[#d1d5db]"
      )}
    >
      {checked ? <Check className="size-4" /> : null}
    </button>
  );
}

export default function PermissionsPicker({
  permissions,
  grouped,
  selectedIds,
  onChange,
}: {
  permissions: Permission[];
  grouped: Record<string, Permission[]>;
  selectedIds: string[];
  onChange: (nextIds: string[]) => void;
}) {
  const selected = new Set(selectedIds);

  function toggle(id: string) {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    onChange(Array.from(next));
  }

  return (
    <div className="space-y-6">
      {Object.entries(grouped).map(([group, items]) => (
        <div key={group}>
          <div className="text-sm font-semibold text-foreground">{group}</div>
          <div className="mt-3 space-y-3">
            {items.map((p) => {
              const isChecked = selected.has(p.id);
              return (
                <div
                  key={p.id}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border bg-background px-4 py-4"
                  )}
                >
                  <Checkbox
                    checked={isChecked}
                    onCheckedChange={() => toggle(p.id)}
                    aria-label={p.label}
                  />
                  <div className="min-w-0">
                    <div className="text-sm font-medium leading-5">{p.label}</div>
                    <div className="mt-0.5 break-all text-xs text-muted-foreground">{p.id}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
