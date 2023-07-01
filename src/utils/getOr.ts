const getOr = <T>(x: T | undefined, y: T): T => (x ? x : y);
export default getOr;
