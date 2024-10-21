export const extractUserId = (url: string) => {
  const regex = /^\/api\/users\/([^/]+)\/?$/;
  const test = url.match(regex);

  return test ? test[1] : null;
};
