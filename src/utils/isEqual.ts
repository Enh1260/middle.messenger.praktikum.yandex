type Indexed<T = unknown> = {
    [key in string]: T;
};
const isObject = (obj: Indexed): boolean =>
  (obj !== null
  && typeof obj === 'object'
  && !Array.isArray(obj));

function isEqual(a: Indexed, b: Indexed): boolean | never {
  if (isObject(a) && isObject(b)) {
    for (const key in b) {
      if (Object.prototype.hasOwnProperty.call(b, key)) {
        if (typeof a[key] === 'function' && typeof b[key] === 'function') return true;
        if (isObject(a[key] as Indexed) && isObject(b[key] as Indexed)) {
          if (isEqual(a[key] as Indexed, b[key] as Indexed) === false) return false;
        } else if ((a[key] === b[key]) === false) {
          return false;
        }
      }
    }
  } else if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return b.every((item, index) => item === b[index]);
  } else {
    return a === b;
  }

  return true;
}

export { isEqual };
