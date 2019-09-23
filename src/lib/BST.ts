import { BSTNode } from './BST-Node';
import {
  IBST,
  IBSTNode,
  IComparable,
  INodeFactory,
  IRotation,
}                  from '../meta/interfaces';



export class BST<T extends IComparable,
  N extends IBSTNode<T> = IBSTNode<T>> implements IBST<T, N> {

  public constructor( nodeConstructor: INodeFactory<T, N> ) {
    this.nodeFactory = nodeConstructor;
  }


  public size           = 0;
  public root: N | null = null;


  public insert( item: T | N ): N {
    const node = item instanceof BSTNode
               ? item
               : this.wrapNode(item as T, null);

    if( this.root === null ) {
      this.root = node as N;
      this.size += 1;
      return this.root;
    }
    return this._insert(node as N, this.root);
  }


  public remove( item: T ): T {
    const node = this.find(item)!;
    if( !this._remove(node) ) {
      throw new Error('remove failed');
    }
    return item;
  }


  public find( item: T ): N {
    return this._find(item, this.root);
  }


  public* traversInOrderFrom( node: N | undefined | null = this.root ): IterableIterator<T> {
    if( !node ) {
      return [];
    }
    const queue: N[] = [ node ];

    while ( node.left !== null ) {
      node = node.left;
      queue.push(node);
    }
    while ( queue.length ) {
      const n = queue.pop()!;
      for ( const item of n ) {
        yield item;
      }
      if( n.right !== null ) {
        let node = n.right;
        queue.push(node);
        while ( node.left !== null ) {
          queue.push(node.left);
          node = node.left;
        }
      }
    }
  }


  public* traversPreOrderFrom( node: N | undefined | null = this.root ): IterableIterator<T> {
    if( !node ) {
      return [];
    }
    const queue: N[] = [ node ];
    let n: N | undefined;
    while ( queue.length ) {
      n = queue.pop()!;
      for ( const item of n ) {
        yield item;
      }
      if( n.right ) {
        queue.push(n.right);
      }
      while ( n.left ) {
        for ( const item of n.left ) {
          yield item;
        }
        n = n.left;
        if( n.right ) {
          queue.push(n.right);
        }
      }
    }
  }


  public* traversPostOrderFrom( node: N | undefined | null = this.root ): IterableIterator<T> {
    if( !node ) {
      return [];
    }
    const queue: N[] = [ node ];


    let n: N | undefined | null;
    let prev: N | null | undefined;

    while ( queue.length ) {
      n = queue[ queue.length - 1 ];
      switch ( true ) {
        case !(prev):
        case prev!.left === n:
        case prev!.right === n:
          if( n.left ) {
            queue.push(n.left);
            break;
          }
        case n.left === prev:
          if( n.right ) {
            queue.push(n.right);
            break;
          }
        case n.right === prev:
          queue.pop();
          for ( const item of n ) {
            yield item;
          }
      }
      prev = n;
    }
  }


  public rotateLeft( rotationRoot: N ): IRotation<N> {
    if( rotationRoot.right === null ) {
      throw new Error('no right node for right rotaion');
    }
    const nRoot        = rotationRoot.right;
    rotationRoot.right = nRoot.left;
    if( nRoot.left !== null ) {
      nRoot.left.parent = rotationRoot;
    }
    nRoot.parent = rotationRoot.parent;
    if( rotationRoot.parent === null ) {
      this.root = nRoot;
    } else {
      if( rotationRoot.isLeftChild() ) {
        rotationRoot.parent.left = nRoot;
      } else {
        rotationRoot.parent.right = nRoot;
      }
    }
    nRoot.left          = rotationRoot;
    rotationRoot.parent = nRoot;
    return { previousRoot : rotationRoot, currentRoot : nRoot };
  }


  public rotateRight( rotationRoot: N ): IRotation<N> {
    if( rotationRoot.left === null ) {
      throw new Error('no left nope for right rotation');
    }
    const nRoot       = rotationRoot.left;
    rotationRoot.left = nRoot.right;
    if( nRoot.right !== null ) {
      nRoot.right.parent = rotationRoot;
    }
    if( rotationRoot.parent === null ) {
      this.root = nRoot;
    } else {
      if( rotationRoot.isRightChild() ) {
        rotationRoot.parent.right = nRoot;
      } else {
        rotationRoot.parent.left = nRoot;
      }
    }

    nRoot.right         = rotationRoot;
    rotationRoot.parent = nRoot;

    return { currentRoot : nRoot, previousRoot : rotationRoot };
  }


  protected nodeFactory: INodeFactory<T, N>;


  protected _remove( node: N ): boolean {
    switch ( true ) {
      case node === this.root && this.root!.right === null && this.root!.left !== null:
        // node is the root and has only a left child
        this.root         = this.root!.left;
        this.root!.parent = null;
        break;
      case node === this.root && this.root!.right !== null && this.root!.left === null:
        // node is root and has only a right child
        this.root         = this.root!.right;
        this.root!.parent = null;
        break;
      case node.right === null && node.left === null && node.parent === null:
        // not sure what this is for..
        this.root = null;
        break;

      case node.parent !== null && node.left === null && node.right === null:
        // node has a parent but no children
        //@ts-ignore
        node.parent!.removeChild(node.comparable);
        break;
      case node.left !== null && node.right === null:
        // node only has a left child
        node.parent!.swapChild(node!, node.left!);
        break;

      case node.left === null && node.right !== null:
        // node only has a right child
        node.parent!.swapChild(node!, node.right!);
        break;
      case node.left !== null && node.right !== null: {
        const nextInOrderNode = this.min(node.right!);

        node.right!.left = nextInOrderNode.right!;
        if( nextInOrderNode.right !== null ) {
          nextInOrderNode.right.parent = node.right!;
        }

        nextInOrderNode.right = node.right!;
        node.right!.parent    = nextInOrderNode!;

        nextInOrderNode.left = node.left!;
        node.left!.parent    = nextInOrderNode!;

        if( node.isLeftChild() ) {
          node.parent!.left = nextInOrderNode!;
        } else {
          node.parent!.right = nextInOrderNode!;
        }

      }
        break;
      default:
        return false;

    }
    this.size -= 1;
    return true;
  }


  protected min( node: N ): N {
    let minNode = node;
    while ( minNode.left !== null ) {
      minNode = minNode.left;
    }
    return minNode;
  }


  protected wrapNode( item: T, parent: N | null ): N {
    return this.nodeFactory(item, parent);
  }


  protected _insert( item: N, parent: N ): N {
    switch ( true ) {
      //@ts-ignore
      case item > parent && parent.right === null:
        item.parent  = parent;
        parent.right = item;
        break;

      //@ts-ignore
      case item < parent && parent.left === null:
        item.parent = parent;
        parent.left = item;
        break;
      //@ts-ignore
      case item > parent && parent.right !== null:
        return this._insert(item, parent.right!);
      //@ts-ignore
      case item < parent && parent.left !== null:
        return this._insert(item, parent.left!);
      default:
        throw new Error('something went wrong');
    }
    this.size += 1;
    return item;
  }


  protected _find( item: T, root: N | null ): N {
    switch ( true ) {
      case root === undefined:
      case root === null:
        throw new Error('no root');
      //@ts-ignore
      case item.valueOf() == root:
        return root!;
      //@ts-ignore
      case item > root && root!.right !== null:
        return this._find(item, root!.right!);
      //@ts-ignore
      case item < root && root!.left !== null:
        return this._find(item, root!.left!);
      default:
        throw new Error('not found');
    }
  }

}

