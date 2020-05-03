function isBigger(a, b) {
    return (a > b);
}

function getDifference(a, b) {
    let diff;
    diff = isBigger(a, b) ? a - b : b - a;
    return diff;
}

console.log(getDifference(0, 0));