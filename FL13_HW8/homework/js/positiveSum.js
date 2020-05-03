function positiveSum(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum = arr[i] > 0 ? sum + arr[i] : sum;
    }
    return sum;
}

console.log(positiveSum([2, 4, 6, 8]));