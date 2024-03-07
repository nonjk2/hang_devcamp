interface UserID {
  id: string;
}
type RoleType = "user" | "admin";

interface User {
  id: string;
  nickname: string;
  email: string;
  image: string | null;
  role?: RoleType;
}
