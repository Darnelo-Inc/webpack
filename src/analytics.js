import * as $ from "jquery"

function createAnalytics() {
  let count = 0
  let isDestoroyed = false

  const clickHandler = () => count++

  $(document).on("click", clickHandler)

  return {
    destroy() {
      $(document).off("click", clickHandler)
      isDestoroyed = true
    },
    getClicks() {
      if (isDestoroyed) {
        return "Analytics has been destroyed"
      }
      return count
    },
  }
}

globalThis.analytics = createAnalytics() // seems to be a bad pattern
