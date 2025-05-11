import { useEffect, useState } from "react";

export default function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    console.log("Typing:"); // fires on every keystroke
    const timer = setTimeout(() => {
      setDebouncedValue(value);
      console.log("Debounced Query Set:"); // after 500ms of inactivity
    }, delay);
    return () => {
      console.log("Clearing timeout"); // shows when debounce resets
      clearTimeout(timer);
    };
  }, [value, delay]);
  return debouncedValue;
}
