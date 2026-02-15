// Shared YouTube helpers for the client

export const isValidYoutubeUrl = (url) => {
  if (!url || typeof url !== "string") return false;

  // Regular YouTube URLs
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return true;
  }

  // Shorts URLs
  const shortsRegExp = /\/shorts\/([^#&?/]*)/;
  const shortsMatch = url.match(shortsRegExp);
  if (shortsMatch && shortsMatch[1] && shortsMatch[1].length === 11) {
    return true;
  }

  return false;
};

export const getYoutubeVideoId = (url) => {
  if (!url || typeof url !== "string") return null;

  // Regular YouTube URLs
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return match[2];
  }

  // Shorts URLs
  const shortsRegExp = /\/shorts\/([^#&?/]*)/;
  const shortsMatch = url.match(shortsRegExp);
  if (shortsMatch && shortsMatch[1] && shortsMatch[1].length === 11) {
    return shortsMatch[1];
  }

  return null;
};

