import nodemailer from "nodemailer";
import path from "path";

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
      from: `"Max Gadgets" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Otp verification",
      html: `<div
  style="
    display: block;
    font-family: Arial, sans-serif;
    padding: 16px;
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
          <img
            src="cid:logo"
            style="margin-top: auto; height: 28px; width: 28px"
          />
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
      Welcome to Max Gadgets!! Please use the following time verification code
      to complete your account registration
    </div>
    <div
      style="
        width: 100%;
        border: 1px solid #777777;
        border-radius: 32px;
        margin-bottom: 20px;
        padding: 16px 0;
        text-align: center;
        font-size: 20px;
        font-weight: 800;
        background-color: #444444;
      "
    >
      ${otp} 
    </div>
    <div style="color: #777777; font-size: 14px">
      <span style="color: #fd755a; margin-right: 4px">Note:</span>
      OTP expires in 5 minutes
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
</div>

      `,
      attachments: [
        {
          filename: "logo.png",
          path: path.join(process.cwd(), "public", "icons", "logo.png"),
          cid: "logo", // same cid value as in the html img src
        },
      ],
      headers: {},
    });
  } catch (error) {
    console.error("error in sending otp", error);
  }
}
