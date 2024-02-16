//import { EmailTemplate } from '../../../components/EmailTemplate';
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

/* export default function handler(req, res) {
  res.status(200).json
}
 */
export async function POST(req, res) {
  //console.log(request);
   const body = await req.json()

  const { to, from, html, subject, text } = body
  try {
    const data = await resend.emails.send({
      /*       from: 'onboarding@resend.dev',
      //to: 'segurosgodtello@gmail.com',
      to: 'lexzum10@gmail.com',
      subject: 'Información SOAT',
      html: '<p>Hi</p>',
      text: `hi` */
      from,
      to,
      subject,
      html,
      text
    })

    return Response.json(data)
  } catch (error) {
    return Response.json({ error })
  }
}
