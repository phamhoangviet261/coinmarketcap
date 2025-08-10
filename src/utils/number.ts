/**
 * Format a number into a short human-readable string with M (Million), B (Billion), or T (Trillion) suffix.
 *
 * @param value - The number to format
 * @param decimals - Number of decimal places to keep (default: 2)
 * @returns Formatted string (e.g., "1.23M", "4.56B", "7.89T", "123" for small numbers)
 */
export function formatNumberShort(value: number, decimals: number = 2): string {
  if (value == null || isNaN(value)) return '-';

  const absValue = Math.abs(value);

  if (absValue >= 1_000_000_000_000) {
    return (value / 1_000_000_000_000).toFixed(decimals) + 'T';
  } else if (absValue >= 1_000_000_000) {
    return (value / 1_000_000_000).toFixed(decimals) + 'B';
  } else if (absValue >= 1_000_000) {
    return (value / 1_000_000).toFixed(decimals) + 'M';
  }

  return value.toString();
}

// --- Example usage ---
console.log(formatNumberShort(1234567)); // "1.23M"
console.log(formatNumberShort(9876543210)); // "9.88B"
console.log(formatNumberShort(456_000_000_000)); // "456.00B"
console.log(formatNumberShort(1_234_000_000_000)); // "1.23T"
console.log(formatNumberShort(1234)); // "1234"
