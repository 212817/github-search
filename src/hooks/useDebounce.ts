import { useState, useEffect } from 'react'

/**
 * "It returns a debounced version of the value passed in, that updates after a given delay."
 * 
 * The first line of the function is a TypeScript type annotation. It's not required, but it's a good
 * idea to include it. It tells us that the function takes a string and a number, and returns a string
 * @param {string} value - The value to be debounced.
 * @param {number} delay - The amount of time to wait before updating the value.
 * @returns A function that takes two arguments, value and delay, and returns a debounced value.
 */
export function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])
  return debouncedValue
}