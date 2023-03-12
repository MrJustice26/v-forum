import nodemailer, { Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import ApiError from "~/server/exceptions/api-error";
import UserModel from "~/server/models/User/user-model";

const config = useRuntimeConfig();

class MailService {
  transporter: Transporter | {} = {};
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.MAIL_HOST,
      port: parseInt(config.MAIL_PORT),
      auth: {
        user: config.MAIL_USER,
        pass: config.MAIL_PASS,
      },
    } as SMTPTransport.Options);
  }

  async sendEmail(to: string, subject: string, htmlContent: string) {
    try {
      const mail = await (this.transporter as Transporter).sendMail({
        from: config.MAIL_USER,
        to,
        subject,
        html: htmlContent,
      });
      console.log("Message sent: %s", mail.messageId);
      return {
        messageId: mail.messageId,
      };
    } catch (error) {
      console.log(error);
      return ApiError.internalError();
    }
  }

  async sendActivationLink(userId: string) {
    const user = await UserModel.findById(userId);
    if (!user) return ApiError.unAuthorized();

    const htmlContent = `
            <h2>Hi dear user!</h2>
            <p>We need to be sure that is you provided this email, and it belongs to you.<br />To submit it click the link below:<br /></p>
            <a href="http://localhost:3000/auth/activate/${user.activationLink}" target="_blank">Submit email</a>
        `;
    const to = user.email;

    const subject = "Verify your email";

    return await this.sendEmail(to, subject, htmlContent);
  }
}

export default new MailService();
