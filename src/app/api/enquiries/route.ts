import { NextRequest, NextResponse } from "next/server";
import { createEnquiry } from "@/data/enquiries";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, message, bike_slug } = body;

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Name is required (min 2 characters)" },
        { status: 400 }
      );
    }

    const result = await createEnquiry({
      name: name.trim(),
      phone: phone?.trim() || undefined,
      email: email?.trim() || undefined,
      message: message?.trim() || undefined,
      bike_slug: bike_slug?.trim() || undefined,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to save enquiry" },
        { status: 500 }
      );
    }

    // Send email to company gmail
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.COMPANY_EMAIL,
          pass: process.env.COMPANY_EMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.COMPANY_EMAIL,
        to: process.env.COMPANY_EMAIL,
        subject: `New Enquiry from ${name}`,
        text: `New Enquiry Details:
        
Name: ${name}
Phone: ${phone || "N/A"}
Email: ${email || "N/A"}
Interested Bike: ${bike_slug || "N/A"}
Message: ${message || "N/A"}
        `,
      };

      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error("[Email Sending Failed]", emailError);
      // Don't fail the request if email sending fails
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/enquiries]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
