import { IBST, IBSTNode, IComparable } from './meta/interfaces';
import { BST }                         from './lib/BST';

import { createBSTNode } from './lib/BST-Node';


export function createBST<T extends IComparable>(): IBST<T, IBSTNode<T>> {
  return new BST<T, IBSTNode<T>>(createBSTNode);
}
