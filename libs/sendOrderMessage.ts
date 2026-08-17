import nodemailer from "nodemailer";
import { IOrder } from "@/models/order";
import path from "path";

export async function sendOrderMessage(order: IOrder) {
  const orderDate = new Date(order.createdAt);
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
      subject: `Order confirmed!! Your ${order?._id} order`,
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
            src="cid:log"
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
      Thank you for your purchase! We are excited to let you know that your
      order has been placed successfully.
    </div>
    <div style="margin-bottom:">
      <h5 style="color: #fd755a; margin-bottom: 8px">Order Summary</h5>
      <div
        style="
          background-color: rgb(49, 49, 49);
          padding: 4px 0;
          border-radius: 8px;
        "
      >
        <ul>
          <li style="margin-bottom: 20px">
            Order Id:
            <span style="font-weight: 600; color: #cecece">${order?._id}</span>
          </li>
          <li style="margin-bottom: 4px">
            Order Date:
            <span style="font-weight: 600; color: #cecece">${order?.createdAt}</span>
          </li>
          <li style="margin-bottom: 4px">
            Address:
            <span style="font-weight: 600; color: #cecece"
              >${order?.location}</span
            >
          </li>
        </ul>
      </div>
    </div>
    <div style="margin-bottom: 20px">
      <h5 style="color: #fd755a; margin-bottom: 8px">Items Ordered</h5>
      <div
        style="
          background-color: rgb(49, 49, 49);
          padding: 4px 0;
          border-radius: 8px;
        "
      >
        <ul>
          <li style="margin-bottom: 4px">
            Product Name:
            <span style="font-weight: 600; color: #cecece"
              >${order?._id} X ${order?.qty}</span
            >
          </li>
          <li style="margin-bottom: 4px">
            Total Amound:
            <span style="font-weight: 600; color: #cecece">${order?.price}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div style="margin-bottom: 20px; color: #777777; font-size: 14px">
    Prodduct has been reserved for you, kindly come to out office for payment
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
