import { useCalApi } from 'contextes/cal'
import { useEffect, useRef } from 'react'

type CalProps = {
  calOrigin?: string
  calLink: string
  initConfig?: {
    debug?: boolean
    uiDebug?: boolean
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config?: any
} & React.HTMLAttributes<HTMLDivElement>

const Cal = function Cal(props: CalProps) {
  const {
    calLink,
    calOrigin,
    config,
    initConfig = {},
    ...restProps
  } = props
  if (!calLink) {
    throw new Error('calLink is required')
  }
  const initializedRef = useRef(false)
  const calApi = useCalApi()
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!calApi || initializedRef.current) {
      return
    }
    initializedRef.current = true
    const element = ref.current
    calApi('init', {
      ...initConfig,
      origin: calOrigin,
    })
    calApi('inline', {
      elementOrSelector: element,
      calLink,
      config,
    })
  }, [calApi, calLink, config, calOrigin, initConfig])

  if (!calApi) {
    return null
  }

  return <div ref={ref} {...restProps} />
}

export default Cal
