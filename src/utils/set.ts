type Indexed<T = unknown> = {
    [key in string]: T;
};
function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }
  if (typeof object !== 'object') return object;

  const pathArr = path.split('.');
  const objValue: object = { [pathArr[pathArr.length - 1]]: value };
  pathArr.splice(-1);
  const lol = pathArr.reduceRight((acc, cur) => ({ [cur]: acc }), objValue);
  Object.assign(object, lol);
  return object;
}
export default set;
