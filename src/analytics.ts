import * as $ from "jquery"

function createAnalytics() {
  let count: number = 0
  let isDestoroyed: boolean = false

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
