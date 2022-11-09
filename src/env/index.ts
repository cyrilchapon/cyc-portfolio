import { cleanEnv, str, ValidatorSpec } from 'envalid'

interface BrowserEnv {
  NODE_ENV: NodeJS.ProcessEnv['NODE_ENV']
  NEXT_PUBLIC_CALCOM_USER: string
  NEXT_PUBLIC_CALCOM_EVENT: string
  NEXT_PUBLIC_TURNSTILE_PUBLIC_KEY: string
}

const getBrowserEnv = () => {
  const env: Record<keyof BrowserEnv, unknown> = {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_CALCOM_USER: process.env.NEXT_PUBLIC_CALCOM_USER,
    NEXT_PUBLIC_CALCOM_EVENT: process.env.NEXT_PUBLIC_CALCOM_EVENT,
    NEXT_PUBLIC_TURNSTILE_PUBLIC_KEY:
      process.env.NEXT_PUBLIC_TURNSTILE_PUBLIC_KEY,
  }

  const cleanedEnv = cleanEnv<BrowserEnv>(env, {
    NODE_ENV: str({
      choices: ['development', 'production', 'test'],
    }) as ValidatorSpec<NodeJS.ProcessEnv['NODE_ENV']>,
    NEXT_PUBLIC_CALCOM_USER: str(),
    NEXT_PUBLIC_CALCOM_EVENT: str(),
    NEXT_PUBLIC_TURNSTILE_PUBLIC_KEY: str(),
  })

  return { ...cleanedEnv } as BrowserEnv
}

const browserEnv = getBrowserEnv()

export { getBrowserEnv, browserEnv }

export type { BrowserEnv }
