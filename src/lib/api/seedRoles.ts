import dbConnect from "@/lib/mongodb";
import Role from "@/models/Role";

let rolesEnsured = false;

export async function ensureRoles() {
  if (!rolesEnsured) {
    await seedRoles();
    rolesEnsured = true;
  }
}

const USER_PERMISSIONS = [
  "tickets.own.view",
  "tickets.own.reply",
  "tickets.create",
]

const AGENT_PERMISSIONS = [
  "tickets.own.view",
  "tickets.own.reply",
  "tickets.create",
  "tickets.all.view",
  "tickets.all.reply",
  "tickets.all.edit",
  "tickets.team.view",
  "tickets.users.view",
]

const ADMIN_PERMISSIONS = [
  "*",
  "tickets.own.view",
  "tickets.own.reply",
  "tickets.create",
  "tickets.all.view",
  "tickets.all.reply",
  "tickets.all.edit",
  "tickets.team.view",
  "tickets.users.view",
]

const DEFAULT_ROLES = [
  { key: "admin", name: "Admin", permissions: ADMIN_PERMISSIONS },
  { key: "agent", name: "Agent", permissions: AGENT_PERMISSIONS },
  { key: "user", name: "User", permissions: USER_PERMISSIONS },
];

export async function seedRoles() {
  await dbConnect();

  for (const roleData of DEFAULT_ROLES) {
    const exists = await Role.findOne({ key: roleData.key });
    if (!exists) {
      await Role.create(roleData);
      console.log(`Created role: ${roleData.name}`);
    }
  }
}
