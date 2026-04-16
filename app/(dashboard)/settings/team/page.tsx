"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { MoreHorizontal, UserPlus, Crown, Shield, User, Mail, Copy, Check } from "lucide-react";

type Role = "owner" | "admin" | "member";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: Role;
  joinedAt: string;
  status: "active" | "pending";
  avatar: string;
}

const DEMO_MEMBERS: TeamMember[] = [
  { id: "1", name: "Alex Johnson", email: "alex@company.com", role: "owner", joinedAt: "Jan 2026", status: "active", avatar: "AJ" },
  { id: "2", name: "Sarah Chen", email: "sarah@company.com", role: "admin", joinedAt: "Feb 2026", status: "active", avatar: "SC" },
  { id: "3", name: "Mike Torres", email: "mike@company.com", role: "member", joinedAt: "Mar 2026", status: "active", avatar: "MT" },
  { id: "4", name: "Lisa Park", email: "lisa@company.com", role: "member", joinedAt: "Apr 2026", status: "pending", avatar: "LP" },
];

const ROLE_CONFIG: Record<Role, { label: string; icon: React.ElementType; color: string }> = {
  owner: { label: "Owner", icon: Crown, color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
  admin: { label: "Admin", icon: Shield, color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
  member: { label: "Member", icon: User, color: "text-white/50 bg-white/5 border-white/10" },
};

const AVATAR_COLORS = [
  "from-violet-500 to-blue-500",
  "from-pink-500 to-rose-500",
  "from-emerald-500 to-teal-500",
  "from-amber-500 to-orange-500",
];

export default function TeamSettingsPage() {
  const [members, setMembers] = useState<TeamMember[]>(DEMO_MEMBERS);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<Role>("member");
  const [inviting, setInviting] = useState(false);
  const [copied, setCopied] = useState(false);

  const inviteLink = "https://aipagebuilder.app/invite/abc123xyz";

  const handleInvite = async () => {
    if (!inviteEmail.includes("@")) {
      toast.error("Enter a valid email address");
      return;
    }
    setInviting(true);
    await new Promise((r) => setTimeout(r, 800));
    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: inviteEmail.split("@")[0],
      email: inviteEmail,
      role: inviteRole,
      joinedAt: "Now",
      status: "pending",
      avatar: inviteEmail.slice(0, 2).toUpperCase(),
    };
    setMembers((prev) => [...prev, newMember]);
    setInviteEmail("");
    setInviting(false);
    toast.success(`Invite sent to ${inviteEmail}`);
  };

  const changeRole = (id: string, role: Role) => {
    setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, role } : m)));
    toast.success("Role updated");
  };

  const removeMember = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
    toast.success("Member removed");
  };

  const resendInvite = (email: string) => {
    toast.success(`Invite resent to ${email}`);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Invite link copied!");
  };

  const activeCount = members.filter((m) => m.status === "active").length;
  const pendingCount = members.filter((m) => m.status === "pending").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Team</h1>
          <p className="text-sm text-muted-foreground">
            {activeCount} active · {pendingCount} pending invitation{pendingCount !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5">
          <div className="h-1.5 w-1.5 rounded-full bg-violet-400" />
          <span className="text-xs text-white/50">Pro Plan · 10 seats</span>
        </div>
      </div>

      {/* Invite Card */}
      <Card className="border-white/10 bg-white/[0.03]">
        <CardHeader className="pb-4">
          <CardTitle className="text-base flex items-center gap-2">
            <UserPlus className="h-4 w-4 text-violet-400" />
            Invite Team Member
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/30" />
              <Input
                placeholder="colleague@company.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleInvite()}
                className="pl-9 bg-white/5 border-white/10 text-sm placeholder:text-white/20 focus:border-violet-500/50"
              />
            </div>
            <select
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value as Role)}
              className="rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white/70 focus:outline-none focus:border-violet-500/50"
            >
              <option value="admin" className="bg-[#0d0d18]">Admin</option>
              <option value="member" className="bg-[#0d0d18]">Member</option>
            </select>
            <Button
              onClick={handleInvite}
              disabled={inviting || !inviteEmail}
              className="bg-gradient-to-r from-violet-600 to-blue-600 border-0 text-white hover:opacity-90"
            >
              {inviting ? "Sending..." : "Send Invite"}
            </Button>
          </div>

          {/* Invite link */}
          <div className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2">
            <span className="flex-1 truncate text-xs text-white/30">{inviteLink}</span>
            <button
              onClick={copyLink}
              className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copied!" : "Copy link"}
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Members List */}
      <Card className="border-white/10 bg-white/[0.03]">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Members</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-white/5">
            {members.map((member, idx) => {
              const roleConfig = ROLE_CONFIG[member.role];
              const RoleIcon = roleConfig.icon;
              const avatarGradient = AVATAR_COLORS[idx % AVATAR_COLORS.length];

              return (
                <div key={member.id} className="flex items-center gap-4 px-6 py-4 hover:bg-white/[0.02] transition-colors">
                  {/* Avatar */}
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${avatarGradient} text-white text-xs font-bold`}>
                    {member.avatar}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-white truncate">{member.name}</p>
                      {member.status === "pending" && (
                        <span className="text-[10px] rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 px-1.5 py-0.5">
                          Pending
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-white/30 truncate">{member.email}</p>
                  </div>

                  {/* Joined */}
                  <p className="hidden md:block text-xs text-white/20 shrink-0">{member.joinedAt}</p>

                  {/* Role badge */}
                  <div className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium shrink-0 ${roleConfig.color}`}>
                    <RoleIcon className="h-3 w-3" />
                    {roleConfig.label}
                  </div>

                  {/* Actions */}
                  {member.role !== "owner" && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-white/30 hover:text-white hover:bg-white/5">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-[#0d0d18] border-white/10">
                        {member.status === "pending" && (
                          <DropdownMenuItem
                            onClick={() => resendInvite(member.email)}
                            className="text-white/70 hover:text-white hover:bg-white/5 cursor-pointer"
                          >
                            Resend invite
                          </DropdownMenuItem>
                        )}
                        {member.role !== "admin" && (
                          <DropdownMenuItem
                            onClick={() => changeRole(member.id, "admin")}
                            className="text-white/70 hover:text-white hover:bg-white/5 cursor-pointer"
                          >
                            Make Admin
                          </DropdownMenuItem>
                        )}
                        {member.role !== "member" && (
                          <DropdownMenuItem
                            onClick={() => changeRole(member.id, "member")}
                            className="text-white/70 hover:text-white hover:bg-white/5 cursor-pointer"
                          >
                            Make Member
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator className="bg-white/5" />
                        <DropdownMenuItem
                          onClick={() => removeMember(member.id)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10 cursor-pointer"
                        >
                          Remove from team
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                  {member.role === "owner" && <div className="w-8" />}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Role Explanation */}
      <div className="grid gap-3 sm:grid-cols-3">
        {(Object.entries(ROLE_CONFIG) as [Role, typeof ROLE_CONFIG[Role]][]).map(([role, config]) => {
          const Icon = config.icon;
          const descriptions: Record<Role, string> = {
            owner: "Full access. Can manage billing, delete workspace, and assign any role.",
            admin: "Can create/edit/delete pages, manage leads, and invite members.",
            member: "Can create and edit pages. Cannot manage team or billing.",
          };
          return (
            <div key={role} className={`rounded-xl border p-4 ${config.color}`}>
              <div className="flex items-center gap-2 mb-1.5">
                <Icon className="h-3.5 w-3.5" />
                <span className="text-xs font-semibold">{config.label}</span>
              </div>
              <p className="text-[11px] leading-relaxed opacity-70">{descriptions[role]}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
