import {
  describe,
  it,
  expect,
  jest,
  beforeEach,
  afterEach,
} from "@jest/globals";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { useUsersScreen } from "../users.hooks";

// Mock next/navigation
const mockPush = jest.fn();
const mockRefresh = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    refresh: mockRefresh,
  }),
  usePathname: () => "/admin/users",
  useSearchParams: () => new URLSearchParams(),
}));

// Mock server actions
jest.mock("../../actions", () => ({
  addInternalUser: jest.fn(),
  addExternalUser: jest.fn(),
  updateInternalUser: jest.fn(),
  updateExternalUser: jest.fn(),
  deleteUser: jest.fn(),
  toggleUserStatus: jest.fn(),
}));

import {
  addInternalUser,
  addExternalUser,
  updateInternalUser,
  updateExternalUser,
  deleteUser,
  toggleUserStatus,
} from "../../actions";

const mockAddInternalUser = addInternalUser as jest.MockedFunction<
  typeof addInternalUser
>;
const mockAddExternalUser = addExternalUser as jest.MockedFunction<
  typeof addExternalUser
>;
const mockUpdateInternalUser = updateInternalUser as jest.MockedFunction<
  typeof updateInternalUser
>;
const mockUpdateExternalUser = updateExternalUser as jest.MockedFunction<
  typeof updateExternalUser
>;
const mockDeleteUser = deleteUser as jest.MockedFunction<typeof deleteUser>;
const mockToggleUserStatus = toggleUserStatus as jest.MockedFunction<
  typeof toggleUserStatus
>;

// Mock data
const mockUsers = [
  {
    id: 1,
    type: "internal" as const,
    name: "John Doe",
    email: "john@example.com",
    role: "Administrator",
    roleNames: ["Administrator"],
    status: "active" as const,
    lastActive: "2024-01-01",
    phone: "+966512345678",
    nationalId: "1234567890",
    roles: [3],
  },
];

const mockAddInternalValues = {
  fullName: "Jane Doe",
  email: "jane@example.com",
  phoneNumber: "+966598765432",
  nationalId: "0987654321",
  role: "Agent",
  department: "Sales",
  password: "Password123",
};

const mockEditInternalValues = {
  fullName: "John Updated",
  email: "john.updated@example.com",
  phoneNumber: "+966512345678",
  nationalId: "1234567890",
  role: "Administrator",
  department: "IT",
  resetPassword: false,
  password: undefined,
};

