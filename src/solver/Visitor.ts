import Component from "./Component";

export default interface Visitor<T> {
  visit(c: Component): T;
}
