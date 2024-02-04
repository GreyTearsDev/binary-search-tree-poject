"use strict";

/**
 * Sorts an array using the merge sort algorithm.
 * @param {Array} array - The array to be sorted.
 * @returns {Array} - The sorted array.
 */

function mergeSort(array) {
  if (array.length === 0) return array;
  return sort(array);
}

/**
 * Recursively divides the array into halves, sorts them, and then merges them.
 * @param {Array} array - The array to be sorted.
 * @param {number} start - The start index of the subarray.
 * @param {number} end - The end index of the subarray.
 * @returns {Array} - The sorted array.
 */
function sort(array, start = 0, end = array.length - 1) {
  if (start >= end) return [array[start]];
  const mid = Math.floor((start + end) / 2);

  return merge(sort(array, start, mid), sort(array, mid + 1, end));
}

/**
 * Merges two sorted arrays into a single sorted array.
 * @param {Array} array1 - The first sorted array.
 * @param {Array} array2 - The second sorted array.
 * @returns {Array} - The merged sorted array.
 */
function merge(array1, array2) {
  let i = 0;
  let j = 0;
  const mergedArray = [];

  while (i < array1.length && j < array2.length) {
    if (array1[i] <= array2[j]) {
      mergedArray.push(array1[i++]);
    } else {
      mergedArray.push(array2[j++]);
    }
  }

  while (i < array1.length) {
    mergedArray.push(array1[i++]);
  }

  while (j < array2.length) {
    mergedArray.push(array2[j++]);
  }

  return mergedArray;
}

module.exports = mergeSort;
