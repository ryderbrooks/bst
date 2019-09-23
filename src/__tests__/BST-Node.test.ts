import { createBSTNode } from '../lib/BST-Node';


describe('#BST-Node', () => {

  describe('#removeChild', () => {
    it('returns true if the item removed was the right child', () => {
      const parentNod = createBSTNode<number>(1);
      const leftNode  = createBSTNode<number>(0, parentNod);
      const rightNode = createBSTNode<number>(3, parentNod);

      parentNod.right = rightNode;
      parentNod.left  = leftNode;
      expect(parentNod.removeChild(3)).toEqual(true);
    });
    it('sets right child to null', () => {
      const parentNod = createBSTNode<number>(1);
      const leftNode  = createBSTNode<number>(0, parentNod);
      const rightNode = createBSTNode<number>(3, parentNod);

      parentNod.left  = leftNode;
      parentNod.right = rightNode;
      parentNod.removeChild(3);
      expect(parentNod.right).toEqual(null);
    });
    it('sets left child to null', () => {
      const parentNod = createBSTNode<number>(1);
      const leftNode  = createBSTNode<number>(0, parentNod);
      const rightNode = createBSTNode<number>(3, parentNod);

      parentNod.left  = leftNode;
      parentNod.right = rightNode;
      parentNod.removeChild(0);
      expect(parentNod.left).toEqual(null);
    });
    it('returns true if the item removed for left child', () => {
      const parentNod = createBSTNode<number>(1);
      const leftNode  = createBSTNode<number>(0, parentNod);
      const rightNode = createBSTNode<number>(3, parentNod);

      parentNod.right = rightNode;
      parentNod.left  = leftNode;
      expect(parentNod.removeChild(0)).toEqual(true);
    });
    it('throws if the item to be removed was neither right nor left child', () => {
      const parentNod = createBSTNode<number>(1);
      const leftNode  = createBSTNode<number>(0, parentNod);
      const rightNode = createBSTNode<number>(3, parentNod);

      parentNod.right = rightNode;
      parentNod.left  = leftNode;
      expect(() => parentNod.removeChild(5)).toThrow('child does not exist on node');
    });

  });

  describe('#isRightChild', () => {
    it('returns true when item is equal to right', () => {
      const parentNod = createBSTNode<number>(1);
      const leftNode  = createBSTNode<number>(0, parentNod);
      const rightNode = createBSTNode<number>(3, parentNod);

      parentNod.right = rightNode;
      parentNod.left  = leftNode;
      expect(rightNode.isRightChild()).toEqual(true);
    });

    it('returns false when item is not equal to right', () => {
      const parentNod = createBSTNode<number>(1);
      const leftNode  = createBSTNode<number>(0, parentNod);
      const rightNode = createBSTNode<number>(3, parentNod);

      parentNod.right = rightNode;
      parentNod.left  = leftNode;
      expect(leftNode.isRightChild()).toEqual(false);
    });

  });

  describe('#isLeftChild', () => {
    it('returns true when item is equal to left', () => {
      const parentNod = createBSTNode<number>(1);
      const leftNode  = createBSTNode<number>(0, parentNod);
      const rightNode = createBSTNode<number>(3, parentNod);

      parentNod.right = rightNode;
      parentNod.left  = leftNode;
      expect(leftNode.isLeftChild()).toEqual(true);
    });
    it('returns false when item is not equal to left', () => {
      const parentNod = createBSTNode<number>(1);
      const leftNode  = createBSTNode<number>(0, parentNod);
      const rightNode = createBSTNode<number>(3, parentNod);

      parentNod.right = rightNode;
      parentNod.left  = leftNode;
      expect(rightNode.isLeftChild()).toEqual(false);
    });
  });
  describe('#swapChild', () => {
    it('sets new child parent to previous child parent', () => {
      const parentNod      = createBSTNode<number>(1);
      const otherParentNod = createBSTNode<number>(1);
      const leftNode       = createBSTNode<number>(0, parentNod);
      const rightNode      = createBSTNode<number>(3, parentNod);
      const newNode        = createBSTNode<number>(4, otherParentNod);
      otherParentNod.right = newNode;

      parentNod.right = rightNode;
      parentNod.left  = leftNode;
      parentNod.swapChild(rightNode, newNode);
      expect(newNode.parent).toEqual(parentNod);
    });
    it('removes the new child from its old parent', () => {
      const parentNod      = createBSTNode<number>(1);
      const otherParentNod = createBSTNode<number>(1);
      const leftNode       = createBSTNode<number>(0, parentNod);
      const rightNode      = createBSTNode<number>(3, parentNod);
      const newNode        = createBSTNode<number>(4, otherParentNod);
      otherParentNod.right = newNode;

      parentNod.right = rightNode;
      parentNod.left  = leftNode;
      parentNod.swapChild(rightNode, newNode);
      expect(otherParentNod.right).toEqual(null);
    });

    it('sets left to new child when currentChild is equal to the left child', () => {
      const parentNod      = createBSTNode<number>(1);
      const otherParentNod = createBSTNode<number>(1);
      const leftNode       = createBSTNode<number>(0, parentNod);
      const rightNode      = createBSTNode<number>(3, parentNod);
      const newNode        = createBSTNode<number>(4, otherParentNod);
      otherParentNod.right = newNode;

      parentNod.right = rightNode;
      parentNod.left  = leftNode;
      parentNod.swapChild(leftNode, newNode);
      expect(parentNod.left).toEqual(newNode);
    });
    it('sets right to new child when currentChild is equal to the right child', () => {
      const parentNod      = createBSTNode<number>(1);
      const otherParentNod = createBSTNode<number>(1);
      const leftNode       = createBSTNode<number>(0, parentNod);
      const rightNode      = createBSTNode<number>(3, parentNod);
      const newNode        = createBSTNode<number>(4, otherParentNod);
      otherParentNod.right = newNode;

      parentNod.right = rightNode;
      parentNod.left  = leftNode;
      parentNod.swapChild(rightNode, newNode);
      expect(parentNod.right).toEqual(newNode);
    });

    it('throws when currentChild is equal to neither right nor left', () => {
      const parentNod      = createBSTNode<number>(1);
      const otherParentNod = createBSTNode<number>(1);
      const leftNode       = createBSTNode<number>(0, parentNod);
      const rightNode      = createBSTNode<number>(3, parentNod);
      const newNode        = createBSTNode<number>(4, otherParentNod);
      otherParentNod.right = newNode;

      parentNod.right = rightNode;
      parentNod.left  = leftNode;
      expect(() => parentNod.swapChild(newNode, newNode)).toThrow('could not find child');
    });

  });

  describe('#item', () => {
    it('throws when item is null', () => {
      const node = createBSTNode<number>(1);
      //@ts-ignore
      node._item = null;
      expect(() => node.item).toThrow('item is null');
    });
    it('returns item when item is not null', () => {
      const node = createBSTNode<number>(1);
      expect(node.item).toEqual(1);
    });
  });

  describe('#valueOf', () => {
    it('returns the valueOf comparable as a number when comparable is supplied', () => {
      const node = createBSTNode<number>(1, null, 2);
      expect(node.valueOf()).toEqual(2);
    });
    it('returns valueOf item when comparable is not supplied', () => {
      const node = createBSTNode<number>(1);
      expect(node.valueOf()).toEqual(1);
    });
  });
  describe('#Symbol.toPrimitive', () => {

  });

  describe('#Symbol.iterator', () => {
    it('yields item', () => {
      const node = createBSTNode<number>(1);
      expect([ ...node ]).toEqual([ 1 ]);
    });
  });
});