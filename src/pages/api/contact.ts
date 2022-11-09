import { turnstileAxios, verifyTurnstile } from '$connectors/turnstile-verify'
import { captchaActions } from '$constants/captcha'
import axios from 'axios'
import type { NextApiHandler } from 'next'
import { z } from 'zod'
import { serverEnv } from '../../env/server'

const contactRequestHeaders = z.object({
  'x-turnstile': z.string(),
})

export type ContactRequestHeaders = z.infer<typeof contactRequestHeaders>

const contactRequestBody = z
  .object({
    firstName: z.string().min(3).max(30),
    lastName: z.string().min(3).max(30),
    email: z.string().email(),
  })
  .strict()

export type ContactRequestBody = z.infer<typeof contactRequestBody>

const contactRequest = z.object({
  headers: contactRequestHeaders,
  body: contactRequestBody,
})

export type ContactRequest = z.infer<typeof contactRequest>

export type ContactResponseBody = null

export const contact: NextApiHandler<
  ContactResponseBody | z.ZodError<ContactRequest>
> = async (req, res) => {
  const _parsedReq = contactRequest.safeParse({
    headers: req.headers,
    body: req.body,
  })

  if (!_parsedReq.success) {
    res.status(400).json(_parsedReq.error)
    return
  }

  const parsedReq = _parsedReq.data

  const captchaResult = await verifyTurnstile(turnstileAxios)(
    parsedReq.headers['x-turnstile'],
  )

  if (!captchaResult.success) {
    const err = new z.ZodError<ContactRequest>([
      {
        code: z.ZodIssueCode.custom,
        message: captchaResult['error-codes'].join(', '),
        path: ['header', 'x-turnstile'],
      },
    ])
    res.status(401).json(err)
    return
  }

  if (captchaResult.action !== captchaActions.contact) {
    const err = new z.ZodError<ContactRequest>([
      {
        code: z.ZodIssueCode.custom,
        message: `Invalid action ${captchaResult.action}`,
        path: ['header', 'x-turnstile'],
      },
    ])
    res.status(403).json(err)
    return
  }

  await axios.post(serverEnv.MAKE_CONTACT_WEBHOOK_URL, parsedReq.body, {
    headers: {
      'x-cyril-chpn-key': serverEnv.MAKE_CONTACT_SECRET_KEY,
    },
  })

  res.status(200).json(null)
}

export default contact
