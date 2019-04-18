export function truckStatusMapper (type: string): string {
  switch (type) {
    case 0:
      return 'In-use'
    case 1:
      return 'New'
    case 2:
      return 'Stopped'
    default:
      return ''
  }
}
