import connectDb from "@/lib/db";
import { sendMail } from "@/lib/sendMail";
import Newsletter from "@/models/newsletter.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    // 1. Check if email is provided
    if (email === undefined || !email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 },
      );
    }

    // 2. Validate Email Format (Regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 },
      );
    }

    // 3. Connect to Database
    await connectDb();

    // 4. Check if email already exists
    const existingSubscriber = await Newsletter.findOne({ email });
    if (existingSubscriber) {
      return NextResponse.json(
        { message: "You are already subscribed to our newsletter!" },
        { status: 400 },
      );
    }

    // 5. Save email to database
    await Newsletter.create({ email });

    // 6. Send a Welcome Email
    try {
      await sendMail(
        email,
        "Welcome to RYDEX Newsletter! 🚗",
        `<h2>Thanks for subscribing!</h2>
         <p>You'll now receive the latest updates, offers, and fleet news directly to your inbox.</p>`,
      );
    } catch (mailError) {
      console.log("Welcome email sending failed:", mailError);
    }

    return NextResponse.json(
      { message: "Subscribed successfully! Thanks" },
      { status: 201 },
    );
  } catch (error) {
    console.error(`Newsletter API Error: ${error}`);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
