export function removeHTTPPrefix(link) {
  if (link?.trim().startsWith("https://")) {
    return link.slice(8);
  } else if (link?.trim().startsWith("http://")) {
    return link.slice(7);
  } else {
    return link;
  }
}
export function isValidLink(link) {
  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  return urlRegex.test(link);
}
