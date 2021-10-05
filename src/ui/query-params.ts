export const parseQueryParams = (url: string): Record<string, string> => {
  const regex = /[?&]([^=#]+)=([^&#]*)/g;
  let params: Record<string, string> = {};
  let match: RegExpExecArray | null;
  while ((match = regex.exec(url))) {
    params[match[1]] = match[2];
  }
  return params;
};
