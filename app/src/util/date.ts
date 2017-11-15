export const addDaysToDate = (dateIn: Date, days: number): Date => {
  const date = new Date(dateIn.getTime())
  date.setDate(date.getDate() + days)
  return date
}

export function getStartAndEndOfDay(date: Date) {
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
    console.log(date1 + " - " + date2)
    const startAndEnd = getStartAndEndOfDay(date1)
    const timestamp2 = date2.getTime()
    return timestamp2 < startAndEnd.endOfDay && timestamp2 > startAndEnd.startOfDay
}