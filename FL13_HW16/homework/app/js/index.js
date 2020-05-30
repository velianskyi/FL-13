const baseUrl = 'http://localhost:3000';
const appContainer = document.getElementById('app-container');
const fh = 400;
const two = 2;

appContainer.innerHTML = 
`<h1>Manage User App</h1>
<form id='add_form'>
<input type="text" id="name" placeholder="Name" required>
<input type="text" id="username" placeholder="Username" required>
<button id="add" type="button">Add New User</button>
</form>
<p id='loading' hidden>Loading...</p>
<table id='user_list'></table>`;

async function sendRequest(method, url, del = null, body = null) {
    document.getElementById('loading').hidden = false;
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open(method, url);

        xhr.responseType = 'json';

        if (del) {
            xhr.setRequestHeader('Authorization', 'admin');
        } else {
            xhr.setRequestHeader('Content-Type', 'application/json');
        }

        xhr.onload = () => {
            if (xhr.status >= fh) {
                reject(xhr.response);
            } else {
                resolve(xhr.response);
            }
        }

        xhr.onprogress = function() {
            document.getElementById('loading').hidden = true;
        }

        xhr.onerror = () => {
            reject(xhr.response);
        }

        xhr.send(JSON.stringify(body));
    })
}

function createList(data) {
    let table = document.getElementById('user_list');
    table.innerHTML = '';
    data.forEach(el => {
        let tr = document.createElement('tr');
        tr.innerHTML = `<tr><td id='${el.id}' class='el_id'>${el.id}</td><td class='el_name'>
        <input type="text" disabled value='${el.name}'></td><td class='el_username'>
        <input type="text" disabled value='${el.username}'></td>
        <td><button class='update'>Update</button></td><td><button class='delete'>Delete</button></td></tr>`;
        table.append(tr);
    });
}

document.getElementById('add').addEventListener('click', function() {
    document.getElementById('add').disabled = true;
    let body = {
        name: document.getElementById('name').value,
        username: document.getElementById('username').value
    }
    document.getElementById('name').value = '';
    document.getElementById('username').value = '';
    sendRequest('POST', `${baseUrl}/users`, null, body)
        .catch(err => console.log(err));
    sendRequest('GET', `${baseUrl}/users`)
        .then(data => createList(data))
        .finally(function() { 
            document.getElementById('add').disabled = false
        })
        .catch(err => console.log(err))
});

document.getElementById('user_list').addEventListener('click', event => {
    if (event.target.className === 'delete') {
        event.target.disabled = true;
        let id = event.target.parentNode.parentNode.childNodes[0].getAttribute('id');
        sendRequest('DELETE', `${baseUrl}/users/${id}`, true, null)
            .catch(err => console.log(err));
        sendRequest('GET', `${baseUrl}/users`)
            .then(data => createList(data))
            .catch(err => console.log(err))
    }
    if (event.target.className === 'update') {
        if (event.target.innerText === 'Update') {
            event.target.innerText = 'Save';
            event.target.parentNode.parentNode.childNodes[1].childNodes[1].disabled = false;
            event.target.parentNode.parentNode.childNodes[two].childNodes[1].disabled = false;
        } else {
            event.target.disabled = true;
            event.target.innerText = 'Update';
            event.target.parentNode.parentNode.childNodes[1].childNodes[1].disabled = true;
            event.target.parentNode.parentNode.childNodes[two].childNodes[1].disabled = true;
            let id = event.target.parentNode.parentNode.childNodes[0].getAttribute('id');
            let body = {
                name: event.target.parentNode.parentNode.childNodes[1].childNodes[1].value,
                username: event.target.parentNode.parentNode.childNodes[two].childNodes[1].value
            }
            sendRequest('PUT', `${baseUrl}/users/${id}`, null, body)
                .catch(err => console.log(err));
            sendRequest('GET', `${baseUrl}/users`)
                .then(data => createList(data))
                .catch(err => console.log(err))
        }
    }
});




sendRequest('GET', `${baseUrl}/users`)
    .then(data => createList(data))
    .catch(err => console.log(err));