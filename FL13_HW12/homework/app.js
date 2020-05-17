const root = document.getElementById('root');

function createPage() {
    root.append(createLeft());
    createList();
    root.append(createRight());
}

function createLeft() {
    let left = document.createElement('div');
    left.setAttribute('id', 'left');
    left.innerHTML = `<h2>Books:</h2><table id='bk_list'></table><button id="bk_add">Add the book</button>`
    return left;
}

function createList() {
    let table = document.getElementById('bk_list');
    JSON.parse(localStorage.getItem('books')).forEach(el => {
        let tr = document.createElement('tr');
        tr.innerHTML = `<tr><td><span id='${el.id}' class='bk_name'>${el.name}</span></td><td>
        <button class='bk_edit'>Edit</button></td></tr>`;
        table.append(tr);
    });
}

function createRight() {
    let right = document.createElement('div');
    right.setAttribute('id', 'right');
    let preview = document.createElement('div');
    preview.setAttribute('id', 'preview');
    right.append(preview);
    let form = document.createElement('div')
    form.setAttribute('id', 'edit');
    form.innerHTML = `<h2>Edit the book:</h2><form id='edit_form'><p>
    <label for="book_name">Title</label>
    <input type="text" id="ebook_name" name="book_name" value="" required>
  </p>
  <p>
    <label for="book_plot">Plot</label>
    <input type="text" id="ebook_plot" name="book_plot" value="" required>
  </p>
  <p>
    <label for="book_author">Author</label>
    <input type="text" id="ebook_author" name="book_author" value="" required>
  </p>
  <p>
    <label for="book_url">Book Cover</label>
    <input type="text" id="ebook_url" name="book_url" value="" required>
  </p>
  <p>
    <button id="save_book" type="button" name="save_book">Save</button>
    <button id="cancel_book" type="button" name="cancel_book">Cancel</button>
  </p></form>`;
    right.append(form);
    right.append(renderAdd());
    return right;
}

function renderPreview(id) {
    document.getElementById('preview').innerHTML = `<h2>Preview:</h2><div id='nai'><span>
    <h3>${JSON.parse(localStorage.getItem('books'))[id].name}</h3>
    <p id='bk_plot'>${JSON.parse(localStorage.getItem('books'))[id].plot}</p>
    <p id='bk_author'>${JSON.parse(localStorage.getItem('books'))[id].author}</p></span>
    <img id='bk_img' src=${JSON.parse(localStorage.getItem('books'))[id].url} alt="book cover"></div>`;
}

function renderEdit(id) {
  document.getElementById('ebook_name').value = JSON.parse(localStorage.getItem('books'))[id].name;
  document.getElementById('ebook_plot').value = JSON.parse(localStorage.getItem('books'))[id].plot;
  document.getElementById('ebook_author').value = JSON.parse(localStorage.getItem('books'))[id].author;
  document.getElementById('ebook_url').value = JSON.parse(localStorage.getItem('books'))[id].url;
}

function renderAdd() {
    let form = document.createElement('div')
    form.setAttribute('id', 'add');
    form.innerHTML = `<h2>Add the book:</h2><form id='add_form'><p>
    <label for="book_name">Title</label>
    <input type="text" id="abook_name" name="book_name" placeholder="Enter the title" value="" required>
  </p>
  <p>
    <label for="book_plot">Plot</label>
    <input type="text" id="abook_plot" name="book_plot" placeholder="Enter the plot" value="" required>
  </p>
  <p>
    <label for="book_author">Author</label>
    <input type="text" id="abook_author" name="book_author" placeholder="Enter the author" value="" required>
  </p>
  <p>
    <label for="book_url">Book Cover</label>
    <input type="text" id="abook_url" name="book_url" placeholder="Enter the URL" value="" required>
  </p>
  <p>
    <button id="add_book" type="button" name="save_book">Add</button>
    <button id="cancel_book" type="button" name="cancel_book">Cancel</button>
  </p></form>`;
    return form;
}

function showPreview() {
    document.getElementById('preview').hidden = false;
    document.getElementById('edit').hidden = true;
    document.getElementById('add').hidden = true;
}

function showEdit() {
    document.getElementById('preview').hidden = true;
    document.getElementById('edit').hidden = false;
    document.getElementById('add').hidden = true;
}

function showAdd() {
    document.getElementById('preview').hidden = true;
    document.getElementById('edit').hidden = true;
    document.getElementById('add').hidden = false;
}

