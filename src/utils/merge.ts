type Prim<T = unknown> = {
   [key in string]: T ;
};

type Indexed<T> = Prim<T> | T

const isObject = (item: any): boolean => {
  if (typeof item === 'object' && item !== null) {
    return item.toString() === '[object Object]';
  }
  return false;
};
function merge(lhs: Indexed<any>, rhs: Indexed<any>): Indexed<any> {
  const newObj:Indexed<any> = lhs;
  for (const key in rhs) {
    if (isObject(rhs[key]) && isObject(lhs[key])) {
      lhs[key] = merge(lhs[key], rhs[key]);
    } else {
      lhs[key] = rhs[key];
    }
  }
  return newObj;
}

export { merge };
