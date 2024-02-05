'use strict'

const Tree = require('./binary-search-tree');

function getRandomNumbers() {
  const nums = [];
  for (let i = 0; i < 4; i++) {
    nums.push(Math.floor(Math.random() * 100));
  }
  return nums;
}
const randomNumbers = getRandomNumbers();

const numTree = new Tree(randomNumbers);
console.log(`Tree is balanced: ${numTree.isBalanced()}`);
console.log('The Tree')
numTree.prettyPrint();
console.log(randomNumbers)
console.log('Level Order Traversal:');
numTree.levelOrder(console.log);
console.log('Pre Order Traversal:')
numTree.preOrderDFS(console.log);
console.log('Post Order Traversal:')
numTree.postOrderDFS(console.log);
console.log('In Order Traversal:')
numTree.inOrderDFS(console.log);
console.log('Inserting more numbers');
numTree.insert(134);
numTree.insert(434);
console.log('New tree');
numTree.prettyPrint();
console.log(`Tree is balanced: ${numTree.isBalanced()}`);
console.log('Rebalancing Tree');
numTree.rebalance();
console.log(`Tree is balanced: ${numTree.isBalanced()}`);
console.log('New tree');
numTree.prettyPrint();
console.log('Level Order Traversal:');
numTree.levelOrder(console.log);
console.log('Pre Order Traversal:')
numTree.preOrderDFS(console.log);
console.log('Post Order Traversal:')
numTree.postOrderDFS(console.log);
console.log('In Order Traversal:')
numTree.inOrderDFS(console.log);



      
      
      
