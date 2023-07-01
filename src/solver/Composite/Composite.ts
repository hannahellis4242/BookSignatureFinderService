import Problem from "../Problem";
import SignatureKey, { addSignatures } from "../SignatureKey";
import Visitor from "../Visitors/Visitor";
import pageCount from "../pageCount";
import Component from "./Component";
import ComponentCache from "./ComponentCache";

export default class Composite implements Component {
  children: Component[];
  constructor(
    problem: Problem,
    cache: ComponentCache,
    public readonly value: SignatureKey,
    public readonly pages: number
  ) {
    const { allowed, range } = problem;
    const { max } = range;
    this.children = allowed
      .map((x) => addSignatures(value, x, 1))
      .map((key) => [key, pageCount(key)] as [SignatureKey, number])
      .filter(([_, count]) => count <= max)
      .map(([key, _]) => cache.get(key));
  }
  visit<T>(v: Visitor<T>): T {
    return v.visit(this);
  }
  visitRecursive(v: Visitor<void>): void {
    v.visit(this);
    this.children.forEach((child) => child.visitRecursive(v));
  }
}
