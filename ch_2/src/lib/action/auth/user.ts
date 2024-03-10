import { createClient } from "@supabase/supabase-js";
const bcrypt = require("bcryptjs");

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { db: { schema: "next_auth" } }
);

interface UserFormData {
  email: string;
  password: string;
  name: string;
  role: string;
}
export async function checkUserExists(email: string) {
  const { data: user, error } = await supabase
    .from("users")
    .select("email")
    .eq("email", email)
    .maybeSingle();

  if (error && error.message !== "No rows found") {
    throw error;
  }

  return user;
}

export async function createUser({
  email,
  password,
  name,
  role,
}: UserFormData) {
  const hashedPassword = bcrypt.hashSync(password, 10);
  const { data, error } = await supabase.from("users").insert({
    email,
    password: hashedPassword,
    name,
    role,
  });

  if (error) {
    throw error;
  }

  return data;
}
export async function getUserByEmail(email: string) {
  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .maybeSingle();

  if (error) {
    console.error("Error fetching user:", error);
    throw error;
  }

  return user;
}

export async function authenticateUser(email: string, password: string) {
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return null;
    }

    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      image: user.image,
      role: user.role,
    };
  } catch (error) {
    console.error("Authentication error : ", error);
    return null;
  }
}
