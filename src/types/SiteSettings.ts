export type SiteSettingsType = {
  key: string;
  name: string;
  value: boolean;
}

export const SETTINGS_SCHEMA = {
  "tickets-enabled": "Tickets Enabled",
  "inbox-enabled": "Inbox Enabled",
  "user-role-enabled": "User Role Updates Enabled",
  "user-status-enabled": "User Status Updates Enabled",
  "register-enabled": "Register Enabled",
  "login-enabled": "Login Enabled",
  "user-list-enabled": "User List Enabled",
} as const;