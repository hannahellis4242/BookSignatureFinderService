import Component from "../Composite/Component";

export default interface Visitor<T> {
  visit(c: Component): T;
}
