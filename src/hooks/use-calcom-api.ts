import { getCalApi } from '@calcom/embed-react'
import { GlobalCal } from '@calcom/embed-core'
import { useEffect, useState } from 'react'

export const useCalcomApi = () => {
  const [calcomApi, setCalcomApi] = useState<GlobalCal | null>(null)

  useEffect(() => {
    ;(async function () {
      const calcom = await getCalApi()
      setCalcomApi(() => calcom ?? null)
    })()
  }, [setCalcomApi])

  return calcomApi
}
