export const debounce = (fnCallback: Function, timeout = 1000) => {
  let timeoutRef: NonNullable<NodeJS.Timeout>;
  return (...params: any) => {
    if (timeoutRef) {
      clearTimeout(timeoutRef);
    }

    timeoutRef = setTimeout(() => {
      fnCallback(...params);
    }, timeout);
  };
};
