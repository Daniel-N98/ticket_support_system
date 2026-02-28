import dbConnect from "@/lib/mongodb";
import Role from "@/models/Role";

let rolesEnsured = false;

export async function ensureRoles() {
  if (!rolesEnsured) {
    await seedRoles();
    rolesEnsured = true;
  }
}

const DEFAULT_ROLES = [
  { key: "admin", name: "Admin", permissions: ["*"] },
  { key: "user", name: "User", permissions: [] },
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