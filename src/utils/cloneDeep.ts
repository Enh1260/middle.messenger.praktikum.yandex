function cloneDeep<T extends object = object>(obj: T) {
  const isObject = (obj: object): boolean => (obj !== null && typeof obj === 'object');
  let result: any = [];
  if (Array.isArray(obj)) {
    obj.forEach((item, index) => {
      if (isObject(item)) {
        result[index] = cloneDeep(item) as T;
      } else {
        result[index] = item;
      }
    });
    return result as T;
  }
  if (obj.toString() === '[object Object]') {
    const arrObj = Object.entries(obj);

    arrObj.forEach((item, index) => {
      if (isObject(item)) {
        result[index] = cloneDeep(item);
      } else {
        result[index] = item;
      }
    });
    result = Object.fromEntries(result);
  }
  return result as T;
}

export default cloneDeep;
