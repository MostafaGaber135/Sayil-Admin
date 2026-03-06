"use client";

import { Card } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { User } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">

      {/* Page Title */}
      <h1 className="text-xl font-semibold mb-6">
        Profile Settings
      </h1>

      <Card className="p-6 space-y-6">

        {/* Avatar Section */}
        <div className="flex items-center gap-4">
          <div className="h-20 w-20 rounded-full bg-primary text-white flex items-center justify-center">
            <User size={36} />
          </div>

          <div>
            <Button variant="outline" className="text-sm">
              Change Photo
            </Button>
          </div>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <Input
            label="Full Name"
            placeholder="Enter your name"
          />

          <Input
            label="Email Address"
            placeholder="Enter email"
            type="email"
          />

          <Input
            label="Phone Number"
            placeholder="Enter phone number"
          />

          <Input
            label="Role"
            placeholder="Administrator"
            disabled
          />

        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t">

          <Button variant="outline">
            Change Password
          </Button>

          <Button>
            Save Changes
          </Button>

        </div>

      </Card>

    </div>
  );
}