import nodemailer from "nodemailer";

export async function sendResetMessage(email: string, resetToken: string) {
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
      subject: "Reset Password",
      html: `<div style="width: 100%; display: flex; height: 100px; flex-direction: column; align-items: center;"><h2 style="font: bold; margin-bottom: 30px; color: #03a3ff;"> UC DOM </h2>
      <div><h3 style="margin-bottom: 50px">Your reset link</h3>
      <p style="margin-bottom: 50px">This is your reset link <a style="color: #03a3ff;" href="${process.env.BASE_URL}/user/reset-password?token=${resetToken}">Reset Password</a></p> 
      <p style="margin-bottom: 30px;">Expires in 1 hour </p>
      <p>Contact 09045342672 on WhatsApp for help info</p></div>
      </div>
      `,
      headers: {},
    });
  } catch (error) {
    console.error("error in sending message", error);
  }
}
