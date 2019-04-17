export const truckPlateFormatter = (number: string) => {
  if (!number) return null
  if (number.length > 3) {
    const rawCode = number.replace('-', '')
    const breakpoint = 3

    return `${rawCode.substring(0, breakpoint)}-${rawCode.substring(breakpoint)}`.toUpperCase()
  }

  return number.toUpperCase()
}
