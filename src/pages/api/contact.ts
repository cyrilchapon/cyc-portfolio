import axios from 'axios'
import type { NextApiHandler } from 'next'
import { z } from 'zod'
import { serverEnv } from '../../env/server'

const contactRequestBody = z
  .object({
    firstName: z.string().min(3).max(30),
    lastName: z.string().min(3).max(30),
    email: z.string().email(),
  })
  .strict()

export type ContactRequestBody = z.infer<typeof contactRequestBody>

export type ContactResponseBody = null

export const contact: NextApiHandler<ContactResponseBody | z.ZodError<ContactRequestBody>> = async (
  req,
  res,
) => {
  const parsed = contactRequestBody.safeParse(req.body)

  if (!parsed.success) {
    res.status(400).json(parsed.error)
    return
  }

  await axios.post(
    serverEnv.MAKE_CONTACT_WEBHOOK_URL,
    parsed.data,
    {
      headers: {
        'x-cyril-chpn-key': serverEnv.MAKE_CONTACT_SECRET_KEY
      }
    }
  )

  res.status(200).json(null)
}

export default contact
