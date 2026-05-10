const dictionaries = {
  en: () => import("./en.json").then((module) => module.default),
  ta: () => import("./ta.json").then((module) => module.default),
};

export const getDictionary = async (locale: "en" | "ta") => {
  // Add a fallback in case the locale is not matched
  const loadDictionary = dictionaries[locale] || dictionaries.ta;
  return loadDictionary();
};
