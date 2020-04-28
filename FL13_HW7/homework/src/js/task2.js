let play = confirm('Do you want to play a game?');
if (play) {
    let prize = 0;
    let n = 1;
    while (n !== 0) {
        let f = 5;
        let rand = f * n + 1;
        let num = Math.floor(Math.random() * rand);
        console.log(num);
        let t = 3;
        for (let i = 0; i < t; i++) {
            let go = 1;
            let tw = 2;
            let fif = 50;
            let popr = fif * Math.pow(tw, n - i);
            let answer = +prompt(`Choose a roulette pocket number from 0 to ${f*n}\nAttempts left: ${t-i}
Total prize: ${prize}$\nPossible prize on current attempt: ${popr}$`);
            if (answer === num) {
                prize = prize + popr;
                go = confirm(`Congratulation, you won!\nYour prize is: ${prize}$.\nDo you want to continue?`);
                if (go) {
                    n++;
                    break;
                } else {
                    n = 0;
                }
            }
            if (i === tw && answer !== num || !go) {
                alert(`Thank you for your participation.\nYour prize is: ${prize}$`)
                go = confirm(`Do you want to play again?`);
                if (go) {
                    n = 1;
                    prize = 0;
                } else {
                    n = 0;
                }
                break;
            }
        }
    }
} else {
    alert('You did not become a billionaire, but can.');
}