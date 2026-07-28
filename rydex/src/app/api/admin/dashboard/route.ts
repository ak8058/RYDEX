import { auth } from "@/auth";
import connectDb from "@/lib/db";
import partnerVehicle from "@/models/partnerVehicle.model";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDb();
    const session = await auth();
    if (!session || !session.user?.email || session.user.role !== "admin") {
      return Response.json({ message: "unauthorized" }, { status: 400 });
    }

    const totalPartners = await User.countDocuments({ role: "partner" });

    const totalApprovedPartners = await User.countDocuments({
      role: "partner",
      partnerStatus: "approved",
    });

    const totalPendingPartners = await User.countDocuments({
      role: "partner",
      partnerStatus: "pending",
    });

    const totalRejectedPartners = await User.countDocuments({
      role: "partner",
      partnerStatus: "rejected",
    });

    const pendingPartnerUsers = await User.find({
      role: "partner",
      partnerStatus: "pending",
      partnerOnBoardingSteps: { $gte: 3 },
    });

    const partnerIds = pendingPartnerUsers.map((p) => p._id);

    const partnerVehicles = await partnerVehicle.find({
      owner: { $in: partnerIds },
    });

    const vehicleTypeMap = new Map(
      partnerVehicles.map((v) => [String(v.owner), v.type]),
    );
    const pendingPartnersReviews = pendingPartnerUsers.map((p) => ({
      _id: p._id,
      name: p.name,
      email: p.email,
      vehicleType: vehicleTypeMap.get(String(p._id)),
    }));

    const pendingVehicles = await partnerVehicle
      .find({
        status: "pending",
      })
      .populate("owner");

    return NextResponse.json(
      {
        pendingVehicles,
        stats: {
          totalPartners,
          totalApprovedPartners,
          totalPendingPartners,
          totalRejectedPartners,
        },
        pendingPartnersReviews,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: `admin dashboard error ${error}`,
      },
      {
        status: 500,
      },
    );
  }
}
