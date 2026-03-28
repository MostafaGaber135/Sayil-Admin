import { describe, it, expect } from "@jest/globals";
import {
  addInternalSchema,
  editInternalSchema,
  addExternalSchema,
  editExternalSchema,
  type AddInternalFormValues,
  type EditInternalFormValues,
  type AddExternalFormValues,
  type EditExternalFormValues,
} from "../user.validation";

// Mock data for testing
const validAddInternalData: AddInternalFormValues = {
  fullName: "John Doe",
  email: "john.doe@example.com",
  phoneNumber: "+966512345678",
  nationalId: "1234567890",
  role: "Administrator",
  department: "IT",
  password: "Password123",
};

const validEditInternalData: EditInternalFormValues = {
  fullName: "John Doe",
  email: "john.doe@example.com",
  phoneNumber: "+966512345678",
  nationalId: "1234567890",
  role: "Administrator",
  department: "IT",
  resetPassword: false,
  password: undefined,
};

const validAddExternalData: AddExternalFormValues = {
  fullName: "Jane Smith",
  email: "jane.smith@example.com",
  phoneNumber: "+966598765432",
  nationalId: "0987654321",
  role: "User",
  location: "Riyadh",
  dateOfBirth: "1990-01-01",
  genderId: "1",
  password: "Password123",
};

const validEditExternalData: EditExternalFormValues = {
  fullName: "Jane Smith",
  email: "jane.smith@example.com",
  phoneNumber: "+966598765432",
  nationalId: "0987654321",
  role: "User",
  location: "Riyadh",
  dateOfBirth: "1990-01-01",
  genderId: "1",
};

describe("User Validation Schemas", () => {
  describe("Internal User Schemas", () => {
    describe("Add Internal Schema", () => {
      it("should validate complete valid add internal data", () => {
        const result = addInternalSchema.safeParse(validAddInternalData);
        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data.fullName).toBe("John Doe");
          expect(result.data.email).toBe("john.doe@example.com");
        }
      });

      it("should validate with minimal required fields", () => {
        const minimalData = {
          fullName: "John Doe",
          email: "john.doe@example.com",
          phoneNumber: "+966512345678",
          nationalId: "1234567890",
          role: "Administrator",
          password: "Password123",
        };
        const result = addInternalSchema.safeParse(minimalData);
        expect(result.success).toBe(true);
      });

      it("should reject invalid email", () => {
        const data = { ...validAddInternalData, email: "invalid-email" };
        const result = addInternalSchema.safeParse(data);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(
            result.error.issues.some((issue) => issue.path.includes("email")),
          ).toBe(true);
        }
      });

      it("should reject invalid phone number", () => {
        const data = { ...validAddInternalData, phoneNumber: "123" };
        const result = addInternalSchema.safeParse(data);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(
            result.error.issues.some((issue) =>
              issue.path.includes("phoneNumber"),
            ),
          ).toBe(true);
        }
      });

      it("should reject invalid national ID (too short)", () => {
        const data = { ...validAddInternalData, nationalId: "12345" };
        const result = addInternalSchema.safeParse(data);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(
            result.error.issues.some((issue) =>
              issue.path.includes("nationalId"),
            ),
          ).toBe(true);
        }
      });

      it("should reject invalid national ID (non-numeric)", () => {
        const data = { ...validAddInternalData, nationalId: "abcdefghij" };
        const result = addInternalSchema.safeParse(data);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(
            result.error.issues.some((issue) =>
              issue.path.includes("nationalId"),
            ),
          ).toBe(true);
        }
      });

      it("should reject weak password", () => {
        const data = { ...validAddInternalData, password: "weak" };
        const result = addInternalSchema.safeParse(data);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(
            result.error.issues.some((issue) =>
              issue.path.includes("password"),
            ),
          ).toBe(true);
        }
      });

      it("should reject password without uppercase", () => {
        const data = { ...validAddInternalData, password: "password123" };
        const result = addInternalSchema.safeParse(data);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(
            result.error.issues.some((issue) =>
              issue.path.includes("password"),
            ),
          ).toBe(true);
        }
      });

      it("should reject password without number", () => {
        const data = { ...validAddInternalData, password: "Password" };
        const result = addInternalSchema.safeParse(data);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(
            result.error.issues.some((issue) =>
              issue.path.includes("password"),
            ),
          ).toBe(true);
        }
      });
    });

    describe("Edit Internal Schema", () => {
      it("should validate valid edit internal data without password reset", () => {
        const result = editInternalSchema.safeParse(validEditInternalData);
        expect(result.success).toBe(true);
      });

      it("should validate with password reset and valid password", () => {
        const data = {
          ...validEditInternalData,
          resetPassword: true,
          password: "NewPassword123",
        };
        const result = editInternalSchema.safeParse(data);
        expect(result.success).toBe(true);
      });

      it("should reject password reset without password", () => {
        const data = {
          ...validEditInternalData,
          resetPassword: true,
          password: "",
        };
        const result = editInternalSchema.safeParse(data);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(
            result.error.issues.some((issue) =>
              issue.path.includes("password"),
            ),
          ).toBe(true);
        }
      });

      it("should reject password reset with weak password", () => {
        const data = {
          ...validEditInternalData,
          resetPassword: true,
          password: "weak",
        };
        const result = editInternalSchema.safeParse(data);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(
            result.error.issues.some((issue) =>
              issue.path.includes("password"),
            ),
          ).toBe(true);
        }
      });
    });
  });

  describe("External User Schemas", () => {
    describe("Add External Schema", () => {
      it("should validate complete valid add external data", () => {
        const result = addExternalSchema.safeParse(validAddExternalData);
        expect(result.success).toBe(true);
      });

      it("should validate with minimal required fields", () => {
        const minimalData = {
          fullName: "Jane Smith",
          email: "jane.smith@example.com",
          phoneNumber: "+966598765432",
          nationalId: "0987654321",
          role: "User",
          password: "Password123",
        };
        const result = addExternalSchema.safeParse(minimalData);
        expect(result.success).toBe(true);
      });
    });

    describe("Edit External Schema", () => {
      it("should validate valid edit external data", () => {
        const result = editExternalSchema.safeParse(validEditExternalData);
        expect(result.success).toBe(true);
      });

      it("should handle optional fields", () => {
        const data = {
          fullName: "Jane Smith",
          email: "jane.smith@example.com",
          phoneNumber: "+966598765432",
          nationalId: "0987654321",
          role: "User",
        };
        const result = editExternalSchema.safeParse(data);
        expect(result.success).toBe(true);
      });
    });
  });

  describe("Shared Validation Rules", () => {
    it("should reject short full name", () => {
      const data = { ...validAddInternalData, fullName: "A" };
      const result = addInternalSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(
          result.error.issues.some((issue) => issue.path.includes("fullName")),
        ).toBe(true);
      }
    });

    it("should accept valid phone numbers with country code", () => {
      const validPhones = ["+966512345678", "+971501234567", "+201234567890"];
      validPhones.forEach((phone) => {
        const data = { ...validAddInternalData, phoneNumber: phone };
        const result = addInternalSchema.safeParse(data);
        expect(result.success).toBe(true);
      });
    });

    it("should accept exactly 10 digit national IDs", () => {
      const data = { ...validAddInternalData, nationalId: "1234567890" };
      const result = addInternalSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });
});
