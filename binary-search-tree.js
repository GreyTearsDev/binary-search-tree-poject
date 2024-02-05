"use strict";

const mergeSort = require("./merge-sort");
const Queue = require("./queue");
/**
 * Represents a node in a binary tree.
 */
class Node {
  /**
   * Create a Node.
   * @param {*} data - The data to be stored in the node.
   */
  constructor(data) {
    this.data = data;
    this.parent = null;
    this.left = null;
    this.right = null;
  }
}

/**
 * Represents a binary search tree.
 */
class Tree {
  /**
   * Create a Tree.
   * @param {Array} array - The array of values to initialize the tree.
   */
  constructor(array) {
    // Clean the array and build the tree
    this.cleanArray = this.cleanArrayData(array);
    this.root = this.buildTree(this.cleanArray);
  }

  /**
   * Cleans duplicate values from the array and sorts it.
   * @param {Array} array - The array to be cleaned.
   * @returns {Array} - The cleaned and sorted array.
   */
  cleanArrayData(array) {
    return mergeSort(array).filter(
      (number, index, arr) => arr.indexOf(number) === index
    );
  }

  /**
   * Builds a binary search tree from a sorted array.
   * @param {Array} array - The sorted array.
   * @param {number} start - The start index of the subarray.
   * @param {number} end - The end index of the subarray.
   * @param {Node} parentNode - The parent node.
   * @returns {Node} - The root node of the constructed tree.
   */
  buildTree(array, start = 0, end = array.length - 1, parentNode = null) {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);
    const root = new Node(array[mid]);
    root.parent = parentNode;
    root.left = this.buildTree(array, start, mid - 1, root);
    root.right = this.buildTree(array, mid + 1, end, root);

