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

  BFS(cb, queue, array = []) {
    if (queue.isEmpty()) return array;
      const node = queue.dequeue();

      if (node.left) queue.enqueue(node.left);
      if (node.right) queue.enqueue(node.right);

     if (!cb) {    
      array.push(node);
      this.BFS(null, queue, array)
     } else {
      array.push(cb(node));
      this.BFS(null, queue, array)
    } 
    
  }
  
  levelOrderIterative(cb = null) {
    const root = this.root;

    if (!root) return;
    const nodesValues = [];
    const queue = new Queue();
    queue.enqueue(root);

    while(!queue.isEmpty()) {
      const currentNode = queue.dequeue();
      nodesValues.push(currentNode.data);      
      
      if (currentNode.left) queue.enqueue(currentNode.left);
      if (currentNode.right) queue.enqueue(currentNode.right);
    }

    if (!cb) return nodesValues;
    return nodesValues.map((value) => cb(value));
  }
  
  levelOrderRecursive(cb = null, root = this.root, queue = new Queue(), nodesValues = [] ) {
    if (queue.isEmpty()) {
      if (!cb) return nodesValues;
      return nodesValues.map((value) => cb(value));
    }
    
    if (root) {
      queue.enqueue(root);
    }
    
    const currentNode = queue.dequeue();
    nodesValues.push(currentNode.data);      
    
    if (currentNode.left) queue.enqueue(currentNode.left);
    if (currentNode.right) queue.enqueue(currentNode.right);
    
    return this.levelOrderRecursive(cb, queue.peek(), queue, nodesValues);
  }
}

/*==============TESTS==============*/
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) return;
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "|  " : "   "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "   " : "|   "}`, true);
  }
};

const test = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(test.root);
test.insert(12);
prettyPrint(test.root);
test.delete(4);
prettyPrint(test.root);
test.delete(8);
prettyPrint(test.root);
