"use client";

import { useEffect, useState } from "react";
import { RoleType } from "@/types/Role";
import { fetchRoles } from "@/lib/api/roles.api";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { RoleTagType } from "../tags/RoleTag";

interface RolesDropdownProps {
  current: RoleTagType;
  updateUserRole: (role: RoleTagType) => void;
}

export default function RolesDropdown({ current, updateUserRole }: RolesDropdownProps) {
  const [roles, setRoles] = useState<RoleType[]>([]);
  const [selected, setSelected] = useState<RoleTagType>(current);

  const roleColors: Record<RoleTagType, string> = {
    User: "bg-gray-500/15 text-gray-300 border-gray-500/30",
    Agent: "bg-green-500/15 text-green-300 border-green-500/30",
    Admin: "bg-red-500/15 text-red-300 border-red-500/30",
  };

  useEffect(() => {
    async function loadRoles() {
      const rolesResponse: RoleType[] | null = await fetchRoles();
      if (rolesResponse) setRoles(rolesResponse);
    }

    loadRoles();
  }, []);

  function setRole(role: RoleTagType) {
    if (role) {
      setSelected(role);
      updateUserRole(role);
    }
  }

  return (
    <div className="grid gap-2">
      <Select value={selected} name="priority" onValueChange={(val) => setRole(val as RoleTagType)} >
        <SelectTrigger className={`bg-white/5 border-white/10 rounded-lg text-white w-36 md:w-72 h-11 focus:ring-blue-500/50 ${roleColors[selected]}`}>
          <SelectValue placeholder="Select a role" />
        </SelectTrigger>
        <SelectContent className="bg-[#1a1a1a] border-white/10 text-white">
          {roles && roles.map((role: RoleType) => (
            <SelectItem key={role.key} value={role.name} className={`${roleColors[role.name as RoleTagType]}`}>{role.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}