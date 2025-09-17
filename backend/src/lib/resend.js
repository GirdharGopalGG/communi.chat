import { Resend } from 'resend';
import {createWelcomeEmailTemplate} from '../emails/emailTemplate.js'
import 'dotenv/config'

const resend = new Resend(process.env.resend_api_key);

export const sendWelcomeEmail = async (email, name, clientUrl)=> {
  const { data, error } = await resend.emails.send({
    from: `${process.env.email_from_name} <${process.env.email_from}>`,
    to: email,
    subject: 'Welcome to communi.chat',
    html: createWelcomeEmailTemplate(name,clientUrl) ,
  });

  if (error) {
    return console.error({ error });
  }

  console.log("welcome email sent", data);
}