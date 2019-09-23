import { IBSTNode, IComparable } from '../meta/interfaces';



export class BSTNode<T extends IComparable> {
  //@ts-ignore
  public constructor( item: T, parent: this | null = null, comparable?: number ) {
    this.parent     = parent;
    this._item = item;
    this.comparable = comparable === undefined ? item.valueOf(): comparable;
  }


  public _item: T | null;
  public comparable: number;
  public _left: this | null   = null;
  public _right: this | null  = null;
  public _parent: this | null = null;


  public get item(): T{
    if(this._item === null){
      throw new Error('item is null');
    }
    return this._item;
  }
  //@ts-ignore
  protected _removeChild( item: T, child: this | null ): boolean {
    if( child === null ) {
      return false;
    }
    return true;
  }


  public get left(): this | null {
    return this._left;
  }


  public set left( v: this | null ) {
    this._left = v;
  }


  public get right(): this | null {
    return this._right;
  }


  public set right( v: this | null ) {
    this._right = v;
  }


  public get parent(): this | null {
    return this._parent;
  }


  public set parent( v: this | null ) {
    this._parent = v;
  }


  public valueOf(): number {
    return this.comparable.valueOf();
  }


  public isLeftChild(): boolean {
    return this.parent !== null
           ? this.parent.left === this
           : false;
  }


  public [ Symbol.toPrimitive ]( hint: 'string' | 'number' | 'default' ): number {
    switch ( hint ) {
      case 'string':
        return this.comparable.valueOf();
      case 'number':
        return this.comparable.valueOf();
      default:
        return this.comparable.valueOf();
    }
  }

  public removeChild( item: T ): boolean {
    //@ts-ignore
    if(this.left !== null && item.valueOf() == this.left){
      this.left.parent = null;
      this.left = null;
      return true;
    }
    //@ts-ignore
    if(this.right !== null && item.valueOf() == this.right){
      this.right.parent = null;
      this.right = null;
      return true;
    }
    throw new Error('child does not exist on node');
  }

  public removeLeftChild( item: T ): boolean {
    if( this._removeChild(item, this.left) ) {
      this.left = null;
      return true;
    }
    return false;
  }


  public removeRightChild( item: T ): boolean {
    if( this._removeChild(item, this.right) ) {
      this.right = null;
      return true;
    }
    return false;
  }


  public isRightChild(): boolean {
    return this.parent !== null
           ? this.parent.right === this
           : false;
  }

  public * [Symbol.iterator](): Iterator<T> {
    yield this.item;
  }


  public swapChild( currentChild: this, newChild: this ): void {
    switch ( true ) {
      //@ts-ignore
      case this.left !== null && this.left!.valueOf() == currentChild:
        this.left = newChild;
        break;
      //@ts-ignore
      case this.right !== null && this.right!.valueOf() == currentChild:
        this.right = newChild;
        break;
      default:
        throw new Error('could not find child');
    }

    if(newChild.parent){
      //@ts-ignore
      newChild.parent.removeChild(newChild);
    }
    newChild.parent = this;
  }
}


export function createBSTNode<T extends IComparable>(item: T,
                                                     parent: IBSTNode<T> | null = null,
                                                     comparable?: number): IBSTNode<T> {
  return new BSTNode(item, parent, comparable);
}

