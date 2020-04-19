export function getSquareImage(url, size) {
  if (url === undefined || url === null || url.trim() === "") return url;
  const a = "https://efrs.s3-ap-southeast-1.amazonaws.com/",
    b = "https://efrs.s3.ap-southeast-1.amazonaws.com/";
  let newUrl = url.trim();
  if (!newUrl.includes(a) && !newUrl.includes(b)) return url;
  else {
    if (newUrl.includes(a)) newUrl = newUrl.replace(a, "");
    if (newUrl.includes(b)) newUrl = newUrl.replace(b, "");
    return `http://efrs.imgix.net/${newUrl}?w=${size}&h=${size}&fit=crop`;
  }
}
