import Component from "./Component";
import { toString } from "./SignatureKey";
import SignatureObject from "./SignatureObject";
import Visitor from "./Visitors/Visitor";

interface Output {
  pages: number;
}

export interface OutputSignature extends Output {
  key: SignatureObject;
}

export interface OutputString extends Output {
  key: string;
}

export class OutputStringVisitor implements Visitor<OutputString> {
  visit(c: Component): OutputString {
    return { pages: c.pages, key: toString(c.value) };
  }
}

export class OutputSignatureVisitor implements Visitor<OutputSignature> {
  visit(c: Component): OutputSignature {
    return {
      pages: c.pages,
      key: Array.from(c.value.entries()).reduce<SignatureObject>(
        (acc, [k, v]) => {
          acc[k] = v;
          return acc;
        },
        {}
      ),
    };
  }
}
