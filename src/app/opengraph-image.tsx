import { logoOgImage, ogAlt, ogContentType, ogSize } from "@/lib/og";

// One share image for the whole site: the Celestiq logo. Child routes inherit it.
export const alt = ogAlt;
export const size = ogSize;
export const contentType = ogContentType;

export default function OpengraphImage() {
  return logoOgImage();
}
