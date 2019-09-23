import { createBST } from '../';


describe('#BST', () => {
  describe('#init', () => {
    it('creates an empty BST with null root', () => {
      const bst = createBST();
      expect(bst.root).toEqual(null);
    });

    it('creates an empty BST with size 0', () => {
      const bst = createBST();
      expect(bst.size).toStrictEqual(0);
    });
  });


  describe('#insert', () => {
    it('returns a node object wrapping the inserted item', () => {
      const bst  = createBST<number>();
      const node = bst.insert(1);
      expect(node).toMatchObject({
                                   parent : null,
                                   left   : null,
                                   right  : null,
                                 });
    });
    it('sets root to the inserted node when inserting a node into an empty tree', () => {
      const bst  = createBST<number>();
      const node = bst.insert(1);
      expect(bst.root).toStrictEqual(node);
    });

    it('sets roots left child when the inserted value is less than the root', () => {
      const bst       = createBST<number>();
      const node      = bst.insert(10);
      const leftChild = bst.insert(9);
      expect(bst.root!.left).toEqual(leftChild);
      expect(node.left).toEqual(leftChild);
    });

    it('sets root right child when the inserted value is greater than root', () => {
      const bst        = createBST<number>();
      const node       = bst.insert(10);
      const rightChild = bst.insert(11);
      expect(bst.root!.right).toEqual(rightChild);
      expect(node.right).toEqual(rightChild);
    });

    it(
      'adds right grandchild to right child when inserted item is greater than both'
      + ' root & right child', () => {
        const bst         = createBST<number>();
        const root        = bst.insert(10);
        const leftChild0  = bst.insert(9);
        const rightChild0 = bst.insert(11);
        const rightChild1 = bst.insert(12);
        expect(root.left).toEqual(leftChild0);
        expect(root.right).toEqual(rightChild0);
        expect(root.right!.right).toEqual(rightChild1);
      });

    it(
      'adds left grandchild to left child when inserted item is less than both'
      + ' root & left child', () => {
        const bst         = createBST<number>();
        const root        = bst.insert(10);
        const leftChild0  = bst.insert(9);
        const rightChild0 = bst.insert(11);
        const leftChild1  = bst.insert(8);


        expect(root.left).toEqual(leftChild0);
        expect(root.right).toEqual(rightChild0);
        expect(root.left!.left).toEqual(leftChild1);
      });
  });

  describe('#traversal', () => {

    it('traverses in order', () => {
      const values = [ 7, 4, 12, 2, 6, 9, 19, 3, 5, 8, 11, 15, 20 ];
      const result = [ 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 15, 19, 20 ];
      const bst    = createBST<number>();
      values.forEach(d => bst.insert(d));

      expect([ ...bst.traversInOrderFrom() ]).toEqual(result);
    });

    // it('traverses in order with duplicates', () => {
    //   const values = [ 7, 4, 12, 2, 6, 9, 19, 9, 3, 5, 8, 11, 15, 20 ]
    //     .map(d => new Number(d));
    //   const result = [ 2, 3, 4, 5, 6, 7, 8, 9, 9, 11, 12, 15, 19, 20 ]
    //     .map(d => new Number(d));
    //   //eslint-disable-next-line
    //   const bst    = createBST<Number>();
    //   values.forEach(d => bst.insert(d));
    //   expect(bst.traversInOrderFrom()).toEqual(result);
    // });


    it('traverses in pre order', () => {
      const values = [ 7, 4, 12, 2, 6, 9, 19, 3, 5, 8, 11, 15, 20 ];
      const result = [ 7, 4, 2, 3, 6, 5, 12, 9, 8, 11, 19, 15, 20 ];
      const bst    = createBST<number>();
      values.forEach(d => bst.insert(d));
      expect([ ...bst.traversPreOrderFrom() ]).toEqual(result);
    });


    // it('traverses in pre order with duplicates', () => {
    //   const values = [ 7, 4, 12, 2, 6, 9, 19, 9, 3, 5, 8, 11, 15, 20 ]
    //     .map(d => new Number(d));
    //   const result = [ 7, 4, 2, 3, 6, 5, 12, 9, 9, 8, 11, 19, 15, 20 ]
    //     .map(d => new Number(d));
    //   //eslint-disable-next-line
    //   const bst    = createBST<Number>();
    //   values.forEach(d => bst.insert(d));
    //   expect(bst.traversPreOrderFrom()).toEqual(result);
    // });


    it('traverses in post order', () => {
      const values = [ 7, 4, 12, 2, 6, 9, 19, 3, 5, 8, 11, 15, 20 ];
      const result = [ 3, 2, 5, 6, 4, 8, 11, 9, 15, 20, 19, 12, 7 ];
      const bst    = createBST<number>();
      values.forEach(d => bst.insert(d));
      expect([ ...bst.traversPostOrderFrom() ]).toEqual(result);
    });

    // it('traverses in post order with duplicates', () => {
    //   const values = [ 7, 4, 12, 2, 6, 9, 19, 9, 3, 5, 8, 11, 15, 20 ]
    //     .map(d => new Number(d));
    //   const result = [ 3, 2, 5, 6, 4, 8, 11, 9, 9, 15, 20, 19, 12, 7 ]
    //     .map(d => new Number(d));
    //   //eslint-disable-next-line
    //   const bst    = createBST<Number>();
    //   values.forEach(d => bst.insert(d));
    //   expect(bst.traversPostOrderFrom()).toEqual(result);
    // });
  });

  describe('#remove', () => {
    it('removes leaf', () => {

      const values = [ 25, 15, 10, 4, 12, 22, 18, 24, 50, 35, 31, 44, 70, 66, 90 ];
      const bst    = createBST<number>();
      const index  = 4;
      values.map(d => bst.insert(d));
      bst.remove(values[ index ]);
      const check = values.slice(0, index)
                          .concat(values.slice(index + 1));
      expect([ ...bst.traversPreOrderFrom() ]).toEqual(check);
    });
    it('removes child', () => {
      const values = [ 25, 15, 10, 4, 12, 22, 18, 24, 50, 35, 31, 44, 70, 66, 90 ];
      const check  = [ 25, 15, 10, 4, 12, 22, 18, 24, 66, 35, 31, 44, 70, 90 ];
      const bst    = createBST<number>();
      const index  = 8;
      values.map(d => bst.insert(d));
      bst.remove(values[ index ]);
      expect([ ...bst.traversPreOrderFrom() ]).toEqual(check);
    });
    //
    // it('removes child duplicate', () => {
    //   const values = [ 25, 15, 10, 4, 12, 22, 18, 24, 50, 50, 35, 31, 44, 70, 66, 90 ]
    //     .map(d => new Number(d));
    //   //eslint-disable-next-line
    //   const bst    = createBST<Number>();
    //   const index  = 8;
    //   values.map(d => bst.insert(d));
    //   bst.remove(values[ index ]);
    //   const check = values.slice(0, index)
    //                       .concat(values.slice(index + 1));
    //   expect(bst.traversPreOrderFrom()).toEqual(check);
    // });
  });

  describe('#find', () => {
    it('finds node equal to the search value', () => {
      const values = [ 25, 15, 10, 4, 12, 22, 18, 24, 50, 35, 31, 44, 70, 66, 90 ]
        .map(d => new Number(d));

      //eslint-disable-next-line
      const bst   = createBST<Number>();
      const index = 4;
      values.map(d => bst.insert(d));
      const found = bst.find(values[ index ]);
      expect(found.comparable).toEqual(values[ index ]);
    });
  });


  describe('#rotateRight', () => {
    it('traverses in order', () => {
      const values                      = [ 13, 23, 17, 7, 8, 10, 9, 4, 3, 5 ];
      //expections after rotation of node<7>
      const inOrderTraversalExpectation = [ 3, 4, 5, 7, 8, 9, 10, 13, 17, 23 ];
      const bst                         = createBST<number>();
      const nodes                       = values.map(v => bst.insert(v));
      bst.rotateRight(nodes[ 3 ]);
      expect([ ...bst.traversInOrderFrom() ]).toEqual(inOrderTraversalExpectation);

    });
    it('traverses in preOrder', () => {
      const values                       = [ 13, 23, 17, 7, 8, 10, 9, 4, 3, 5 ];
      //expections after rotation of node<7>
      const preOrderTraversalExpectation = [ 13, 4, 3, 7, 5, 8, 10, 9, 23, 17 ];
      const bst                          = createBST<number>();
      const nodes                        = values.map(v => bst.insert(v));

      bst.rotateRight(nodes[ 3 ]);

      expect([ ...bst.traversPreOrderFrom() ]).toEqual(preOrderTraversalExpectation);
    });
    it('traverses in postOrder', () => {
      const values                        = [ 13, 23, 17, 7, 8, 10, 9, 4, 3, 5 ];
      //expections after rotation of node<7>
      const postOrderTraversalExpectation = [ 3, 5, 9, 10, 8, 7, 4, 17, 23, 13 ];
      const bst                           = createBST<number>();
      const nodes                         = values.map(v => bst.insert(v));
      bst.rotateRight(nodes[ 3 ]);
      expect([ ...bst.traversPostOrderFrom() ]).toEqual(postOrderTraversalExpectation);
    });
  });
  describe('#rotateLeft', () => {
    it('traverses inOrder', () => {

      const values                      = [ 13, 23, 17, 4, 3, 7, 5, 8, 10, 9 ];
      //expections after rotation of node<8>
      const inOrderTraversalExpectation = [ 3, 4, 5, 7, 8, 9, 10, 13, 17, 23 ];
      const bst                         = createBST<number>();
      const nodes                       = values.map(v => bst.insert(v));


      bst.rotateLeft(nodes[ 5 ]);


      expect([ ...bst.traversInOrderFrom() ]).toEqual(inOrderTraversalExpectation);
    });
    it('traverses in preOrder', () => {
      const values                       = [ 13, 23, 17, 4, 3, 7, 5, 8, 10, 9 ];
      //expections after rotation of node<8>
      const preOrderTraversalExpectation = [ 13, 4, 3, 8, 7, 5, 10, 9, 23, 17 ];
      const bst                          = createBST<number>();
      const nodes                        = values.map(v => bst.insert(v));

      bst.rotateLeft(nodes[ 5 ]);
      expect([ ...bst.traversPreOrderFrom() ]).toEqual(preOrderTraversalExpectation);
    });
    it('traverses in postOrder', () => {
      const values                        = [ 13, 23, 17, 4, 3, 7, 5, 8, 10, 9 ];
      //expections after rotation of node<8>
      const postOrderTraversalExpectation = [ 3, 5, 7, 9, 10, 8, 4, 17, 23, 13 ];
      const bst                           = createBST<number>();
      const nodes                         = values.map(v => bst.insert(v));

      bst.rotateLeft(nodes[ 5 ]);
      expect([ ...bst.traversPostOrderFrom() ]).toEqual(postOrderTraversalExpectation);
    });
  });
});
