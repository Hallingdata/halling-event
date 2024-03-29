export const addDaysToDate = (dateIn: Date, days: number): Date => {
  const date = new Date(dateIn.getTime())
  date.setDate(date.getDate() + days)
  return date
}

export function getStartAndEndOfDate(dateIn: Date) {
  const date = new Date(dateIn.getTime())
  date.setHours(0, 0, 0)
  const startOfDay = date.getTime()
  date.setHours(23, 59, 59, 59)
  const endOfDay = date.getTime()
  return {
    startOfDay,
    endOfDay,
  }
}

export const isOnSameDate = (date1: Date) => (date2: Date) => {
  const { startOfDay, endOfDay } = getStartAndEndOfDate(date1)
  const timestamp2 = date2.getTime()
  return timestamp2 < endOfDay && timestamp2 > startOfDay
}
