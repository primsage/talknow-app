import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || 'SG.placeholder');

export const sendEmail = async (to: string, subject: string, text: string, html: string) => {
  const msg = {
    to,
    from: process.env.EMAIL_FROM || 'no-reply@talknow.com',
    subject,
    text,
    html,
  };
  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
