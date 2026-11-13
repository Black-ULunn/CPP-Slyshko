const N = 12;
const A = new Array(N);
for (let i = 0; i < N; i++) {
    A[i] = Math.floor(Math.random() * 21) - 10;
}
console.log("Початковий масив A:", [...A]);

const toDelete = new Array(N).fill(false);
for (let i = 1; i < N - 1; i++) {
    if (A[i] < A[i - 1] && A[i] < A[i + 1]) {
        toDelete[i] = true;
    }
}


let arrayNew = [];
for (let i = 0; i < N; i++) {
    if (!toDelete[i]) {
        arrayNew.push(A[i]);
    }
}
console.log("Масив після видалення (новий масив):", arrayNew);


let writeIndex = 0;
let originalCopy = [...A];
for (let i = 0; i < N; i++) {
    if (!toDelete[i]) {
        originalCopy[writeIndex] = originalCopy[i];
        writeIndex++;
    }
}
originalCopy.length = writeIndex;
console.log("Масив після ущільнення (на місці):", originalCopy);

// Ітеративний спосіб
function findMinIterative(arr) {
    if (arr.length === 0) return null;
    let min = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < min) {
            min = arr[i];
        }
    }
    return min;
}

// Лінійно-рекурсивний спосіб
function findMinLinearRecursive(arr, index = 0) {
    if (index === arr.length - 1) {
        return arr[index];
    }
    let subMin = findMinLinearRecursive(arr, index + 1);
    return arr[index] < subMin ? arr[index] : subMin;
}

// Рекурсивний спосіб «розділяй і володарюй»
function findMinDivideAndConquer(arr, left, right) {
    if (left === right) {
        return arr[left];
    }
    if (right === left + 1) {
        return arr[left] < arr[right] ? arr[left] : arr[right];
    }
    
    let mid = Math.floor((left + right) / 2);
    let leftMin = findMinDivideAndConquer(arr, left, mid);
    let rightMin = findMinDivideAndConquer(arr, mid + 1, right);
    
    return leftMin < rightMin ? leftMin : rightMin;
}

console.log("Мін (ітеративно):", findMinIterative(A));
console.log("Мін (лінійна рекурсія):", findMinLinearRecursive(A));
console.log("Мін (розділяй і володарюй):", findMinDivideAndConquer(A, 0, A.length - 1));