    return root;
  }

  /**
   * Inserts a value into the binary search tree.
   * @param {*} value - The value to be inserted.
   * @param {Node} root - The root node of the subtree to insert into.
   */
  insert(value, root = this.root) {
    // root is null
    if (!root) return (this.root = new Node(value));

    if (value < root.data) {
      if (!root.left) {
        const newNode = new Node(value);
        root.left = newNode;
        newNode.parent = root;
        return;
      }
      this.insert(value, root.left);
    } else if (value > root.data) {
      if (!root.right) {
        const newNode = new Node(value);
        root.right = newNode;
        newNode.parent = root;
        return;
      }
      this.insert(value, root.right);
    }
  }

  /**
   * Deletes a node from the binary search tree.
   * @param {*} value - The value to be deleted.
   */
  delete(value) {
    const node = this.find(value);

    if (!node) return null; // node not found

    const parent = node.parent;

    // Node is a leaf
    if (!node.left && !node.right) {
      if (!parent) {
        this.root = null;
        return;
      }
      if (parent.left === node) parent.left = null;
      if (parent.right === node) parent.right = null;
      return;
    }

    // Node has at least one child
    if (!node.left || !node.right) {
      const child = node.left || node.right;
      if (!parent) {
        this.root = child;
      } else if (parent.left === node) {
        parent.left = child;
      } else {
        parent.right = child;
      }
      child.parent = parent;
      return;
    }

    // node has both cildren
    const successor = this.findMinNth(node.right);
    const successorParent = successor.parent;

    if (successorParent) {
      if (successorParent.left === successor) {
        successorParent.left = successor.right;
      } else {
        successorParent.right = successor.right;
      }
    }

    if (!parent) {
      this.root = successor;
    } else if (parent.left === node) {
      parent.left = successor;
    } else {
      parent.right = successor;
    }

    successor.parent = node.parent;
    successor.left = node.left;
    successor.right = node.right;

    if (node.left) node.left.parent = successor;
    if (node.right) node.right.parent = successor;
  }

  /**
   * Finds the maximum value node in a subtree.
   * @param {Node} root - The root node of the subtree.
   * @returns {Node} - The node containing the maximum value.
   */
  findMaxNth(root) {
    if (!root.right) return root;
    return this.findMaxNth(root.right);
  }

  /**
   * Finds the minimum value node in a subtree.
   * @param {Node} root - The root node of the subtree.
   * @returns {Node} - The node containing the minimum value.
   */
  findMinNth(root) {
    if (!root.left) return root;
    return this.findMinNth(root.left);
  }

  /**
   * Finds a node with a given value in the tree.
   * @param {*} value - The value to search for.
   * @param {Node} root - The root node of the subtree.
   * @returns {Node} - The node with the given value, or null if not found.
   */
  find(value, root = this.root) {
    if (!root) return null;

    if (root.data === value) return root;
    if (value < root.data) return this.find(value, root.left);
    if (value > root.data) return this.find(value, root.right);
  }

 /**
 * Performs level order traversal of a binary tree.
 * @param {function} [cb=null] - The callback function to apply to each node's value.
 * @param {Node} [root=this.root] - The root node of the binary tree.
 * @param {Queue} [queue=new Queue()] - The queue storing nodes to be processed.
 * @param {Array} [nodesValues=[]] - An array to store the values of nodes visited in level order.
 * @returns {Array} An array containing the values of the nodes visited in level order.
 */
  levelOrder(cb = null) {
    if (!this.root) return;
    
    const nodesValues = []
    const queue = new Queue();
    queue.enqueue(this.root);
    let currentNode;
    
    while (!queue.isEmpty()) {
      currentNode = queue.dequeue().value;
      nodesValues.push(currentNode.data);

      if (currentNode.left) queue.enqueue(currentNode.left);
      if (currentNode.right) queue.enqueue(currentNode.right);
    }
    
    if (!cb) return nodesValues;
    nodesValues.map((value) => cb(value));
  }

  /**
   * Performs a pre-order depth-first traversal of the binary tree, invoking the callback on each node.
   * @param {function} [cb=null] - Optional callback function to be invoked on each node.
   * @param {Node} [root=this.root] - The root node of the binary tree.
   * @param {Array} [nodesValues=[]] - Array to store the values of the nodes traversed.
   * @returns {Array} - Array of node values if no callback is provided, otherwise an array of values returned by the callback.
   */
  preOrderDFS(cb = null, root = this.root, nodesValues = []) {
    if (!root) return [];

    nodesValues.push(root.data);
    this.preOrderDFS(cb, root.left, nodesValues);
    this.preOrderDFS(cb, root.right, nodesValues);

    if (!cb) return nodesValues;
    return nodesValues.map((value) => cb(value));
  }

  /**
   * Performs an in-order depth-first traversal of the binary tree, invoking the callback on each node.
   * @param {function} [cb=null] - Optional callback function to be invoked on each node.
   * @param {Node} [root=this.root] - The root node of the binary tree.
   * @param {Array} [nodesValues=[]] - Array to store the values of the nodes traversed.
   * @returns {Array} - Array of node values if no callback is provided, otherwise an array of values returned by the callback.
   */
  inOrderDFS(cb = null, root = this.root, nodesValues = []) {
    if (!root) return [];

    this.inOrderDFS(cb, root.left, nodesValues);
    nodesValues.push(root.data);
    this.inOrderDFS(cb, root.right, nodesValues);

    if (!cb) return nodesValues;

    return nodesValues.map((value) => cb(value));
  }

  /**
   * Performs a post-order depth-first traversal of the binary tree, invoking the callback on each node.
   * @param {function} cb - Callback function to be invoked on each node.
   * @param {Node} [root=this.root] - The root node of the binary tree.
   * @param {Array} [nodesValues=[]] - Array to store the values of the nodes traversed.
   * @returns {Array} - Array of node values if no callback is provided, otherwise an array of values returned by the callback.
   */
  postOrderDFS(cb, root = this.root, nodesValues = []) {
    if (!root) return [];

    this.postOrderDFS(cb, root.left, nodesValues);
    this.postOrderDFS(cb, root.right, nodesValues);
    nodesValues.push(root.data);

    if (!cb) return nodesValues;
    return nodesValues.map((value) => cb(value));
  }

  /**
   * Finds the height of the tree rooted at the given node.
   * @param {Node} root - The root node of the tree.
   * @returns {number} - The height of the tree.
   */
  height(root) {
    if (!root) return -1;
    return Math.max(this.height(root.left), this.height(root.right)) + 1;
  }

  /**
   * Calculates the depth of a node in the binary tree.
   * @param {Node} root - The current node whose depth is being calculated.
   * @param {number} [depthCount=0] - The depth count of the current node (default is 0).
   * @returns {number} The depth of the node.
   */
  depth(root, depthCount = 0) {
    if (root === this.root || !root) return depthCount;
    return this.depth(root.parent, depthCount + 1);
  }

  /**
   * Checks if the binary tree is balanced.
   * @returns {boolean} Returns true if the tree is balanced, otherwise returns false.
   */
  isBalanced() {
    /**
     * Helper function to check the balance of a subtree rooted at the given node.
     * @param {Node} [root=this.root] - The root node of the subtree to check balance for.
     * @returns {number} Returns -1 if the tree is unbalanced, otherwise returns the height of the tree.
     */
    const checkBalance = (root = this.root) => {
      if (!root) return 0;

      const leftHeight = checkBalance(root.left);
      if (leftHeight === -1) return -1;
      const rightHeight = checkBalance(root.right);
      if (rightHeight === -1) return -1;

      if (Math.abs(leftHeight - rightHeight) <= 1) {
        return Math.max(leftHeight, rightHeight) + 1;
      } else {
        return -1;
      }
    };
    return checkBalance() !== -1;
  }

  /**
   * Rebalances the AVL tree if it is not balanced.
   * This method checks if the tree is balanced using the isBalanced method,
   * and if not, it rebuilds the tree by performing an in-order depth-first traversal
   * to get the sorted array of node values and then reconstructing the tree from that sorted array.
   */
  rebalance() {
    if (this.isBalanced()) return;
    const sortedArray = this.inOrderDFS();
    this.root = this.buildTree(sortedArray);
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) return;
    if (node.right !== null) {
      this.prettyPrint(node.right, `${prefix}${isLeft ? "|  " : "   "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "   " : "|   "}`, true);
    }
  }
}

module.exports = Tree;
