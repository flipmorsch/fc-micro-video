export function deepFreeze<T>(obj: T): T {
  Object
    .getOwnPropertyNames(obj)
    .forEach(prop => {
      if (typeof obj[prop as keyof T] === 'object') {
        deepFreeze(obj[prop as keyof T])
      }
    })
  return Object.freeze(obj)
}