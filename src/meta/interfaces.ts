

export interface INode<T extends IComparable> extends IComparable{
  left: this | null;
  right: this | null;
  parent: this | null;
  comparable: number;
  item: T;
}

export interface IDataStructure<T extends IComparable, N extends INode<T>> {
  size: number;
  root: N | null;
  insert(item: T): N;
  remove(item: T): T;
  find(item: T): N;
  traversInOrderFrom(node?: N| null): IterableIterator<T>;
  traversPreOrderFrom(node?: N| null): IterableIterator<T>;
  traversPostOrderFrom(node?: N| null): IterableIterator<T>;
}

export interface IBST<T extends IComparable, N extends IBSTNode<T>> extends IDataStructure<T, N>{
  rotateLeft( rotationRoot: N ): IRotation<N>;

  rotateRight( rotationRoot: N ): IRotation<N>;
}



export interface IRotation<N> {
  previousRoot: N;
  currentRoot: N;
}


export interface IComparable {
  [ Symbol.toPrimitive ]?( hint?: 'string' | 'number' | 'default' ): number;

  valueOf(): number;

  // [ index: string ]: any;
}



export interface INodeFactory<T extends IComparable, N extends IBSTNode<T>> {
  ( item: T,
    parent: N | null,
    comparable?: number,
    // drill?: Drill<T>,
    // level?: number,
  ): N;
}


export interface IBSTNode<T extends IComparable> extends INode<T>{

  [ Symbol.iterator ](): Iterator<T>;

  comparable: number;
  swapChild( currentChild: this, newChild: this ): void;


  removeChild( node: T ): void;

  isLeftChild(): boolean;

  isRightChild(): boolean;
}

