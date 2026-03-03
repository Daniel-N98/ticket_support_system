"use client";

import RolesDropdown from "@/components/roles/RolesDropdown";
import { RoleTagType } from "@/components/tags/RoleTag";
import { Card } from "@/components/ui/card";
import { updateUser } from "@/lib/api/user.api";
import { UserType } from "@/types/User";

export default function UserActions({ status, role, userId, setUser }: { status: string; role: string; userId: string; setUser: (user: UserType) => void }) {

  async function updateUserRole(role: RoleTagType) {
    const updateResponse: UserType | null = await updateUser({ userId, updateKey: "role", newValue: role });
    if (updateResponse) {
      setUser(updateResponse);
    }
  }

  async function updateUserStatus() {
    const newValue: string = status === "active" ? "banned" : "active";
    const updateResponse: UserType | null = await updateUser({ userId, updateKey: "status", newValue });
    if (updateResponse) {
      setUser(updateResponse);
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/30 px-1">
        Actions
      </h3>

      <Card className="bg-main-secondary border-white/10 overflow-hidden">
        <div className="divide-y divide-white/5">

          {/* Update Role */}
          <div className="flex items-center justify-between px-4 py-3">
            <div>
              <p className="text-sm text-white">User Role</p>
              <p className="text-xs text-white/40">
                Current role: {role}
              </p>
            </div>
            <RolesDropdown current={role as RoleTagType} updateUserRole={updateUserRole} />
          </div>

          {/* Ban / Unban */}
          <div className="flex items-center justify-between px-4 py-3">
            <div>
              <p className="text-sm text-white">Account Status</p>
              <p className="text-xs text-white/40">
                {status === "active" ? "User currently has access" : "User is banned"}
              </p>
            </div>

            <button className={`text-xs font-semibold px-3 py-1.5 rounded-md border transition ${status === "active" ? "border-red-500/40 text-red-400 hover:bg-red-500/10" : "border-green-500/40 text-green-400 hover:bg-green-500/10"}`} onClick={() => updateUserStatus()}>
              {status === "active" ? "Ban Account" : "Unban Account"}
            </button>
          </div>

        </div>
      </Card >
    </div >
  )
}