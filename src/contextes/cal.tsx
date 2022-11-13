import {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react'
import { GlobalCal } from '@calcom/embed-core'

import { CalWindow } from '@calcom/embed-core'
import EmbedSnippet from '@calcom/embed-snippet'

export const getCalApi = (embedJsUrl?: string): Promise<GlobalCal> =>
  new Promise(function tryReadingFromWindow(resolve) {
    EmbedSnippet(embedJsUrl)
    const api = (window as CalWindow).Cal
    if (!api) {
      setTimeout(() => {
        tryReadingFromWindow(resolve)
      }, 50)
      return
    }
    resolve(api)
  })

const CalContext = createContext<GlobalCal | null>(null)

export const _useCalApi = (embedJsUrl?: string) => {
  const [calApi, setCalApi] = useState<GlobalCal | null>(null)

  useEffect(() => {
    ;(async function () {
      const calApi = await getCalApi(embedJsUrl)
      setCalApi(() => calApi ?? null)
    })()
  }, [embedJsUrl, setCalApi])

  return calApi
}

type CalProviderProps = PropsWithChildren<{
  embedJsUrl?: string
}>

export const CalProvider: FunctionComponent<CalProviderProps> = (props) => {
  const { children, embedJsUrl, ...restProps } = props
  const calApi = _useCalApi(embedJsUrl)

  return (
    <CalContext.Provider {...restProps} value={calApi}>
      {children}
    </CalContext.Provider>
  )
}

export const useCalApi = () => useContext(CalContext)
