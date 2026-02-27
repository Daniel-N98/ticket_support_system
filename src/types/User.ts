export type UserStatus = "active" | "banned";

export interface UserType {
  name: string;
  email: string;
  role: string; // ObjectId as String.
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
}

// Type returned from the server.
export interface SafeUser extends UserType {
  _id: string;
}