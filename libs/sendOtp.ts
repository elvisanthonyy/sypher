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
      subject: "Otp verification",
      html: `<div style="width: 100%; display: flex; flex-direction: column; align-items: center;"><h2 style="font: bold; margin-bottom: 30px; color: #03a3ff;"> UC DOM </h2>
      <h3 style="margin-bottom: 40px;"> OTP </h3>
      <div style="height: 40px; display: flex; align-items: center;">Verification code</div>
      <div style="margin-left: 5px; font-size: 30px; font: bold;">${otp}</div>
      <div style="font-size: 8px;">(This code expires in 5 minutes)</div>
      </div>
      `,
      headers: {},
    });
  } catch (error) {
    console.error("error in sending otp", error);
  }
}
