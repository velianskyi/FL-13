let tw = 20;
let fr = 4;
let login = prompt('Enter login:');
if (login === 'User' || login === 'Admin') {
    let password = prompt('Enter password');
    if (login === 'User' && password === 'UserPass' || login === 'Admin' && password === 'RootPass') {
        if (new Date().getHours() < tw) {
            if (login === 'User') {
                alert('Good day, dear User!');
            } else {
                alert('Good day, dear Admin!')
            }
        } else {
            if (login === 'User') {
                alert('Good evening, dear User!');
            } else {
                alert('Good evening, dear Admin!')
            }
        }
    } else if (password === '' || password === null) {
        alert('Canceled.');
    } else {
        alert('Wrong password');
    }
} else if (login === '' || login === null) {
    alert('Canceled.');
} else if (login.length < fr) {
    alert('I don\'t know any users having name length less than 4 symbols')
} else {
    alert('I don\'t know you');
}