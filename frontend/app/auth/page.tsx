import { redirect } from "next/navigation";

// Sign-in lives on the home page; keep /auth working for old links
export default function AuthPage() {
  redirect("/");
}
