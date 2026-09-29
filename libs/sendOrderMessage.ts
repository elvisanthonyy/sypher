import nodemailer from "nodemailer";
import { IReservation } from "@/models/Reservation";
import path from "path";

export async function sendOrderMessage(order: IReservation) {
  const orderDate = new Date(order.createdAt);
  const formartedDate = orderDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
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
      to: order.email,
      subject: `Reservation made!! Your ${order?._id} reservation`,
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
    <div style="margin-bottom: 40px">Hello, ${order?.name},</div>
    <div style="margin-bottom: 20px">
      We are excited to let you know that your
      reservation has been made successfully. Please note that reservation becomes invalid after 3 days if payment is not made to out physial office.
    </div>
    <div style="margin-bottom:">
      <h5 style="color: #fd755a; font: 18px; margin-bottom: 8px">Reservation Summary</h5>
      <div
        style="
          background-color: #2e2e2e;
          color: white;
          padding: 4px 0;
          border-radius: 8px;
        "
      >
        <ul>
          <li style="margin-bottom: 20px">
            Order Id:
            <span style="font-weight: 600; color: white">${order?._id}</span>
          </li>
          <li style="margin-bottom: 4px">
            Order Date:
            <span style="font-weight: 600; color: white;">${formartedDate}</span>
          </li>
          <li style="margin-bottom: 4px">
            Address:
            <span style="font-weight: 600; color: white;"
              >${order?.location ? order?.location : "Not specified"}</span
            >
          </li>
        </ul>
      </div>
    </div>
    <div style="margin-bottom: 20px">
      <h5 style="color: #fd755a; font: 18px; margin-bottom: 8px">Items Reserved</h5>
      <div
        style="
          background-color: #2e2e2e;
          color: white;
          padding: 4px 0;
          border-radius: 8px;
        "
      >
        <ul>
          <li style="margin-bottom: 4px">
            Product Name:
            <span style="font-weight: 600; color: white;"
              >${order?.productName} X ${order?.qty}</span
            >
          </li>
          <li style="margin-bottom: 4px">
            Total Amound:
            <span style="font-weight: 600; color: white;">${order?.price?.toLocaleString()}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div style="margin-bottom: 20px; color: #777777; font-size: 14px">
    Product has been reserved for you, kindly come to our office for payment
    and pick-up.
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
    console.error("error in sending message", error);
  }
}
