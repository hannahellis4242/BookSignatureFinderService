export type SignatureOutputFormat = "json" | "string";

export default interface OutputConfig {
  format: SignatureOutputFormat;
  includePageCount: boolean;
}
