"use strict";

const LinkedList = require("./linked-list");

/**
 * Represents a Queue data structure implemented using a linked list.
 */
class Queue {
  /**
   * Create a Queue.
   */
  constructor() {
    /**
     * The linked list representing the queue.
     * @type {LinkedList}
     */
    this.queue = new LinkedList();
  }

  /**
   * Enqueues a new element into the queue.
   * @param {*} data - The data to enqueue.
   * @returns {boolean} - True if the data was successfully enqueued.
   */
  enqueue(data) {
    this.queue.prepend(data);
    return true;
  }

  /**
   * Dequeues an element from the front of the queue.
   * @returns {*} - The dequeued data, or false if the queue is empty.
   */
  dequeue() {
    if (!this.isEmpty()) return this.queue.pop();
    return false;
  }

  /**
   * Retrieves the element at the front of the queue without removing it.
   * @returns {*} - The data at the front of the queue, or null if the queue is empty.
   */
  peek() {
    return this.queue.tail();
  }

  /**
   * Checks if the queue is empty.
   * @returns {boolean} - True if the queue is empty, false otherwise.
   */
  isEmpty() {
    return this.queue.size() === 0;
  }

  /**
   * Prints the elements of the queue.
   */
  printQueue() {
    this.queue.toString();
  }
}

module.exports = Queue;
