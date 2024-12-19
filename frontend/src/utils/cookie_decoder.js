export const getCookieValue = (key) => {
  const matches = document.cookie.match(new RegExp(`(?:^|; )${key}=([^;]*)`));
  return matches ? decodeURIComponent(matches[1]) : "";
};
