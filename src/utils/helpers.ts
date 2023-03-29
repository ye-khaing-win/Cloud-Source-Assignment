export const isEmptyObj = (obj: object): boolean => {
  return Object.keys(obj).length === 0;
};

export const isEmptyArr = (arr: any[]): boolean => {
  return arr.length === 0;
};
