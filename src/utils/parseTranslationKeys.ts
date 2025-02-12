// Helper type to extract keys that start with K and remove the prefix
// This type does the following:
// 1. It takes T (which is known to be Record<string, string>) and K (the
// prefix)
// 2. It creates a mapped type that:
//    a. Iterates over all keys P in T
//    b. If P starts with K followed by a dot, it extracts the rest (R) of the
//    key
//    c. If it doesn't start with K, it maps to never (which will be filtered
//    out)
// 3. Then it uses keyof T to only keep the non-never keys
export type FilteredKeys<T extends Record<string, string>, K extends string> = {
  [P in keyof T]: P extends `${K}.${infer R}` ? R : never;
}[keyof T];

/**
 * Parses translation keys based on a given prefix and returns a new object with
 * matching translations.
 *
 * @function parseTranslationKeys
 * @param {K} key - The prefix to filter translation keys
 * @param {T} translations - A `strings` object containing
 * the translation string
 *
 * @returns {Pick<T, FilteredKeys<T, K>>} A new object with filtered
 * translations.
 */
const parseTranslationKeys = <
  K extends string,
  T extends Record<string, string>,
>(
  key: K,
  translations: T,
): { [P in FilteredKeys<T, K>]: T[`${K}.${P}`] } => {
  // Create a partial object to store the filtered translations
  const obj: Partial<{ [P in FilteredKeys<T, K>]: T[`${K}.${P}`] }> = {};

  // Iterate through all keys in the translations object
  (Object.keys(translations) as Array<keyof T>).forEach((k) => {
    const keyAsString = k as string;

    // Check if the current key starts with the given prefix
    if (keyAsString.startsWith(key)) {
      // Extract the new key by removing the prefix
      const newKey = keyAsString.replace(`${key}.`, '') as FilteredKeys<T, K>;

      // Here we ensure the type matches using a type assertion
      obj[newKey] = translations[k] as T[`${K}.${FilteredKeys<T, K>}`];
    }
  });

  // Return the completed object, asserting its full type
  return obj as { [P in FilteredKeys<T, K>]: T[`${K}.${P}`] };
};

export default parseTranslationKeys;
