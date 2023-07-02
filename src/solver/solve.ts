import ComponentCache from "./Composite/ComponentCache";
import OutputConfig from "./OutputConfig";
import Problem from "./Problem";
import { EmptySignatureKey } from "./SignatureKey";
import OutputVisitor from "./Visitors/OutputVisitor";
import SolutionVisitor from "./Visitors/SolutionVisitor";

const solve = (problem: Problem) => (config: OutputConfig) => {
  const cache = new ComponentCache(problem);
  cache.get(EmptySignatureKey()); //kicks off tree construction
  /*{
      const graphVisitor = new GraphVisitor();
      Array.from(cache.data.values()).forEach((v) => v.visit(graphVisitor));
      console.log(graphVisitor.toDot());
    }*/
  const solutonVisitor = new SolutionVisitor(problem);
  Array.from(cache.data.values()).forEach((v) => v.visit(solutonVisitor)); //populates the solutions in solutionVisitor
  const outputVisitor = new OutputVisitor(config);
  return solutonVisitor.getSolutions().map((x) => x.visit(outputVisitor)); //formats the output
};
export default solve;
