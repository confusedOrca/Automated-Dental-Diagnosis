export const updateCookie = (imageUrl, maskUrl, report) => {
  document.cookie = `imageUrl=${encodeURIComponent(imageUrl)}; path=/;`;
  document.cookie = `maskUrl=${encodeURIComponent(maskUrl)}; path=/;`;
  document.cookie = `report=${encodeURIComponent(report)}; path=/;`;
};
