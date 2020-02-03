export function millisecondsToAgeInDays(
  birth: number,
  date: number = Date.now()
): number {
  return Math.floor((date - birth) / (1000 * 60 * 60 * 24))
}

export function dateStringToMilliseconds(date: string): number {
  const day = Number(date.slice(0, 3))
  const month = Number(date.slice(3, 6))
  const year = Number(date.slice(6))
  return new Date(`${year}, ${month}, ${day}`).getTime()
}

export function dateStringToObject(date: string): Date {
  const day = Number(date.slice(0, 3))
  const month = Number(date.slice(3, 6))
  const year = Number(date.slice(6))
  return new Date(`${year}, ${month}, ${day}`)
}

export function dateStringToAgeInDays(birth: string, date: string): number {
  return millisecondsToAgeInDays(
    dateStringToMilliseconds(birth),
    dateStringToMilliseconds(date)
  )
}

export function dateObjectToString(date: Date): string {
  const days = date.getDate()
  const months = date.getMonth() + 1
  const years = date.getFullYear()

  return days + '.' + months + '.' + years
}

export function ageInDaysToDateFromNow(ageInDays: number, birth: Date): Date {
  const nowInMilliseconds = new Date().getTime()
  const futureInMilliseconds = ageInDays * (1000 * 60 * 60 * 24)
  const birthInMilliseconds = birth.getTime()
  const timestamp =
    nowInMilliseconds + futureInMilliseconds - birthInMilliseconds
  return new Date(timestamp)
}
