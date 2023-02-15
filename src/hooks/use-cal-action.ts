import { useEffect } from 'react'
import { useCalApi } from '../contextes/cal'

const actionTypes = [
  'eventTypeSelected',
  'bookingSuccessful',
  'linkReady',
  'linkFailed',
] as const

type CalActionType = typeof actionTypes[number]

type CalActionDataEventTypeSelected = {
  eventType: Record<string, unknown>
}

type CalActionDataBookingSuccessful = {
  confirmed: boolean
  eventType: Record<string, unknown>
  date: string
  duration: number
  organizer: Record<string, unknown>
}

type CalActionDataLinkReady = Record<string, never>

type CalActionDataLinkFailed = {
  code: number
  msg: string
  data: Record<string, unknown>
}

type CalActionDetailsEventTypeSelected = {
  data: CalActionDataEventTypeSelected
  type: 'eventTypeSelected'
  namespace: string
}

type CalActionDetailsBookingSuccessful = {
  data: CalActionDataBookingSuccessful
  type: 'bookingSuccessful'
  namespace: string
}

type CalActionDetailsLinkReady = {
  data: CalActionDataLinkReady
  type: 'linkReady'
  namespace: string
}

type CalActionDetailsLinkFailed = {
  data: CalActionDataLinkFailed
  type: 'linkFailed'
  namespace: string
}

// type CalActionDetails =
//   | CalActionDetailsEventTypeSelected
//   | CalActionDetailsBookingSuccessful
//   | CalActionDetailsLinkReady
//   | CalActionDetailsLinkFailed

type _CalActionDetails = {
  eventTypeSelected: CalActionDetailsEventTypeSelected
  bookingSuccessful: CalActionDetailsBookingSuccessful
  linkReady: CalActionDetailsLinkReady
  linkFailed: CalActionDetailsLinkFailed
}

type CalActionCallback<
  T extends CalActionType,
  D extends _CalActionDetails[T] = _CalActionDetails[T],
> = (e: { details: D }) => void

export const useCalAction = <
  T extends CalActionType,
  C extends CalActionCallback<T> = CalActionCallback<T>,
>(
  action: T,
  callback: C,
) => {
  const calApi = useCalApi()

  useEffect(() => {
    if (calApi == null) {
      return
    }

    calApi('on', {
      action,
      callback,
    })

    return () => {
      calApi('off', {
        action,
        callback,
      })
    }
  }, [action, callback, calApi])
}
