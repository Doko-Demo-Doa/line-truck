export const localCache = {
  get: key => {
    const data = localStorage.getItem(key)
    if (data === null) return null
    return JSON.parse(data)
  },

  set: (key, value) => {
    if (value === null) {
      localStorage.removeItem(key)
    } else {
      try {
        localStorage.setItem(key, JSON.stringify(value))
      } catch (e) {
        console.error(e)
        // May throw exception if not enough memory allocated or in Safari's private mode
      }
    }
  },

  remove: key => {
    localStorage.removeItem(key)
  }
}

export const KeySet = {
  AUTH: '_AUTH',
  PR_FORM: 'PR_FORM'
}
