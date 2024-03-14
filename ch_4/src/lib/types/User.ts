interface UserID {
  id: string;
}
type RoleType = "user" | "admin";
interface authUser {
  id: string;
  nickname?: string | null;
  email?: string | null;
  image?: string | null;
  role?: RoleType;
  phone?: string;
  address?: UserAddress;
}
