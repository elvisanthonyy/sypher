import nodemailer from "nodemailer";
import path from "path";

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
      from: `"Max Gadgets" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset Password",
      html: `<div style="
      display: block;
      padding: 0px 16px;
    font-family: Arial, sans-serif;
    
  "
>
  <table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    style="font-size: 0; margin-bottom: 40px"
  >
    <tr style="">
      <td
        style="
          display: block;
          width: fit-content;
          height: fit-content;
          padding: 8px;
          background-color: #ffff;
          border-radius: 16px;
        "
      >
        <div style="width: fit-content; height: fit-content; margin-top: auto">
          <img src="cid:logo" style="margin-top: auto" />
        </div>
      </td>

      <td
        style="
          height: fit-content;
          text-align: left;
          padding: 0;
          width: fit-content;
          color: rgb(212, 212, 212);
          font-size: 20px;
        "
      >
        Max Gadgets
      </td>
    </tr>
  </table>
  <div style="width: 100%; display: block; color: #777777; font-size: 14px">
    <div style="margin-bottom: 40px">Hello,</div>
    <div style="margin-bottom: 20px">
      You need to click the link below to change your max gadgets account
      password. You can sign in afterwards.
    </div>
    <div
      style="
        width: 100%;
        background-color: #007bff;
        border-radius: 8px;
        margin-bottom: 20px;
        padding: 8px 0;
        text-align: center;
      "
    >
      <a
        href="${process.env.BASE_URL}/user/reset-password?token=${resetToken}"
        style="
          color: white;

          text-decoration: none;

          font-size: 14px;
          width: 100%;
        "
        >Reset Link</a
      >
    </div>
    <div style="color: #777777; font-size: 14px">
      <span style="color: #fd755a; margin-right: 4px">Note:</span>
      Link expires in 1 hour
    </div>
  </div>
  <div style="width: 100%; display: block">
    <div
      style="
        color: rgb(212, 212, 212);
        color: #777777;
        font-size: 14px;
        margin-top: 40px;
        margin-bottom: 40px;
        border-top: 1px solid #383838;
        padding-top: 16px;
        width: 100%;
        margin-left: auto;
        margin-right: auto;
      "
    >
      <div style="margin-bottom: 8px; font-size: 12px">
        &copy; 2026 Max Gadgets. All rights reserved.
      </div>
      <div style="font-size: 12px; width: 100%">
        Contact 09045342672 on WhatsApp for more information.
      </div>
    </div>
  </div>
  <p style="font-size: 8px; opacity: 0; width: 100%; text-align: center">
    Mail Id: ${Date.now()}
  </p>
</div>`,
      attachments: [
        {
          filename: "logo.svg",
          path: path.join(process.cwd(), "icons", "logo.svg"),
          cid: "logo", // same cid value as in the html img src
        },
      ],
      headers: {},
    });
  } catch (error) {
    console.error("error in sending message", error);
  }
}
