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

const ADMIN_PERMISSIONS = [
  "*",
  "tickets.all.view",
  "tickets.all.reply",
  "tickets.create",
]

const DEFAULT_ROLES = [
  { key: "admin", name: "Admin", permissions: ADMIN_PERMISSIONS },
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
