const asyncFunc = async () => {
  return await Promise.resolve("Resolved promise")
}

asyncFunc().then((res) => console.log(res))

class Util {
  static id = Date.now()
}

console.log("Util.id:", Util.id)

import("lodash").then(({ default: _ }) =>
  console.log("Lodash:", _.random(0, 42))
)
