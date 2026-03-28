"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  User, Mail, Phone, CreditCard, Shield, 
  Building2, UserCog, Lock, MapPin, Calendar 
} from "lucide-react";

import { PasswordToggle } from "./FormPrimitives";
import { ControlledInput, ControlledSelect } from "@/shared/components/ui/ControlledInput";
import { INTERNAL_USER_ROLE_OPTIONS, EXTERNAL_USER_ROLE_OPTIONS } from "../data/users.constants";


type UserFormProps = {
  type: "internal" | "external";
  labels: any;
  onSubmit: (values: any) => void;
  formId: string;
  defaultValues?: any;
  schema: any; 
  isPending: boolean;
};

export function UnifiedUserForm({ type, labels, onSubmit, formId, defaultValues, schema ,isPending}: UserFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  
  const { control, handleSubmit, watch } = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues || {},
  });

  const resetPassword = watch("resetPassword");

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <ControlledInput control={control} name="fullName" label={labels.form.fullName} icon={User} placeholder={labels.form.placeholders.fullName} />
      
      <div className="grid gap-4 md:grid-cols-2">
        <ControlledInput control={control} name="email" label={labels.form.email} icon={Mail} placeholder={labels.form.placeholders.email} />
        <ControlledInput control={control} name="phoneNumber" label={labels.form.phone} icon={Phone} placeholder={labels.form.placeholders.phone} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <ControlledInput control={control} name="nationalId" label={labels.form.nationalId} icon={CreditCard} placeholder={labels.form.placeholders.nationalId} />
        <ControlledSelect 
          control={control} 
          name="role" 
          label={labels.form.role} 
          icon={Shield} 
         options={(type === "internal" ? INTERNAL_USER_ROLE_OPTIONS : EXTERNAL_USER_ROLE_OPTIONS).map(role => ({
            label: role,
            value: role  
        }))}
        />
      </div>

      {type === "internal" && (
        <ControlledInput control={control} name="department" label={labels.form.department} icon={Building2} placeholder={labels.form.placeholders.department} />
      )}

      {type === "external" && (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            <ControlledInput control={control} name="location" label={labels.form.location} icon={MapPin} placeholder={labels.form.placeholders.location} />
            <ControlledInput control={control} name="dateOfBirth" label={labels.form.dateOfBirth} icon={Calendar} type="date" />
          </div>
        </>
      )}


      {!defaultValues && (
        <div>
          <ControlledInput 
            control={control} name="password" label={labels.form.initialPassword} icon={UserCog} 
            type={showPassword ? "text" : "password"}
            suffix={<PasswordToggle visible={showPassword} onClick={() => setShowPassword(!showPassword)} />}
          />
          <p className="mt-1.5 text-[11px] text-[#667085]">{labels.form.passwordHint}</p>
        </div>
      )}

      {defaultValues && type === "internal" && (
        <>
          <Controller
            control={control}
            name="resetPassword"
            render={({ field }) => (
              <label className="flex h-11 cursor-pointer items-center gap-3 rounded-[12px] border border-[#D8DEE8] bg-white px-4 text-[13px] font-medium text-[#3A4258]">
                <input type="checkbox" checked={field.value} onChange={(e) => field.onChange(e.target.checked)} className="size-5 accent-[#667085]" />
                <Lock className="size-4 text-[#667085]" />
                <span>Reset user password</span>
              </label>
            )}
          />
          {resetPassword && (
            <ControlledInput 
                control={control} name="password" label="New Password *" icon={Lock} 
                type={showPassword ? "text" : "password"}
                suffix={<PasswordToggle visible={showPassword} onClick={() => setShowPassword(!showPassword)} />}
            />
          )}
        </>
      )}
    </form>
  );
}