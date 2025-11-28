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
      html: `<div style="width: 100%; height: fit-content; display: block; padding-bottom: 20px; align-items: center;"><h2 style="font: bold; font-size: 30px; border: 3px solid white; margin: 0px auto;  margin-bottom: 60px; border-radius: 8px; padding: 30px 0px; text-align: center; width: 90%; color: #03a3ff;">UC DOM</h2>
      <h3 style="margin-bottom: 40px; text-align: center; width: 100%;"> Your OTP </h3>
      <div style="margin-bottom: 5px; text-align: center; width: 100%;">Verification code</div>
      <div><div style="margin-bottom: 10px; font-size: 30px; font: bold; text-align: center; width: 100%;">${otp}</div>
      <div style="font-size: 8px; margin-bottom: 40px; text-align: center; width: 100%;">(This code expires in 5 minutes)&nbsp;</div></div>
      <p style="font-size: 8px; opacity: 0; width: 100%; text-align: center;">Mail Id: ${Date.now()}</p></div>
      `,
      headers: {},
    });
  } catch (error) {
    console.error("error in sending otp", error);
  }
}
