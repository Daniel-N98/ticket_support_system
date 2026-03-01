import { Permission } from "@/types/Role";

export const PERMISSIONS: Record<string, Permission> = {
  TICKETS_OWN_VIEW: "tickets.own.view",
  TICKETS_ALL_VIEW: "tickets.all.view",
  TICKETS_CREATE: "tickets.create",
  TICKETS_ALL_REPLY: "tickets.all.reply",
  TICKETS_OWN_REPLY: "tickets.own.reply",
};