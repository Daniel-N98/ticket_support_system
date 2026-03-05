"use client";

import { useState, useEffect, useRef } from "react";
import { Bell, X } from "lucide-react";
import { useSession } from "next-auth/react";
import dayjs from "dayjs";
import { fetchNotifications, markNotificationAsRead } from "@/lib/api/notification.api";
import { UserNotification } from "@/types/Notifications";
import relativeTime from "dayjs/plugin/relativeTime";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface NotificationButtonProps {
  iconClasses?: string;
}

export default function NotificationButton({ iconClasses = "" }: NotificationButtonProps) {
  dayjs.extend(relativeTime);
  const [notifications, setNotifications] = useState<UserNotification[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const { data: session } = useSession();
  const router = useRouter();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    async function loadNotifications() {
      if (!session || !session.user.id) return;
      const data = await fetchNotifications({ userId: session.user.id });
      if (data) {
        setNotifications(data);
      }
    }

    loadNotifications();
  }, [session?.user.id]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleClick(notification: UserNotification) {
    const result = await markNotificationAsRead({ userNotificationId: notification._id });
    if (result) {
      setNotifications((prev) => prev.map((n) => n._id === notification._id ? { ...n, read: true } : n));
      router.push(notification.toUrl);
      setOpen(false);
    } else {
      toast.error("Could not open notification.");
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button className={`group relative w-10 h-10 p-0 rounded-full flex items-center justify-center bg-gray-800 hover:bg-gray-700 transition-colors ${iconClasses}`} aria-label="Notifications" onClick={() => setOpen(prev => !prev)}>
        <Bell size={24} className="text-white group-hover:text-blue-400 transition-colors" />
        {unreadCount > 0 && (
          <span className="absolute top-2 right-2 block w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 max-h-96 bg-main-secondary text-white rounded-lg shadow-lg border border-gray-700 overflow-hidden z-50">
          <div className="flex justify-between items-center p-3 border-b border-gray-700">
            <span className="font-semibold text-white">Notifications</span>
            <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-white transition-colors">
              <X size={16} />
            </button>
          </div>

          {notifications.length === 0 ? (
            <div className="p-4 text-gray-400 italic text-sm text-center">
              No notifications
            </div>
          ) : (
            <div className="overflow-y-auto max-h-80">
              {notifications.map((notification) => (
                <div key={notification._id} className={`px-4 py-3 border-b border-gray-700 hover:bg-gray-800 cursor-pointer transition-colors ${!notification.read ? "bg-gray-800" : ""}`} onClick={() => handleClick(notification)}>
                  <p className="text-sm">{notification.content} {!notification.read && <span className="text-red-500">*</span>}</p>
                  <span className="text-xs text-gray-400">
                    {dayjs(notification.createdAt).fromNow()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}