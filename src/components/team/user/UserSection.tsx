"use client";

import { UserType } from "@/types/User";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ShieldCheck, Calendar, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import UserTagWithMessage from "@/components/ui/UserTagWithMessage";
import StatusTag from "@/components/tags/StatusTag";
import RoleTag, { RoleTagType } from "@/components/tags/RoleTag";
import SpinningLoadingIcon from "@/components/ui/SpinningLoadingIcon";
import StatCard from "./StatCard";
import InfoRow from "./InfoRow";
import { fetchUser } from "@/lib/api/user.api";
import toast from "react-hot-toast";

export default function UserSection() {
  const { userId }: { userId: string } = useParams();
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    if (!userId) {
      router.back();
      toast.error("User not found.");
      return;
    }
    async function loadUser() {
      const userResponse = await fetchUser({ userId });
      if (userResponse) {
        setUser(userResponse);
        setLoading(false);
      } else {
        router.back();
      }
    }
    loadUser();
  }, [userId]);

  if (!user) return null;

  if (loading) <SpinningLoadingIcon />

  return (
    <div className="px-4 sm:px-6 py-6 sm:py-10 space-y-6 sm:space-y-10">

      <div className="flex flex-row items-center justify-between gap-4 border-b border-white/10 pb-6">
        <UserTagWithMessage customerId={user.id || ""} customerName={user.name} />
        <div className="bg-white/5 px-3 py-1.5 rounded-full border border-white/10 self-start sm:self-auto">
          <span className="text-[10px] sm:text-xs text-white/50 font-medium uppercase tracking-wider">
            Created {new Date(user.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard icon={<ShieldCheck className="w-4 h-4 text-blue-400" />} label="Access Level">
          <RoleTag role={user.role as RoleTagType} />
        </StatCard>

        <StatCard icon={<Clock className="w-4 h-4 text-green-400" />} label="Account Status">
          <StatusTag status={user.status} />
        </StatCard>

        <StatCard icon={<Calendar className="w-4 h-4 text-purple-400" />} label="Member Since">
          <span className="text-sm font-semibold text-white">
            {new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </span>
        </StatCard>
      </div>

      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/30 px-1">
          Detailed Information
        </h3>
        <Card className="bg-main-secondary border-white/10 overflow-hidden">
          <div className="divide-y divide-white/5">
            <InfoRow label="Internal ID" value={user.id || ""} />
            <InfoRow label="Email Address" value={user.email} />
            <InfoRow label="Last Activity" value={user.updatedAt.toLocaleString()} />
            <InfoRow label="System Permissions" value={`${user.role} Access`} />
          </div>
        </Card>
      </div>
    </div>
  );
}