import nodemailer from "nodemailer";
import { IOrder } from "@/models/order";

interface OrderMesssage extends IOrder {
  createdAt: string;
}

export async function sendOrderMessage(order: OrderMesssage) {
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
      to: order.email,
      subject: "SYPHER",
      html: `<h3 style="margin-bottom: 50px">${order?.name},</h3>
      <p style="margin-bottom: 50px">your order for <b>${order?.productName}</b> at the price of <b>N${order?.price},000.00 </b> on <b>${order.createdAt}</b>, has been succeccfully placed. Thank You. </p> 
      <p style="margin-bottom: 30px;">Your OrderID - <b>${order._id}</b><p>
      <p>Contact 09045342672 on WhatsApp for more info</p>`,
    });
  } catch (error) {
    console.error("error in sending message", error);
  }
}
