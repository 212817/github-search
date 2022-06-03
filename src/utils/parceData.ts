/**
 * It takes a string, converts it to a date, then formats it to a string
 * @param {string} data - string - the date string you want to format
 * @returns A string
 */
export const parceData = (data: string) => {
  let formatter = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  let d = new Date(Date.parse(data));
  return formatter.format(d)
}

/**
 * It takes an array of objects and returns an array of objects with only the keys specified in the
 * second argument
 * @param {any} data - any - the data you want to transform
 * @param arr - an array of keys to be extracted from the data
 * @returns An array of objects with the keys specified in the array.
 */
export const transformData = (data: any, arr = ['id']) => {
  return data.map((item: {[key: string]: string}) => {
    return arr.reduce(function (target:  {[key: string]: string}, key) {
      target[key] = item[key];
      return target;
    }, {})
  }
  )
}
