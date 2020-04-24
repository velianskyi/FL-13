let str = prompt('String:');
let middle = '';
let len = str.length;
if (len > 0 && str.search(' ') === -1) {
    middle = len % 2 === 0 ? str[len / 2 - 1] + str[len / 2] : str[~~(len / 2)];
    alert(`Middle: ${middle}`);
} else {
    alert('Invalid value');
}