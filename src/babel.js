asyncFunc = async () => {
  return await Promise.resolve("Resolved promise")
}

asyncFunc().then((res) => console.log(res))

class Util {
  static id = Date.now()
}

console.log("Util.id:", Util.id)
