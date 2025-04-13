// utils/careInstructions.ts
export function extractCareInstructions(text: string) {
  const lower = text.toLowerCase();
  return {
    watering: lower.includes("moist")
      ? "Keep soil moist"
      : lower.includes("dry")
      ? "Allow to dry out"
      : "Watering info not found",

    sunlight: lower.includes("direct sunlight")
      ? "Full sun"
      : lower.includes("shade")
      ? "Shade"
      : lower.includes("indirect light")
      ? "Indirect light"
      : "Light preference not found",

    beginnerFriendly:
      lower.includes("easy to care") || lower.includes("low maintenance")
        ? "Yes"
        : "Not specified",
  };
}
