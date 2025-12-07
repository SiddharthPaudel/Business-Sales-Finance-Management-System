// app/dashboard/page.js (server component)
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  await connectDB();
  const user = await User.findOne({ email: session.user.email });
  if (!user) redirect("/setup-account"); // force them to set password

  // show dashboard
  return <div>Welcome {session.user.name}</div>;
}
