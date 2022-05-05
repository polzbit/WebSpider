export const isValidUrl = (url) => {
  /* check if url is valid link */
  return url.match(
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)/
  )
    ? true
    : false;
};
