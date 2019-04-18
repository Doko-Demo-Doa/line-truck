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

export function sortData (inputArray: Array<Object>, type: string) {
  const alias = type.split(/(?=[A-Z])/).join('_').toLowerCase()
  if (inputArray[0][alias].length) {
    return inputArray.sort()
  }
  return inputArray.sort((a, b) => {
    return a[alias] > b[alias]
  })
}
