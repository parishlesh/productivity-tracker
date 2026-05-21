import {
  productiveDomains,
  distractingDomains,
} from "../constants/domains";

export function classifyDomain(
  url: string
):
  | "productive"
  | "distracting"
  | "neutral" {
  const productive = productiveDomains.some(
    (domain) => url.includes(domain)
  );

  if (productive) {
    return "productive";
  }

  const distracting = distractingDomains.some(
    (domain) => url.includes(domain)
  );

  if (distracting) {
    return "distracting";
  }

  return "neutral";
}