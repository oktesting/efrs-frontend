export function getResizedImage(url, size, getSquare) {
  if (url === undefined || url === null || url.trim() === "") return url;
  const a = "https://efrs.s3-ap-southeast-1.amazonaws.com/",
    b = "https://efrs.s3.ap-southeast-1.amazonaws.com/";
  let newUrl = url.trim();
  if (!newUrl.includes(a) && !newUrl.includes(b)) return url;
  else {
    if (newUrl.includes(a)) newUrl = newUrl.replace(a, "");
    if (newUrl.includes(b)) newUrl = newUrl.replace(b, "");
    if (getSquare)
      return `http://efrs.imgix.net/${newUrl}?w=${size}&h=${size}&fit=crop`;
    else return `http://efrs.imgix.net/${newUrl}?w=${size}`;
  }
}
