import { useMemo, useState } from "react";
import { initialUsers } from "../data/users.constants";
import type {
    ManagedUser,
    UserFormMode,
    UserRole,
    UserSegment,
    UserStatus,
} from "../types";
import {
    buildUserFormState,
    emptyUserForm,
    type UserFormState,
} from "../ui/UserFormDialog";

export function useUsersScreen() {
    const [activeTab, setActiveTab] = useState<UserSegment>("internal");
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState<ManagedUser[]>(initialUsers);
    const [formOpen, setFormOpen] = useState(false);
    const [formMode, setFormMode] = useState<UserFormMode>("add");
    const [selectedUser, setSelectedUser] = useState<ManagedUser | null>(null);
    const [deleteUser, setDeleteUser] = useState<ManagedUser | null>(null);
    const [statusUser, setStatusUser] = useState<ManagedUser | null>(null);
    const [form, setForm] = useState<UserFormState>(emptyUserForm);

    const filteredUsers = useMemo(() => {
        const normalized = search.trim().toLowerCase();

        return users.filter((user) => {
            if (user.type !== activeTab) return false;
            if (!normalized) return true;

            return [user.name, user.email, user.role, user.lastActive]
                .filter(Boolean)
                .some((value) => value.toLowerCase().includes(normalized));
        });
    }, [activeTab, search, users]);

    const handleFormChange = (field: keyof UserFormState, value: string) => {
        setForm((current) => ({ ...current, [field]: value }));
    };

    const openAddForm = () => {
        setFormMode("add");
        setSelectedUser(null);
        setForm({
            ...emptyUserForm,
            role: activeTab === "internal" ? "Agent" : "Landowner",
        });
        setFormOpen(true);
    };

    const openEditForm = (user: ManagedUser) => {
        setFormMode("edit");
        setSelectedUser(user);
        setForm(buildUserFormState(user));
        setFormOpen(true);
    };

    const handleSave = () => {
        if (formMode === "add") {
            const nextUser: ManagedUser = {
                id: Date.now(),
                type: activeTab,
                name:
                    form.name ||
                    (activeTab === "internal" ? "New Internal User" : "New External User"),
                email: form.email || "user@example.com",
                role: form.role as UserRole,
                status: "active",
                lastActive: "2025-01-28",
                phone: form.phone,
                department: activeTab === "internal" ? form.department : undefined,
                location: activeTab === "external" ? form.location : undefined,
            };

            setUsers((current) => [nextUser, ...current]);
        } else if (selectedUser) {
            setUsers((current) =>
                current.map((user) =>
                    user.id === selectedUser.id
                        ? {
                            ...user,
                            name: form.name,
                            email: form.email,
                            phone: form.phone,
                            role: form.role as UserRole,
                            department: user.type === "internal" ? form.department : undefined,
                            location: user.type === "external" ? form.location : undefined,
                        }
                        : user
                )
            );
        }

        setFormOpen(false);
    };

    const handleDelete = () => {
        if (!deleteUser) return;

        setUsers((current) => current.filter((user) => user.id !== deleteUser.id));
        setDeleteUser(null);
    };

    const handleStatusChange = () => {
        if (!statusUser) return;

        setUsers((current) =>
            current.map((user) =>
                user.id === statusUser.id
                    ? {
                        ...user,
                        status: (user.status === "active" ? "inactive" : "active") as UserStatus,
                    }
                    : user
            )
        );

        setStatusUser(null);
    };

    return {
        activeTab,
        search,
        filteredUsers,
        formOpen,
        formMode,
        deleteUser,
        statusUser,
        form,
        setActiveTab,
        setSearch,
        setFormOpen,
        setDeleteUser,
        setStatusUser,
        handleFormChange,
        openAddForm,
        openEditForm,
        handleSave,
        handleDelete,
        handleStatusChange,
    };
}