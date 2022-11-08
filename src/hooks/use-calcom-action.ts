import { useEffect } from 'react'
import { useCalcomApi } from './use-calcom-api'

const actionTypes = [
  'eventTypeSelected',
  'bookingSuccessful',
  'linkReady',
  'linkFailed',
] as const

type CalcomActionType = typeof actionTypes[number]

type CalcomActionDataEventTypeSelected = {
  eventType: Record<string, unknown>
}

type CalcomActionDataBookingSuccessful = {
  confirmed: boolean
  eventType: Record<string, unknown>
  date: string
  duration: number
  organizer: Record<string, unknown>
}

type CalcomActionDataLinkReady = Record<string, never>

type CalcomActionDataLinkFailed = {
  code: number
  msg: string
  data: Record<string, unknown>
}

type CalcomActionDetailsEventTypeSelected = {
  data: CalcomActionDataEventTypeSelected
  type: 'eventTypeSelected'
  namespace: string
}

type CalcomActionDetailsBookingSuccessful = {
  data: CalcomActionDataBookingSuccessful
  type: 'bookingSuccessful'
  namespace: string
}

type CalcomActionDetailsLinkReady = {
  data: CalcomActionDataLinkReady
  type: 'linkReady'
  namespace: string
}

type CalcomActionDetailsLinkFailed = {
  data: CalcomActionDataLinkFailed
  type: 'linkFailed'
  namespace: string
}

// type CalcomActionDetails =
//   | CalcomActionDetailsEventTypeSelected
//   | CalcomActionDetailsBookingSuccessful
//   | CalcomActionDetailsLinkReady
//   | CalcomActionDetailsLinkFailed

type _CalcomActionDetails = {
  eventTypeSelected: CalcomActionDetailsEventTypeSelected
  bookingSuccessful: CalcomActionDetailsBookingSuccessful
  linkReady: CalcomActionDetailsLinkReady
  linkFailed: CalcomActionDetailsLinkFailed
}

type CalcomActionCallback<
  T extends CalcomActionType,
  D extends _CalcomActionDetails[T] = _CalcomActionDetails[T],
> = (e: { details: D }) => void

export const useCalcomAction = <
  T extends CalcomActionType,
  C extends CalcomActionCallback<T> = CalcomActionCallback<T>,
>(
  action: T,
  callback: C,
) => {
  const calcomApi = useCalcomApi()

  useEffect(() => {
    if (calcomApi == null) {
      return
    }

    calcomApi('on', {
      action,
      callback,
    })

    return () => {
      calcomApi('off', {
        action,
        callback,
      })
    }
  }, [action, callback, calcomApi])
}
