import { cleanEnv, str, url, ValidatorSpec } from 'envalid'

interface ServerEnv {
  NODE_ENV: NodeJS.ProcessEnv['NODE_ENV']
  MAKE_CONTACT_WEBHOOK_URL: string
  MAKE_CONTACT_SECRET_KEY: string
  TURNSTILE_PRIVATE_KEY: string
}

const getServerEnv = () => {
  const cleanedEnv = cleanEnv<ServerEnv>(process.env, {
    NODE_ENV: str({
      choices: ['development', 'production', 'test'],
    }) as ValidatorSpec<NodeJS.ProcessEnv['NODE_ENV']>,
    MAKE_CONTACT_WEBHOOK_URL: url(),
    MAKE_CONTACT_SECRET_KEY: str(),
    TURNSTILE_PRIVATE_KEY: str(),
  })

  return { ...cleanedEnv } as ServerEnv
}

const serverEnv = getServerEnv()

export { getServerEnv, serverEnv }

export type { ServerEnv }
