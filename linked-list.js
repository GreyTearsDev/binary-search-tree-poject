"use strict";

/**
 * Class representing a node in a linked list.
 */
class Node {
  /**
   * Create a node.
   * @param {*} value - The value to be stored in the node.
   */
  constructor(value) {
    /**
     * The value stored in the node.
     * @type {*}
     */
    this.value = value;
    /**
     * Pointer to the next node in the list.
     * @type {Node}
     */
    this.next = null;
  }
}

/**
 * Class representing a linked list.
 */
class LinkedList {
  /**
   * Create a linked list.
   */
  constructor() {
    /**
     * Points to the first node in the list.
     * @type {Node}
     */
    this.head = null;

    /**
     * Points to the last node in the list.
     * @type {Node}
     */
    this.tail = null;

    /**
     * Stores the number of nodes in the list.
     * @type {number}
     */
    this.listSize = 0;

    /**
     * Points to the current node being operated on.
     * @type {Node}
     */
    this.currentNode = null;
  }

  /**
   * Appends a new node with the given value to the end of the list.
   * @param {*} value - The value to be stored in the new node.
   */
  append(value) {
    let newNode = new Node(value);

    if (this.listSize === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.currentNode = newNode;
    this.listSize++;
  }

  /**
   * Prepends a new node with the given value to the beginning of the list.
   * @param {*} value - The value to be stored in the new node.
   */
  prepend(value) {
    let newNode = new Node(value);

    if (this.listSize !== 0) {
      newNode.next = this.head;
    } else {
      this.tail = newNode;
    }
    this.head = newNode;
    this.currentNode = newNode;
    this.listSize++;
  }

  /**
   * Returns the number of nodes in the list.
   * @returns {number} The number of nodes in the list.
   */
  size() {
    return this.listSize;
  }

  /**
   * Returns the head node of the linked list.
   * @returns {Node|null} The head node of the linked list, or null if the list is empty.
   */
  head() {
    return this.head;
  }

  /**
   * Returns the tail node of the linked list.
   * @returns {Node|null} The tail node of the linked list, or null if the list is empty.
   */

  tail() {
    return this.tail;
  }

  /**
   * Retrieves the node at the specified index in the linked list.
   * @param {number} index - The index of the node to retrieve.
   * @returns {Node|null} The node at the specified index, or null if the index is out of range.
   */
  at(index) {
    if (index < 0 || index >= this.listSize) return null;

    let currentNode = this.head;

    for (let i = 0; i < index; i++) {
      currentNode = currentNode.next;
    }

    return currentNode;
  }

  /**
   * Removes and returns the last node from the linked list.
   * @returns {boolean} True if a node was successfully removed, false if the list is empty.
   */
  pop() {
    if (this.listSize === 0) return false;

    let currentNode = this.head;

    if (this.listSize === 1) {
      this.head = null;
      this.tail = null;
      this.listSize--;
      return true;
    }

    while (currentNode.next.next !== null) {
      currentNode = currentNode.next;
    }

    currentNode.next = null;
    this.tail = currentNode;
    this.listSize--;
    return true;
  }

  /**
   * Checks if the linked list contains a node with the given value.
   * @param {*} value - The value to search for in the linked list.
   * @returns {boolean} True if a node with the given value is found, false otherwise.
   */
  contains(value) {
    return this.find(value) === null ? false : true;
  }

  /**
   * Finds the index of the first occurrence of the specified value in the linked list.
   * @param {*} value - The value to search for in the linked list.
   * @returns {number|null} The index of the first occurrence of the value, or null if not found.
   */
  find(value) {
    let index = 0;
    let currentNode = this.head;

    while (currentNode !== null) {
      if (currentNode.value === value) return index;

      currentNode = currentNode.next;
      index++;
    }

    return null;
  }

  /**
   * Returns a string representation of the linked list.
   * @returns {string} A string representing the elements of the linked list.
   */
  toString() {
    if (this.listSize === 0) return "";

    let string = "";
    let currentNode = this.head;

    while (currentNode !== null) {
      string = string.concat(currentNode.value);
      if (currentNode.next !== null) {
        string = string.concat(" -> ");
      }
      currentNode = currentNode.next;
    }

    return string;
  }

  /**
   * Inserts a new node with the given value at the specified index in the linked list.
   * @param {*} value - The value to be inserted into the linked list.
   * @param {number} index - The index at which to insert the value.
   * @returns {boolean} True if the value was successfully inserted, false otherwise.
   */
  insertAt(value, index) {
    if (index <= 0) {
      this.prepend(value);
      this.listSize++;
      return true;
    }

    if (index + 1 >= this.listSize) {
      this.append(value);
      this.listSize++;
      return true;
    }

    let newNode = new Node(value);
    let theNodeBefore = this.at(index);
    let theNodeAfter = this.at(index + 1);

    theNodeBefore.next = newNode;
    newNode.next = theNodeAfter;

    this.listSize++;
    return true;
  }

  /**
   * Removes the node at the specified index from the linked list.
   * @param {number} index - The index of the node to remove.
   * @returns {boolean} True if the node was successfully removed, false if the index is out of range.
   */
  removeAt(index) {
    if (index < 0 || index >= this.listSize) return false;
    if (index === 0) {
      this.head = this.head.next;
      this.listSize--;
      return true;
    }

    let targetNode = this.at(index);
    let theNodeBefore = this.at(index - 1);

    if (targetNode === this.tail) {
      theNodeBefore.next = null;
      this.tail = targetNode;
      this.listSize--;
      return true;
    }

    theNodeBefore.next = targetNode.next;
    this.listSize--;
    return true;
  }
}
