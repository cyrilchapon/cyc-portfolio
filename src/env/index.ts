import { cleanEnv, host, str, ValidatorSpec } from 'envalid'

interface BrowserEnv {
  NODE_ENV: NodeJS.ProcessEnv['NODE_ENV']
  NEXT_PUBLIC_MAILCHIMP_HOST: string
  NEXT_PUBLIC_MAILCHIMP_USER_ID: string
  NEXT_PUBLIC_MAILCHIMP_FORM_ID: string
}

const getBrowserEnv = () => {
  const env: Record<keyof BrowserEnv, any> = {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_MAILCHIMP_HOST: process.env.NEXT_PUBLIC_MAILCHIMP_HOST,
    NEXT_PUBLIC_MAILCHIMP_USER_ID: process.env.NEXT_PUBLIC_MAILCHIMP_USER_ID,
    NEXT_PUBLIC_MAILCHIMP_FORM_ID: process.env.NEXT_PUBLIC_MAILCHIMP_FORM_ID,
  }

  const cleanedEnv = cleanEnv<BrowserEnv>(env, {
    NODE_ENV: str({ choices: ['development', 'production', 'test'] }) as ValidatorSpec<NodeJS.ProcessEnv['NODE_ENV']>,
    NEXT_PUBLIC_MAILCHIMP_HOST: host(),
    NEXT_PUBLIC_MAILCHIMP_USER_ID: str(),
    NEXT_PUBLIC_MAILCHIMP_FORM_ID: str()
  })

  return { ...cleanedEnv } as BrowserEnv
}

const browserEnv = getBrowserEnv()

export {
  getBrowserEnv,
  browserEnv
}

export type {
  BrowserEnv
}
