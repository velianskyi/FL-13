function letterCount(str, ch) {
    let sum = 0;
    let nstr = str.toLowerCase();
    let nch = ch.toLowerCase();
    for (let i = 0; i < str.length; i++) {
        let ind = nstr.indexOf(nch);
        if (ind !== -1) {
            nstr = nstr.replace(nch, '');
            sum++;
        }
    }
    return sum;
}

console.log(letterCount("Maggy", "g"));