import nodemailer from "nodemailer";

export async function sendResetMessage(email: string, resetToken: string) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "SYPHER",
      html: `<div><h3 style="margin-bottom: 50px">Your reset link</h3>
      <p style="margin-bottom: 50px">This is your reset link <a style="color: blue;" href="${process.env.BASE_URL}/user/reset-password?token=${resetToken}">Reset Password</a></p> 
      <p style="margin-bottom: 30px;">Expires in 1 hour <p>
      <p>Contact 09045342672 on WhatsApp for help info</p></div>`,
    });
  } catch (error) {
    console.error("error in sending message", error);
  }
}
