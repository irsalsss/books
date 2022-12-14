export const isArray = (a: any) => Array.isArray(a);
export const isEmpty = (obj: any) => [Object, Array].includes((obj || {}).constructor)
  && !Object.entries(obj || {}).length;
export const deepClone = (data: any) => JSON.parse(JSON.stringify(data));