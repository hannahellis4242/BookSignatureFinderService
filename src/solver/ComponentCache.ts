import Component from "./Component";
import Composite from "./Composite";
import Problem from "./Problem";
import SignatureKey, { toString } from "./SignatureKey";
import pageCount from "./pageCount";

export default class ComponentCache {
  data: Map<string, Component>;
  constructor(private readonly problem: Problem) {
    this.data = new Map<string, Component>();
  }
  get(sk: SignatureKey): Component {
    const key = toString(sk);
    const curent = this.data.get(key);
    if (curent) {
      return curent;
    }
    const newComponent = new Composite(this.problem, this, sk, pageCount(sk));
    this.data.set(key, newComponent);
    return newComponent;
  }
}
