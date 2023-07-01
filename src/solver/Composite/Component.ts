import SignatureKey from "../SignatureKey";
import Visitor from "../Visitors/Visitor";

export default interface Component {
  value: SignatureKey;
  pages: number;
  visit<T>(v: Visitor<T>): T;
  visitRecursive(v: Visitor<void>): void;
}
