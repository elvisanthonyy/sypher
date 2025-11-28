import nodemailer from "nodemailer";
import { IOrder } from "@/models/order";

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
      from: `"UC DOM" <${process.env.EMAIL_USER}>`,
      to: order.email,
      subject: "Oreder has been placed successfully",
      html: `<div style="width: 100%; height: fit-content; display: block; padding-bottom: 20px; align-items: center;"><h2 style="font: bold; font-size: 30px; border: 3px solid white; margin: 0px auto;  margin-bottom: 60px; border-radius: 8px; padding: 30px 0px; text-align: center; width: 100%; color: #03a3ff;">UC DOM</h2>
      <h3 style="margin-bottom: 50px;">${order?.name},</h3>
      <p style="margin-bottom: 50px;">your order for <b>${
        order?.productName
      }</b> at the price of <b>N${
        order?.price
      },000.00 </b> on <b>${orderDate.toLocaleDateString(
        "en-GB"
      )}</b>, has been succeccfully placed. Thank You. </p> 
      <p style="margin-bottom: 30px;">Your OrderID - <b>${order._id}</b><p>
      <p>Contact 09045342672 on WhatsApp for more info</p>
      <p style="font-size: 8px; opacity: 0; width: 100%; text-align: center;">Mail Id: ${Date.now()}</p>
      </div>
      `,
      headers: {},
    });
  } catch (error) {
    console.error("error in sending message", error);
  }
}