describe("useUsersScreen Hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("Initial State", () => {
    it("should initialize with correct default state", () => {
      const { result } = renderHook(() =>
        useUsersScreen({ initialUsers: mockUsers, initialSegment: "internal" }),
      );

      expect(result.current.formOpen).toBe(false);
      expect(result.current.formMode).toBe("add");
      expect(result.current.selectedUser).toBe(null);
      expect(result.current.deleteUser).toBe(null);
      expect(result.current.statusUser).toBe(null);
      expect(result.current.isPending).toBe(false);
      expect(result.current.actionError).toBe(null);
    });
  });

  describe("Form Opening", () => {
    it("should open add form correctly", () => {
      const { result } = renderHook(() =>
        useUsersScreen({ initialUsers: mockUsers, initialSegment: "internal" }),
      );

      act(() => {
        result.current.openAddForm();
      });

      expect(result.current.formOpen).toBe(true);
      expect(result.current.formMode).toBe("add");
      expect(result.current.selectedUser).toBe(null);
      expect(result.current.actionError).toBe(null);
    });

    it("should open edit form with selected user", () => {
      const { result } = renderHook(() =>
        useUsersScreen({ initialUsers: mockUsers, initialSegment: "internal" }),
      );

      act(() => {
        result.current.openEditForm(mockUsers[0]);
      });

      expect(result.current.formOpen).toBe(true);
      expect(result.current.formMode).toBe("edit");
      expect(result.current.selectedUser).toBe(mockUsers[0]);
      expect(result.current.actionError).toBe(null);
    });
  });

  describe("Add Internal User", () => {
    it("should successfully add internal user", async () => {
      mockAddInternalUser.mockResolvedValue(undefined);

      const { result } = renderHook(() =>
        useUsersScreen({ initialUsers: mockUsers, initialSegment: "internal" }),
      );

      act(() => {
        result.current.openAddForm();
      });

      await act(async () => {
        await result.current.handleAddInternal(mockAddInternalValues);
      });

      expect(mockAddInternalUser).toHaveBeenCalledWith({
        email: "jane@example.com",
        password: "Password123",
        fullName: "Jane Doe",
        phoneNumber: "+966598765432",
        nationalId: "0987654321",
        roles: [2], // Agent role ID
      });
      expect(mockRefresh).toHaveBeenCalled();
      expect(result.current.formOpen).toBe(false);
      expect(result.current.actionError).toBe(null);
    });

    it("should handle add internal user error", async () => {
      const errorMessage = "Failed to add user";
      mockAddInternalUser.mockRejectedValue(new Error(errorMessage));

      const { result } = renderHook(() =>
        useUsersScreen({ initialUsers: mockUsers, initialSegment: "internal" }),
      );

      act(() => {
        result.current.openAddForm();
      });

      await act(async () => {
        await result.current.handleAddInternal(mockAddInternalValues);
      });

      expect(result.current.actionError).toBe(errorMessage);
      expect(result.current.formOpen).toBe(true); // Form should remain open on error
    });
  });

  describe("Edit Internal User", () => {
    it("should successfully edit internal user", async () => {
      mockUpdateInternalUser.mockResolvedValue(undefined);

      const { result } = renderHook(() =>
        useUsersScreen({ initialUsers: mockUsers, initialSegment: "internal" }),
      );

      act(() => {
        result.current.openEditForm(mockUsers[0]);
      });

      await act(async () => {
        await result.current.handleEditInternal(mockEditInternalValues);
      });

      expect(mockUpdateInternalUser).toHaveBeenCalledWith({
        id: 1,
        email: "john.updated@example.com",
        name: "John Updated",
        phone: "+966512345678",
        nationalId: "1234567890",
        roles: [3], // Administrator role ID
        resetPassword: false,
        password: "",
      });
      expect(mockRefresh).toHaveBeenCalled();
      expect(result.current.formOpen).toBe(false);
    });

    it("should handle edit internal user error", async () => {
      const errorMessage = "Failed to update user";
      mockUpdateInternalUser.mockRejectedValue(new Error(errorMessage));

      const { result } = renderHook(() =>
        useUsersScreen({ initialUsers: mockUsers, initialSegment: "internal" }),
      );

      act(() => {
        result.current.openEditForm(mockUsers[0]);
      });

      await act(async () => {
        await result.current.handleEditInternal(mockEditInternalValues);
      });

      expect(result.current.actionError).toBe(errorMessage);
    });
  });

  describe("Add External User", () => {
    const mockAddExternalValues = {
      fullName: "External User",
      email: "external@example.com",
      phoneNumber: "+966511111111",
      nationalId: "1111111111",
      role: "User",
      location: "Jeddah",
      dateOfBirth: "1995-05-05",
      genderId: "1",
      password: "Password123",
    };

    it("should successfully add external user", async () => {
      mockAddExternalUser.mockResolvedValue(undefined);

      const { result } = renderHook(() =>
        useUsersScreen({ initialUsers: mockUsers, initialSegment: "external" }),
      );

      act(() => {
        result.current.openAddForm();
      });

      await act(async () => {
        await result.current.handleAddExternal(mockAddExternalValues);
      });

      expect(mockAddExternalUser).toHaveBeenCalledWith({
        email: "external@example.com",
        password: "Password123",
        fullName: "External User",
        phoneNumber: "+966511111111",
        nationalId: "1111111111",
        dateOfBirth: "1995-05-05T00:00:00.000Z", // ISO string
        genderId: 1,
      });
      expect(mockRefresh).toHaveBeenCalled();
      expect(result.current.formOpen).toBe(false);
    });
  });

  describe("Delete User", () => {
    it("should successfully delete user", async () => {
      mockDeleteUser.mockResolvedValue(undefined);

      const { result } = renderHook(() =>
        useUsersScreen({ initialUsers: mockUsers, initialSegment: "internal" }),
      );

      act(() => {
        result.current.setDeleteUser(mockUsers[0]);
        result.current.handleDelete();
      });

      await waitFor(() => {
        expect(result.current.isPending).toBe(false);
      });

      expect(mockDeleteUser).toHaveBeenCalledWith(1);
      expect(mockRefresh).toHaveBeenCalled();
      expect(result.current.deleteUser).toBe(null);
    });

    it("should handle delete user error", async () => {
      const errorMessage = "Failed to delete user";
      mockDeleteUser.mockRejectedValue(new Error(errorMessage));

      const { result } = renderHook(() =>
        useUsersScreen({ initialUsers: mockUsers, initialSegment: "internal" }),
      );

      act(() => {
        result.current.setDeleteUser(mockUsers[0]);
        result.current.handleDelete();
      });

      await waitFor(() => {
        expect(result.current.isPending).toBe(false);
      });

      expect(result.current.actionError).toBe(errorMessage);
      expect(result.current.deleteUser).toBe(null);
    });
  });

  describe("Toggle User Status", () => {
    it("should successfully toggle user status", async () => {
      mockToggleUserStatus.mockResolvedValue(undefined);

      const { result } = renderHook(() =>
        useUsersScreen({ initialUsers: mockUsers, initialSegment: "internal" }),
      );

      act(() => {
        result.current.setStatusUser(mockUsers[0]);
        result.current.handleStatusChange();
      });

      await waitFor(() => {
        expect(result.current.isPending).toBe(false);
      });

      expect(mockToggleUserStatus).toHaveBeenCalledWith(1);
      expect(mockRefresh).toHaveBeenCalled();
      expect(result.current.statusUser).toBe(null);
    });
  });

  describe("Error Handling", () => {
    it("should handle non-Error exceptions", async () => {
      mockAddInternalUser.mockRejectedValue("String error");

      const { result } = renderHook(() =>
        useUsersScreen({ initialUsers: mockUsers, initialSegment: "internal" }),
      );

      act(() => {
        result.current.openAddForm();
      });

      await act(async () => {
        await result.current.handleAddInternal(mockAddInternalValues);
      });

      expect(result.current.actionError).toBe("Something went wrong");
    });
  });
});
