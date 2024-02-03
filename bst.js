"use strict";

const mergeSort = require('./merge-sort')
const binarySearch = require('./bin-search')

class Node {
  constructor(data) {
    this.data = data;
    this.parent = null;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.cleanArray = this.cleanArrayData(array); 
    this.root = this.buildTree(this.cleanArray);
  }

  cleanArrayData(array) {
    return mergeSort(array).filter((number, index, arr) => arr.indexOf(number) === index); 
  }

  buildTree(array, start = 0, end = array.length-1, parentNode = null) {
    if(start > end) return null;
    
    const mid = Math.floor((start + end) / 2);
    const root = new Node(array[mid]);
    root.parent = parentNode;
    root.left = this.buildTree(array, start, mid-1, root);
    root.right = this.buildTree(array, mid+1, end, root);

    return root;
  }

  insert(value, root = this.root) {
    if (!root) return this.root = new Node(value);

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

  inOrderTreeWalk(root = this.root) {
    if (root !== null) {
      this.inOrderTreeWalk(root.left);
      console.log(root.data);
      this.inOrderTreeWalk(root.right);
    }
  }
 
}

/*==============TESTS==============*/
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) return;
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '|  ' : '   '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '   ' : '|   '}`, true);
  }
}

const test = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(test.root);
test.insert(12);
prettyPrint(test.root);
test.inOrderTreeWalk();
