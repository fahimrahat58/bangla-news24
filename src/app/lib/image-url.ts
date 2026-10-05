export function getImageUrl(url: string) {
  if (!url) return "";

  const trimmedUrl = url.trim();

  // Google Drive URL
  if (trimmedUrl.includes("drive.google.com/file/d/")) {
    const match = trimmedUrl.match(/\/file\/d\/([^/]+)/);

    if (match?.[1]) {
      return `https://drive.google.com/uc?export=view&id=${match[1]}`;
    }
  }

  // Google Drive open URL
  if (trimmedUrl.includes("drive.google.com/open?id=")) {
    const match = trimmedUrl.match(/[?&]id=([^&]+)/);

    if (match?.[1]) {
      return `https://drive.google.com/uc?export=view&id=${match[1]}`;
    }
  }

  // Already direct Google Drive URL
  if (trimmedUrl.includes("drive.google.com/uc?")) {
    return trimmedUrl;
  }

  // Other image URLs
  return trimmedUrl;
}