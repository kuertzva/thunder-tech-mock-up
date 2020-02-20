export const click = (el, fn) => {
  el.addEventListener('click', fn)
}

export const run = (element, fn) => {
  document.addEventListener('DOMContentLoaded', () => {
    const matches = document.querySelectorAll(element)
    const matchesArray = Array.from(matches)
    if (matchesArray.length > 0) {
      matchesArray.forEach(item => fn(item))
    }
  }, {
    once: true,
  })
}

export const select = (parent, child) => parent.querySelector(child)

export const selectAll = (parent, child) => {
  const matches = parent.querySelectorAll(child)
  const matchesArray = Array.from(matches)
  return matchesArray
}
