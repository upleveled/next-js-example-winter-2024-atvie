export function getLocalStorage(key) {
  // is testing if we are in the browser
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(key);
  }
}

export function setLocalStorage(key, value) {
  // is testing if we are in the browser
  if (typeof window !== 'undefined') {
    return window.localStorage.setItem(key, value);
  }
}