function hideAll() {
    document.getElementById('preview').hidden = true;
    document.getElementById('edit').hidden = true;
    document.getElementById('add').hidden = true;
}

function validURL(url) {
    let s = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g;
    let res = url.match(s);
    return res !== null;

}

createPage();

document.getElementById('bk_list').addEventListener('click', event => {
    let id;
    if (event.target.className === 'bk_name') {
        id = event.target.getAttribute('id');
        history.pushState(null, document.title, location.pathname + `?id=${id}` + '#preview');
        showPreview();
        renderPreview(id);
    }
    if (event.target.className === 'bk_edit') {
        id = event.target.parentNode.parentNode.firstChild.childNodes[0].getAttribute('id');
        history.pushState(null, document.title, location.pathname + `?id=${id}` + '#edit');
        showEdit();
        renderEdit(id);
    }
});

document.addEventListener('DOMContentLoaded', function(){
    if(location.hash === '#preview') {
        let fr = 4;
        let id = Number(location.search.slice(fr));
        showPreview();
        renderPreview(id);
    } else if(location.hash === '#edit') {
        let fr = 4;
        let id = Number(location.search.slice(fr));
        showEdit();
        renderEdit(id);
    } else if(location.hash === '#add') {
        showAdd();
    } else {
        if(location.href !== location.origin + location.pathname) {
            location.href = location.origin + location.pathname;
        }
        hideAll();
    }
});

window.addEventListener('popstate', function() {
    if(location.hash === '#preview') {
        let fr = 4;
        let id = Number(location.search.slice(fr));
        showPreview();
        renderPreview(id);
    } else if(location.hash === '#edit') {
        let fr = 4;
        let id = Number(location.search.slice(fr));
        showEdit();
        renderEdit(id);
    } else if(location.hash === '#add') {
        showAdd();
    } else {
        if(location.href !== location.origin + location.pathname) {
            location.href = location.origin + location.pathname;
        }
        hideAll();
    }
});

document.getElementById('bk_add').addEventListener('click', function() {
    history.pushState(null, document.title, location.pathname + '#add');
    showAdd();
    document.getElementById('abook_name').value = '';
    document.getElementById('abook_author').value = '';
    document.getElementById('abook_url').value = '';
    document.getElementById('abook_plot').value = '';
});

document.getElementById('save_book').addEventListener('click', function() {
    let name = document.getElementById('ebook_name').value;
    let author = document.getElementById('ebook_author').value;
    let url = document.getElementById('ebook_url').value;
    let plot = document.getElementById('ebook_plot').value;
    if(name.length && author.length && url.length && validURL(url) && plot.length) {
        let fr = 4;
        let id = Number(location.search.slice(fr));
        let books = JSON.parse(localStorage.getItem('books'));
        books[id].name = name;
        books[id].plot = plot;
        books[id].author = author;
        books[id].url = url;
        localStorage.setItem('books', JSON.stringify(books));
        document.getElementById('bk_list').innerHTML = '';
        createList();
        history.pushState(null, document.title, location.pathname + `?id=${id}` + '#preview');
        showPreview();
        renderPreview(id);
        let th = 300;
        setTimeout(alert('Книга успішно оновлена'), th);
    } else {
        alert('Invalid input data')
    }
});

document.getElementById('add_book').addEventListener('click', function() {
    let name = document.getElementById('abook_name').value;
    let author = document.getElementById('abook_author').value;
    let url = document.getElementById('abook_url').value;
    let plot = document.getElementById('abook_plot').value;
    if(name.length && author.length && url.length && validURL(url) && plot.length) {
        let books = JSON.parse(localStorage.getItem('books'));
        let book = {
            id: books.length,
            name: name,
            author: author,
            url: url,
            plot: plot
        };
        books.push(book);   
        localStorage.setItem('books', JSON.stringify(books))
        document.getElementById('bk_list').innerHTML = '';
        createList();
        document.getElementById('abook_name').value = '';
        document.getElementById('abook_author').value = '';
        document.getElementById('abook_url').value = '';
        document.getElementById('abook_plot').value = '';
        history.pushState(null, document.title, location.pathname + `?id=${book.id}` + '#preview');
        showPreview();
        renderPreview(book.id);
    } else {
        alert('Invalid input data')
    }
});

document.getElementsByName('cancel_book').forEach(el => {
    el.addEventListener('click', function() {
        let result = confirm('Скасувати зміни?');
        if(result) {
            history.back();
        }
    });
});
