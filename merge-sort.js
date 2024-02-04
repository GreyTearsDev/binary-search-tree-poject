"use strict";

function mergeSort(array) {
  if (array.length === 0) return array;
  return sort(array);
}

function sort(array, start = 0, end = array.length - 1) {
  if (start >= end) return [array[start]];
  const mid = Math.floor((start + end) / 2);

  return merge(sort(array, start, mid), sort(array, mid + 1, end));
}

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
