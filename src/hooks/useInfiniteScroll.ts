import { useState, useEffect } from "react";

type IInfiniteScroll = [setIsFetching: (isFetching: boolean) => void];

/**
 * It returns a boolean value that is true when the user has scrolled to the bottom of the page.
 * @param callback - () => void
 * @returns An array of one element.
 */
const useInfiniteScroll = (callback: () => void): IInfiniteScroll => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    callback();
  }, [isFetching, callback]);

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isFetching
    )
      return;
    setIsFetching(true);
  }
  return [setIsFetching];
};

export default useInfiniteScroll;