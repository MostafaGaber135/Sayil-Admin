import type { ManagedUser, UserRoleName, UsersScreenLabels } from "../types";

// ─── Role Options ─────────────────────────────────────────────────────────────

export const INTERNAL_USER_ROLE_OPTIONS: UserRoleName[] = ["Administrator", "Agent"];
export const EXTERNAL_USER_ROLE_OPTIONS: UserRoleName[] = ["Landowner", "Investor"];

// ─── Labels ───────────────────────────────────────────────────────────────────

export const usersScreenLabels: UsersScreenLabels = {
  addUser: "Add User",
  internalUsers: "Internal Users",
  externalUsers: "External Users",
  searchPlaceholder: "Search by name, email or role...",
  table: {
    name: "Name",
    email: "Email",
    role: "Role",
    status: "Status",
    lastActive: "Last Active",
    actions: "Actions",
  },
  status: {
    active: "Active",
    inactive: "Inactive",
    deactivate: "Deactivate",
    activate: "Activate",
  },
  form: {
    addTitle: "Add New User",
    editTitle: "Edit User",
    personalInformation: "Personal Information",
    fullName: "Full Name *",
    email: "Email Address *",
    phone: "Phone Number",
    role: "Role *",
    department: "Department",
    location: "Location",
    nationalId: "National ID",
    dateOfBirth: "Date of Birth",
    initialPassword: "Initial Password *",
    passwordHint: "User will be required to change this password on next login",
    placeholders: {
      fullName: "Enter full name",
      email: "Enter email address",
      phone: "e.g. +96651234567 8",
      department: "Enter department",
      location: "Enter city or region",
      password: "Enter password",
      nationalId: "Enter national ID",
    },
    cancel: "Cancel",
    save: "Save",
  },
  deleteDialog: {
    title: "Delete User",
    description: "Are you sure you want to delete this user? This action cannot be undone.",
    cancel: "Cancel",
    confirm: "Delete",
  },
  deactivateDialog: {
    deactivateTitle: "Deactivate User",
    deactivateDescription: "This user will lose access to the platform. You can reactivate them at any time.",
    activateTitle: "Activate User",
    activateDescription: "This user will regain access to the platform.",
    cancel: "Cancel",
    confirmDeactivate: "Deactivate",
    confirmActivate: "Activate",
  },
};

// ─── Mock Data (dev only) ─────────────────────────────────────────────────────

// export const initialUsers: ManagedUser[] = [
//   {
//     id: 1,
//     type: "internal",
//     name: "Ahmed Al-Rashid",
//     email: "ahmed.rashid@sayil.com",
//     role: "Administrator",
//     status: "active",
//     lastActive: "2025-01-28",
//     phone: "+966509876501",
//     department: "Operations",
//   },
//   {
//     id: 2,
//     type: "internal",
//     name: "Sara Al-Mahmoud",
//     email: "sara.mahmoud@sayil.com",
//     role: "Agent",
//     status: "active",
//     lastActive: "2025-01-27",
//     phone: "+966509876532",
//     department: "Sales",
//   },
//   {
//     id: 3,
//     type: "internal",
//     name: "Omar Al-Zahrani",
//     email: "omar.zahrani@sayil.com",
//     role: "Agent",
//     status: "inactive",
//     lastActive: "2025-01-25",
//     phone: "+966509876543",
//     department: "Support",
//   },
//   {
//     id: 4,
//     type: "external",
//     name: "Khalid Al-Otaibi",
//     email: "khalid.otaibi@gmail.com",
//     role: "Landowner",
//     status: "active",
//     lastActive: "2025-01-28",
//     phone: "+966509876543",
//     location: "Riyadh",
//   },
//   {
//     id: 5,
//     type: "external",
//     name: "Fatima Al-Dosari",
//     email: "fatima.dosari@gmail.com",
//     role: "Investor",
//     status: "active",
//     lastActive: "2025-01-27",
//     phone: "+966509876544",
//     location: "Jeddah",
//   },
//   {
//     id: 6,
//     type: "external",
//     name: "Mohammed Al-Harbi",
//     email: "mohammed.harbi@gmail.com",
//     role: "Investor",
//     status: "inactive",
//     lastActive: "2025-01-20",
//     phone: "+966509876545",
//     location: "Dammam",
//   },
// ];