export const nameOf = <T>(name: Extract<keyof T, string>): string => name;

/**
 * Used to extract the name of a variable by wrapping it in an object.
 * Should only be used for test code!
 *
 * Example: Getting the name of selectQuoteAsMerlinQuote as a string
 * ```typescript
 *   const name: string = nameOfVar({selectQuoteAsMerlinQuote})
 *          ^ = "selectQuoteAsMerlinQuote"
 * ```
 */
export const nameOfVar = <T>(variableWrappedInObject: Record<string, T>): string => {
  const variableName =
    Object.keys(variableWrappedInObject)?.length === 1 ? Object.keys(variableWrappedInObject)[0] : undefined;
  if (variableName) {
    return variableName;
  } else {
    throw new Error("nameOfVar was unable to to extract the name of " + variableWrappedInObject);
  }
};
