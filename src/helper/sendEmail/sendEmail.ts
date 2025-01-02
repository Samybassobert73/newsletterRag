import { Resend } from "resend";
import { getResendApiKey } from "../../config/api.config";

type EmailParams = {
  from: string;
  to: string;
  subject: string;
  react: React.ReactNode;
};

export const sendEmail = async ({ from, to, subject, react }: EmailParams) => {
  const resend = new Resend(getResendApiKey());

  resend.emails.send({
    from,
    to,
    subject,
    react,
  });
};
