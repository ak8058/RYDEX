import { auth } from "@/auth";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";

import Nav from "@/components/Nav";
import PartnerDashboard from "@/components/PartnerDashboard";
import AdminDashboard from "@/components/AdminDashboard";
import PublicHome from "@/components/PublicHome";
import connectDb from "@/lib/db";
import User from "@/models/user.model";
import Image from "next/image";

export default async function Home() {
  const session = await auth();
  await connectDb();
  const user = await User.findOne({ email: session?.user?.email });

  return (
    <div>
      {user?.role == "partner" ? (
        <>
          <Nav />
          <PartnerDashboard />
        </>
      ) : user?.role == "admin" ? (
        <AdminDashboard />
      ) : (
        <>
          <Nav />
          <PublicHome />
        </>
      )}
      <Footer />
    </div>
  );
}
