export const removeAccents = (text: string): string => {
  return (text || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

/**
 * Remove accents and characters specials
 * @param text string
 * @returns string
 * @example
 * Input: 'City Medellín '
 * Output: 'citydemedellin'
 */
export const clearText = (text = ""): string => {
  const textFiltered = text.replace(/_|\s|-|\.|,|'/g, "");
  return removeAccents(textFiltered).toLowerCase().trim();
};

export const concatString = (strings: any[]) => {
  const list = (strings || []).filter((e) => e);

  const removeElementsDuplicates = Array.from(new Set(list));

  return removeElementsDuplicates.join(" ").trim();
};
