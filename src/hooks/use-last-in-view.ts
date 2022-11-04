import * as React from 'react'
import { useInView } from 'react-intersection-observer'

export type IntersectionOptions = NonNullable<Parameters<typeof useInView>[0]>
export type InViewHookResponse = ReturnType<typeof useInView>

export const useLastInView = <U extends string>(
  observersOptions: Record<U, IntersectionOptions>,
) => {
  const [elementInView, setElementInView] = React.useState<U | null>(null)

  const observersEntries = Object.entries(observersOptions) as [
    U,
    IntersectionOptions,
  ][]
  const inViewsEntries = observersEntries.map<[U, InViewHookResponse]>(
    ([observedName, observerOptions]) => [
      observedName,
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useInView(observerOptions),
    ],
  )
  const inViews = Object.fromEntries(inViewsEntries) as Record<
    U,
    InViewHookResponse
  >

  React.useEffect(() => {
    const sortedInViewsEntries = inViewsEntries.reverse()

    const lastInViewEntry = sortedInViewsEntries.find(
      ([, [, inView]]) => inView,
    )

    setElementInView(lastInViewEntry != null ? lastInViewEntry[0] : null)
  }, [inViewsEntries, setElementInView])

  return [elementInView, inViews] as [U | null, Record<U, InViewHookResponse>]
}
