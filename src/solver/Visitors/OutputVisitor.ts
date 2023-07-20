import Component from "../Composite/Component";
import OutputSignatureList from "../Output/OutputSignatureList";
import OutputConfig from "../OutputConfig";
import SignatureKey, { toString } from "../SignatureKey";
import pageCount from "../pageCount";
import Visitor from "./Visitor";

const createSignatureString = (
  sk: SignatureKey,
  includePageCount: boolean
): string => {
  const keyStr = toString(sk);
  if (includePageCount) {
    return keyStr.concat(`;${pageCount(sk)}`);
  }
  return keyStr;
};

const createSignatureList = (
  sk: SignatureKey,
  includePageCount: boolean
): OutputSignatureList => {
  const out = {
    signatures: Array.from(sk.entries()).map(([k, v]) => ({
      size: k,
      count: v,
    })),
  };
  if (includePageCount) {
    return { ...out, pages: pageCount(sk) };
  }
  return out;
};

export default class OutputVisitor
  implements Visitor<string | OutputSignatureList>
{
  constructor(private readonly config: OutputConfig) {}
  visit(c: Component): string | OutputSignatureList {
    switch (this.config.format) {
      case "text":
        return createSignatureString(c.value, this.config.includePageCount);
      case "json":
        return createSignatureList(c.value, this.config.includePageCount);
    }
  }
}
