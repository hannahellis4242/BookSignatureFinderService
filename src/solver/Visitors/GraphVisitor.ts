import Component from "../Composite/Component";
import Visitor from "./Visitor";
import graphviz, { Graph } from "graphviz";
import { toString } from "../SignatureKey";
import Composite from "../Composite";

export default class GraphVisitor implements Visitor<void> {
  graph: Graph;
  constructor() {
    this.graph = graphviz.digraph("tree");
  }
  visit(c: Component): void {
    if (c instanceof Composite) {
      const node = this.graph.addNode(toString(c.value));
      c.children.forEach((child) => {
        const childNode = this.graph.addNode(toString(child.value));
        this.graph.addEdge(node, childNode);
      });
    }
  }
  toDot() {
    return this.graph.to_dot();
  }
}
