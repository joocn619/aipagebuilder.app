"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteAccount } from "@/app/(auth)/actions";
import { toast } from "sonner";
import { Camera, Lock, Globe, Bell, Palette, Shield, AlertTriangle } from "lucide-react";

export default function ProfileSettingsPage() {
  const [fullName, setFullName] = useState("Alex Johnson");
  const [username, setUsername] = useState("alexjohnson");
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [saving, setSaving] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Notification prefs
  const [notifs, setNotifs] = useState({
    newLead: true,
    weeklyReport: true,
    pageViews: false,
    teamActivity: true,
    billing: true,
  });

  const handleSaveProfile = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    setSaving(false);
    toast.success("Profile saved");
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    setChangingPassword(true);
    await new Promise((r) => setTimeout(r, 800));
    setChangingPassword(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    toast.success("Password changed successfully");
  };

  const toggleNotif = (key: keyof typeof notifs) => {
    setNotifs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const NOTIF_OPTIONS = [
    { key: "newLead" as const, label: "New lead captured", desc: "When a form submission comes in" },
    { key: "weeklyReport" as const, label: "Weekly analytics report", desc: "Summary of views and conversions" },
    { key: "pageViews" as const, label: "Page view milestones", desc: "When a page hits 100, 500, 1000 views" },
    { key: "teamActivity" as const, label: "Team activity", desc: "When team members make changes" },
    { key: "billing" as const, label: "Billing & invoices", desc: "Payment receipts and plan changes" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Profile Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your account and preferences</p>
      </div>

      {/* Avatar + Profile Info */}
      <Card className="border-white/10 bg-white/[0.03]">
        <CardHeader className="pb-4">
          <CardTitle className="text-base flex items-center gap-2">
            <Palette className="h-4 w-4 text-violet-400" />
            Profile Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Avatar */}
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-blue-600 text-white text-xl font-bold">
                {fullName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </div>
              <button className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-white/10 border border-white/20 text-white/60 hover:bg-white/20 hover:text-white transition-colors">
                <Camera className="h-3 w-3" />
              </button>
            </div>
            <div>
              <p className="text-sm font-medium">Profile photo</p>
              <p className="text-xs text-white/30 mt-0.5">JPG, PNG or GIF · Max 2MB</p>
              <button className="mt-2 text-xs text-violet-400 hover:text-violet-300 transition-colors">
                Upload photo
              </button>
            </div>
          </div>

          {/* Fields */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label className="text-xs text-white/50">Full Name</Label>
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="bg-white/5 border-white/10 text-sm placeholder:text-white/20 focus:border-violet-500/50"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-white/50">Username</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-white/30">@</span>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-7 bg-white/5 border-white/10 text-sm placeholder:text-white/20 focus:border-violet-500/50"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-white/50">Bio</Label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell your team a bit about yourself..."
              rows={3}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-violet-500/50 resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-white/50">Website</Label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/30" />
              <Input
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://yourwebsite.com"
                className="pl-9 bg-white/5 border-white/10 text-sm placeholder:text-white/20 focus:border-violet-500/50"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2">
              <span className="text-xs text-white/30">Email:</span>
              <span className="text-xs text-white/60">alex@company.com</span>
              <span className="text-[10px] rounded-full bg-green-500/10 text-green-400 border border-green-500/20 px-1.5 py-0.5 ml-1">Verified</span>
            </div>
            <Button
              onClick={handleSaveProfile}
              disabled={saving}
              className="bg-gradient-to-r from-violet-600 to-blue-600 border-0 text-white hover:opacity-90"
            >
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Password */}
      <Card className="border-white/10 bg-white/[0.03]">
        <CardHeader className="pb-4">
          <CardTitle className="text-base flex items-center gap-2">
            <Lock className="h-4 w-4 text-violet-400" />
            Change Password
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs text-white/50">Current Password</Label>
            <Input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
              className="bg-white/5 border-white/10 text-sm placeholder:text-white/20 focus:border-violet-500/50"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label className="text-xs text-white/50">New Password</Label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Min 8 characters"
                className="bg-white/5 border-white/10 text-sm placeholder:text-white/20 focus:border-violet-500/50"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-white/50">Confirm New Password</Label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat password"
                className="bg-white/5 border-white/10 text-sm placeholder:text-white/20 focus:border-violet-500/50"
              />
            </div>
          </div>
          {newPassword && (
            <div className="flex gap-1">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    newPassword.length >= i * 3
                      ? newPassword.length >= 12 ? "bg-green-500" : newPassword.length >= 8 ? "bg-amber-500" : "bg-red-500"
                      : "bg-white/10"
                  }`}
                />
              ))}
            </div>
          )}
          <Button
            variant="outline"
            onClick={handleChangePassword}
            disabled={changingPassword || !currentPassword || !newPassword}
            className="border-white/10 bg-white/5 text-white hover:bg-white/10"
          >
            {changingPassword ? "Updating..." : "Update Password"}
          </Button>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="border-white/10 bg-white/[0.03]">
        <CardHeader className="pb-4">
          <CardTitle className="text-base flex items-center gap-2">
            <Bell className="h-4 w-4 text-violet-400" />
            Email Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-0 divide-y divide-white/5">
            {NOTIF_OPTIONS.map((opt) => (
              <div key={opt.key} className="flex items-center justify-between py-3.5">
                <div>
                  <p className="text-sm font-medium">{opt.label}</p>
                  <p className="text-xs text-white/30 mt-0.5">{opt.desc}</p>
                </div>
                <button
                  onClick={() => toggleNotif(opt.key)}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                    notifs[opt.key] ? "bg-violet-600" : "bg-white/10"
                  }`}
                >
                  <span
                    className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                      notifs[opt.key] ? "translate-x-4" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card className="border-white/10 bg-white/[0.03]">
        <CardHeader className="pb-4">
          <CardTitle className="text-base flex items-center gap-2">
            <Shield className="h-4 w-4 text-violet-400" />
            Security
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-4">
            <div>
              <p className="text-sm font-medium">Two-Factor Authentication</p>
              <p className="text-xs text-white/30 mt-0.5">Add an extra layer of security to your account</p>
            </div>
            <Button variant="outline" size="sm" className="border-white/10 bg-white/5 text-white hover:bg-white/10 text-xs">
              Enable 2FA
            </Button>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-4">
            <div>
              <p className="text-sm font-medium">Active Sessions</p>
              <p className="text-xs text-white/30 mt-0.5">1 active session on Chrome · Windows</p>
            </div>
            <Button variant="outline" size="sm" className="border-white/10 bg-white/5 text-white hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 text-xs">
              Sign Out All
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-500/20 bg-red-500/[0.03]">
        <CardHeader className="pb-4">
          <CardTitle className="text-base flex items-center gap-2 text-red-400">
            <AlertTriangle className="h-4 w-4" />
            Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Delete Account</p>
              <p className="text-xs text-white/30 mt-0.5">
                Permanently delete your account, all pages, analytics, and leads
              </p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50">
                  Delete Account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-[#0d0d18] border-white/10">
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete your account?</AlertDialogTitle>
                  <AlertDialogDescription className="text-white/40">
                    This action cannot be undone. This will permanently delete your account,
                    all pages, analytics data, leads, and cancel your subscription.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="border-white/10 bg-white/5 text-white hover:bg-white/10">Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-red-600 text-white hover:bg-red-700"
                    onClick={() => deleteAccount()}
                  >
                    Yes, delete my account
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
