import nodemailer from "nodemailer";
import { isEmpty } from "../../lib/utils/isEmpty";
const service = process.env.SERVICE;
const emailUserCompte = process.env.EMAIL;
const passwordUserCompte = process.env.PASSWORD;
const sender = process.env.SENDER;

export const nodeMailer = async ({ to, subject, text, html }) => {
  if (!service) {
    return { error: "Service required" };
  } else if (!emailUserCompte) {
    return { error: "Email required" };
  } else if (!passwordUserCompte) {
    return { error: "Password is required" };
  } else if (!sender) {
    return { error: "Sender is required" };
  } else {
    const transporter = nodemailer.createTransport({
      service,
      auth: { user: emailUserCompte, pass: passwordUserCompte },
    });

    const message = {
      from: `${sender} <${emailUserCompte}>`,
      to,
      text,
      subject,
      html,
    };

    const res = await transporter.sendMail(message);
    if (!isEmpty(res?.error)) {
      return { error: res.error };
    } else {
      return { message: "Email sent" };
    }
  }
};
