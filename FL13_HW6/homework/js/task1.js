let num = +prompt('Check number:');
let tip = +prompt('Tip:');
let tip_a = 0;
let sum = 0;
let hung = 100;
if (typeof num === 'number' && num >= 0 && typeof tip === 'number' && tip >= 0 && tip <= hung) {
    tip_a = parseInt(num * tip) / hung;
    sum = parseInt((num + tip_a) * hung) / hung;
    alert(`Check number: ${num}\nTip: ${tip}\nTip amount: ${tip_a}\nTotal sum to pay: ${sum}`);
} else {
    alert('Invalid input data');
}