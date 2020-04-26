let str = prompt('String:');
let middle = '';
let len = str.length;
let two = 2;
if (len > 0 && str.trim().length > 0) {
    middle = len % two === 0 ? str[len / two - 1] + str[len / two] : str[~~(len / two)];
    alert(`Middle: "${middle}"`);
} else {
    alert('Invalid value');
}