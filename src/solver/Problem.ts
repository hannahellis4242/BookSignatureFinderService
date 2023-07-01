export interface Range {
  min: number;
  max: number;
}

export default interface Problem {
  allowed: number[];
  range: Range;
}
