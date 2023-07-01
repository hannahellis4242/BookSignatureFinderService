import ComponentCache from "./Composite/ComponentCache";
import Problem from "./Problem";
import { EmptySignatureKey } from "./SignatureKey";
import SolutionVisitor from "./Visitors/SolutionVisitor";

const solve = (problem: Problem) => {
  const cache = new ComponentCache(problem);
  cache.get(EmptySignatureKey()); //kicks off tree construction
  /*{
      const graphVisitor = new GraphVisitor();
      Array.from(cache.data.values()).forEach((v) => v.visit(graphVisitor));
      console.log(graphVisitor.toDot());
    }*/
  const solutonVisitor = new SolutionVisitor(problem);
  Array.from(cache.data.values()).forEach((v) => v.visit(solutonVisitor));
  return solutonVisitor.getSolutions();
};
export default solve;
