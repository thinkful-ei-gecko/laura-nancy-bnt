// QUESTION 7: Largest node

class binaryST {
  constructor(key = null, value = null, parent = null) {
    this.value = value;
    this.key = key;
    this.parent = parent;
    this.right = null;
    this.left = null;
  }
  insert(key, value) {
    // If tree is empty, insert root node of the tree
    if (this.key === null) {
      this.key = key;
      this.value = value;
    }
    /* If the tree exists, start at root, compare it to the key
      If key is less than the node it goes to the left */
    else if (key < this.key) { 
      /* If no left child (`left` pointer is empty), then instantiate 
      and insert a new node as a left child, passing `this` as the parent */
      if (this.left === null) {
        this.left = new binaryST(key, value, this);
      }
      /* If the node has a left child, recursively call the `insert` 
      method to add it further down the tree */
      else { this.left.insert(key, value) }
    }
    else {
      if (this.right === null) {
        this.right = new binaryST(key, value, this);
      }
      else { this.right.insert(key, value); }
    }
  }

  find(key) { //2
    if (this.key === key) {
      console.log(this.key);
      return this.value;
    }
    else if (key < this.key && this.left) { //else if the key is less than the root and there is a node to the left
      return this.left.find(key);
    }
    else if (key > this.key && this.right) {
      return this.right.find(key);
    }
    else {
      throw new Error('Key Error');
    }
  }

  _findMin() {
    if (!this.left) { return this; }
    return this.left._findMin();
  }

  _replaceWith(node) {
    if (this.parent) {
      if (this === this.parent.left) {
        this.parent.left = node;
      }
      else if (this === this.parent.right) {
        this.parent.right = node;
      }
      if (node) {
        node.parent = this.parent;
      }
    }
    else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      }
      else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  remove(key) {
    if (this.key === key) { //if current is key to delete
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      }
      else if (this.left) { this._replaceWith(this.left);}
      else if (this.right) { this._replaceWith(this.right);}
      else { this._replaceWith(null);}
    }
    else if (key < this.key && this.left) { this.left.remove(key);}
    else if (key > this.key && this.right) { this.right.remove(key);}
    else { throw new Error('Key Error');}
  }
}


function findHeight(t) {
  //base condition
  if (!t) { return 0;}
  else {
    let lheight = findHeight(t.left) //1 null
    let rheight = findHeight(t.right) // 4 
    if (lheight > rheight) {
      console.log('lheight', lheight)
      return (lheight + 1)
    }
    else {
      console.log('rheight', rheight)
      return (rheight + 1)
    }
  }
}

function isBST(t) {
  //base case
  if (t === null) { return true; }
  if (t.left && t.value < t.left.value) {
    return false;
  }
  if (t.right && t.value > t.right.value) {
    return false;
  }
  //general case
  if (!isBST(t.left) || !isBST(t.right)) {
    return false;
  }
  return true;
}

function treeSize(t) {
  if (!t) { return 0;}
  return 1 + treeSize(t.left) + treeSize(t.right);
}

function compareNodeSize(leftNode, rightNode) {
  let node1 = treeSize(leftNode);
  let node2 = treeSize(rightNode);

  console.log(node1);
  console.log(node2);

  if (node1 > node2) { console.log('The left side is bigger'); }
  else if (node1 < node2) { console.log('The right side is bigger'); }
  else {console.log('The two sides are equal size')}
}


function printPretty(BST) {
  if (BST.value === null) { return; } 
  else {
    return {
      node: BST.value,
      left: BST.left ? printPretty(BST.left) : null,
      right: BST.right ? printPretty(BST.right) : null
    };
  }
}

function main() {
  let bst = new binaryST();
  bst.insert(3, 3);
  bst.insert(1, 1);
  bst.insert(4, 4);
  bst.insert(6, 6);
  bst.insert(9, 9);
  bst.insert(2, 2);

  console.log(JSON.stringify(printPretty(bst)));
  console.log(isBST(bst));
  console.log(treeSize(bst.left));
  compareNodeSize(bst.left, bst.right);
  // console.log(findHeight(bst))

  //E A S Y Q U E S T I O N
  // bst.insert('E', 'E')
  // bst.insert('A', 'A')
  // bst.insert('S', 'S')
  // bst.insert('Y', 'Y')
  // bst.insert('Q', 'Q')
  // bst.insert('U', 'U')
  // bst.insert('E', 'E')
  // bst.insert('S', 'S')

}

main();