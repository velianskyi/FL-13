function isBigger(a, b) {
    return (a > b);
}

function countPoints(arr) {
    let sum = 0;
    for (let i = 0; i < 10; i++) {
        let x = +arr[i][0];
        let y = +arr[i][2];
        if (x === y) {
            sum++;
        } else {
            sum = isBigger(x, y) ? sum + 3 : sum;
        }
    }
    return sum;
}

console.log(countPoints(['3:1', '1:0', '0:0', '1:2', '4:0', '2:3', '1:1', '0:1', '2:1', '1:0']));