import nodemailer from "nodemailer";

export async function sendOTP(email: string, otp: string) {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      connectionTimeout: 10000,
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from: `"UC DOM" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "UC DOM - OTP",
      html: `<h3 style="font: bold; margin-bottom: 30px; color: blue;"> UC DOM </h3>
      <h3 style="margin-bottom: 40px;"> OTP </h3>
      <div style="height: 40px; display: flex; align-items: center;">Verification code</div>
      <div style="margin-left: 5px; font-size: 24px font: bold;">${otp}</div>
      <div style="font-size: 8px;">(This code expires in 5 minutes)</div>
      `,
      headers: {},
    });
  } catch (error) {
    console.error("error in sending otp", error);
  }
}
