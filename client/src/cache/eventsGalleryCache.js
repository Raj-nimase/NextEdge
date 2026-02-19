/**
 * In-memory cache for Events and Gallery page data.
 * Survives navigation within the same tab; cleared on full page reload.
 */

let eventsCache = null;
let galleryCache = null;

export const eventsCacheStore = {
  get() {
    return eventsCache;
  },
  set(data) {
    eventsCache = Array.isArray(data) ? data : null;
  },
};

export const galleryCacheStore = {
  get() {
    return galleryCache;
  },
  set(data) {
    galleryCache = Array.isArray(data) ? data : null;
  },
};
