import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import React from "react";

export default function CommunicationsTab() {
  return (
    <>
      <Card className="p-6">
        <div>
          <h1 className="text-lg font-semibold">Commission & Offer Settings</h1>
          <p className=" text-sm text-gray-500 mt-1">
            Configure contact information for the mobile application
          </p>
        </div>
        <Card className=" p-6">
          <div>
            <Input
            placeholder="Enter WhatsApp number (e.g., +966501234567)"
              type="tel"
              label="WhatsApp Number"
              defaultValue={+966501234567}
              className="  px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sayil-bright-blue focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">
              This number will be used for WhatsApp contact in the mobile app
            </p>
          </div>
          <div>
            <Input
            placeholder="Enter contact email address"
              type="email"
              label="Contact Us Email"
              defaultValue={"support@sayil.com"}
              className="  px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sayil-bright-blue focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">
              This email will be used for "Contact Us" in the mobile app
            </p>
          </div>
          <div>
            <Input
            placeholder="Enter support email address"
              type="email"
              label="Support Email"
              defaultValue={"help@sayil.com"}
              className="  px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sayil-bright-blue focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">
              This email will be used for technical support inquiries
            </p>
          </div>
          <div>
            <Input
            placeholder="Enter business hours (e.g.,9:AM - 6:PM)"
              type="tel"
              label="Business Hours"
              defaultValue={"9:00 AM - 6:00 PM"}
              className="  px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sayil-bright-blue focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">
              Display business hours in the mobile app
            </p>
          </div>
          <div>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sayil-bright-blue focus:border-transparent">
              <option value="Asia/Riyadh">Asia/Riyadh (GMT+3)</option>
              <option value="Asia/Dubai">Asia/Dubai (GMT+4)</option>
              <option value="Asia/Kuwait">Asia/Kuwait (GMT+3)</option>
              <option value="Asia/Qatar">Asia/Qatar (GMT+3)</option>
              <option value="Asia/Bahrain">Asia/Bahrain (GMT+3)</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Display business hours in the mobile app
            </p>
          </div>
          <div className="flex justify-end pt-4 border-t border-gray-200">
            <Button className="inline-flex items-center gap-2 px-4 py-2  text-white rounded-lg cursor-pointer">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                <polyline points="17 21 17 13 7 13 7 21" />
                <polyline points="7 3 7 8 15 8" />
              </svg>
              Save Changes
            </Button>
          </div>
        </Card>
      </Card>
    </>
  );
}
