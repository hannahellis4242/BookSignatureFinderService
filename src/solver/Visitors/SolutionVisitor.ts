import Component from "../Composite/Component";
import Problem from "../Problem";
import Visitor from "./Visitor";

export default class SolutionVisitor implements Visitor<void> {
  solutions: Component[];
  constructor(private readonly problem: Problem) {
    this.solutions = [];
  }
  visit(c: Component): void {
    if (c.pages >= this.problem.range.min) {
      this.solutions.push(c);
    }
  }
  getSolutions() {
    return this.solutions;
  }
}
