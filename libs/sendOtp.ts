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
      from: process.env.EMAIL_USER,
      to: email,
      subject: "SYPHER - OTP",
      html: `<h3 style="margin-bottom: 40px;"> OTP </h3>
      <div style="height: 40px; display: flex; align-items: center;">Your OTP is <b style="margin-left: 5px;">${otp}</b>. It expires in 5 minutes.</div>`,
    });
  } catch (error) {
    console.error("error in sending otp", error);
  }
}
