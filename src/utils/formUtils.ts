/**
 * Formats a phone number by removing non-digit characters and applying a specific format.
 * @param value - The phone number to format.
 * @returns The formatted phone number.
 */
export const formatPhoneNumber = (value: string) => {
  // Remove all non-digit characters
  const cleaned = value.replace(/\D/g, "");

  // Remove leading "1" if present - this is a US-only phone number format
  const formattedValue = cleaned.startsWith("1") ? cleaned.slice(1) : cleaned;

  // Format the phone number
  const match = formattedValue.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }

  return cleaned;
};
