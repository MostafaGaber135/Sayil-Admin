export type UserSegment = "internal" | "external";
export type UserStatus = "active" | "inactive";
export type UserFormMode = "add" | "edit";

export type UserRole =
  | "Administrator"
  | "Agent"
  | "Landowner"
  | "Investor";

export type ManagedUser = {
  id: number;
  type: UserSegment;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  lastActive: string;
  phone?: string;
  department?: string;
  location?: string;
};

export type UsersScreenLabels = {
  addUser: string;
  internalUsers: string;
  externalUsers: string;
  searchPlaceholder: string;
  table: {
    name: string;
    email: string;
    role: string;
    status: string;
    lastActive: string;
    actions: string;
  };
  status: {
    active: string;
    inactive: string;
    deactivate: string;
    activate: string;
  };
  form: {
    addTitle: string;
    editTitle: string;
    personalInformation: string;
    fullName: string;
    email: string;
    phone: string;
    role: string;
    department: string;
    location: string;
    initialPassword: string;
    passwordHint: string;
    placeholders: {
      fullName: string;
      email: string;
      phone: string;
      department: string;
      location: string;
      password: string;
    };
    cancel: string;
    save: string;
  };
  deleteDialog: {
    title: string;
    description: string;
    cancel: string;
    confirm: string;
  };
  deactivateDialog: {
    deactivateTitle: string;
    deactivateDescription: string;
    activateTitle: string;
    activateDescription: string;
    cancel: string;
    confirmDeactivate: string;
    confirmActivate: string;
  };
};