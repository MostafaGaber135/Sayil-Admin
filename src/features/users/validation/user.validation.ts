import { z } from "zod";

// ─── Shared ───────────────────────────────────────────────────────────────────

const phoneSchema = z
  .string()
  .min(1, "Phone number is required")
  .regex(/^\+?[0-9]{7,15}$/, "Invalid phone number (e.g. +966512345678)");

const nationalIdSchema = z
  .string()
  .min(1, "National ID is required")
  .regex(/^[0-9]{10}$/, "National ID must be exactly 10 digits");

const emailSchema = z
  .string()
  .min(1, "Email is required")
  .email("Invalid email address");

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Must contain at least one uppercase letter")
  .regex(/[0-9]/, "Must contain at least one number");

// ─── Internal ─────────────────────────────────────────────────────────────────

const internalBaseSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: emailSchema,
  phoneNumber: phoneSchema,
  nationalId: nationalIdSchema,
  role: z.string().min(1, "Role is required"),
  department: z.string().optional(),
});

export const addInternalSchema = internalBaseSchema.extend({
  password: passwordSchema,
});

// resetPassword: plain z.boolean() (no .default) → inferred as `boolean` required
// The default value false goes in useForm({ defaultValues })
export const editInternalSchema = internalBaseSchema
  .extend({
    resetPassword: z.boolean(),
    password: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.resetPassword) return;
    if (!data.password || data.password.trim() === "") {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["password"], message: "Password is required when resetting" });
      return;
    }
    if (data.password.length < 8)
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["password"], message: "Password must be at least 8 characters" });
    if (!/[A-Z]/.test(data.password))
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["password"], message: "Must contain at least one uppercase letter" });
    if (!/[0-9]/.test(data.password))
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["password"], message: "Must contain at least one number" });
  });

// ─── External ─────────────────────────────────────────────────────────────────

const externalBaseSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: emailSchema,
  phoneNumber: phoneSchema,
  nationalId: nationalIdSchema,
  role: z.string().min(1, "Role is required"),
  location: z.string().optional(),
  dateOfBirth: z.string().optional(),
  // optional string → inferred as `string | undefined`, default in useForm
  genderId: z.string().optional(),
});

export const addExternalSchema = externalBaseSchema.extend({
  password: passwordSchema,
});

export const editExternalSchema = externalBaseSchema;

// ─── Inferred Types ───────────────────────────────────────────────────────────

export type AddInternalFormValues = z.infer<typeof addInternalSchema>;
export type EditInternalFormValues = z.infer<typeof editInternalSchema>;
export type AddExternalFormValues = z.infer<typeof addExternalSchema>;
export type EditExternalFormValues = z.infer<typeof editExternalSchema>;