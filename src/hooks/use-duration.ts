import { useMemo } from 'react'

export const useYearDuration = (fromDate: Date) => {
  const durationDate = useMemo(
    () => new Date(Date.now() - fromDate.getTime()),
    [fromDate],
  )

  const yearDuration = useMemo(
    () => Math.abs(durationDate.getUTCFullYear() - 1970),
    [durationDate],
  )

  return yearDuration
}
