// Shared YouTube helpers for validation/parsing

/**
 * Validate a YouTube URL (supports standard and Shorts URLs).
 */
export const isValidYoutubeUrl = (url) => {
  if (!url || typeof url !== "string") return false;

  // Regular YouTube URLs
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return true;
  }

  // YouTube Shorts URLs
  const shortsRegExp = /\/shorts\/([^#&?/]*)/;
  const shortsMatch = url.match(shortsRegExp);
  if (shortsMatch && shortsMatch[1] && shortsMatch[1].length === 11) {
    return true;
  }

  return false;
};

