const data = [
  {
    'folder': true,
    'title': 'Pictures',
    'children': [
      {
        'title': 'logo.png'
      },
      {
        'folder': true,
        'title': 'Vacations',
        'children': [
          {
            'title': 'spain.jpeg'
          }
        ]
      }
    ]
  },
  {
    'folder': true,
    'title': 'Desktop',
    'children': [
      {
        'folder': true,
        'title': 'screenshots',
        'children': null
      }
    ]
  },
  {
    'folder': true,
    'title': 'Downloads',
    'children': [
      {
        'folder': true,
        'title': 'JS',
        'children': null
      },
      {
        'title': 'nvm-setup.exe'
      },
      {
        'title': 'node.exe'
      }
    ]
  },
  {
    'title': 'credentials.txt'
  }
];

const rootNode = document.getElementById('root');

function createTree(container, obj) {
  container.append(createTreeDOM(obj));
  container.append(createMenu());
}

function createMenu() {
  let ul = document.createElement('ul');
  ul.setAttribute('id', 'menu');
  let li1 = document.createElement('li');
  li1.setAttribute('id', 'rename');
  li1.innerHTML = 'Rename';
  ul.append(li1);
  let li2 = document.createElement('li');
  li2.setAttribute('id', 'delete');
  li2.innerHTML = 'Delete item';
  ul.append(li2);
  return ul;
}

function createTreeDOM(obj) {
  if(!obj.length) {
    return; 
  }
  let ul = document.createElement('ul');

  obj.forEach(el => {
    let li = document.createElement('li');
    if(el['folder']) {
      li.innerHTML = `<span class="foldescr"><i class="material-icons folder">folder
      </i><input class="text" value=${el['title']} disabled></span>`;
      if(el['children']) {
        let childUL = createTreeDOM(el['children']);
        childUL.hidden = true;
        li.append(childUL);
      } else {
        
        let ule = document.createElement('ul');
        ule.className = 'emp';
        let lie = document.createElement('li');
        lie.innerHTML = '<span class="empty"><i>Folder is empty</i></span>'
        ule.hidden = true;
        ule.append(lie);
        li.append(ule);
      }
    } else {
      li.innerHTML = `<span class="filedescr"><i class="material-icons file">
      insert_drive_file</i><input class="text" value=${el['title']} disabled></span>`;
    }

    
    
    ul.append(li);
  });
  return ul;
}

rootNode.onclick = function(event) {

  if (event.target.parentNode.className !== 'foldescr' && event.target.className !== 'foldescr') {
    return;
  }
  let childrenContainer = event.target.parentNode.className === 'foldescr' ? 
  event.target.parentNode.parentNode.querySelector('ul') : event.target.parentNode.querySelector('ul');
  let icon = event.target.parentNode.getElementsByClassName('folder');
  icon[0].textContent = childrenContainer.hidden ? 'folder_open' : 'folder';
  childrenContainer.hidden = !childrenContainer.hidden;
}

rootNode.addEventListener('contextmenu', event => {
  event.preventDefault();
  const menu = document.getElementById('menu');
  menu.style.top = `${event.clientY}px`;
  menu.style.left = `${event.clientX}px`;
  menu.style.display = 'block';
  if(event.target.tagName === 'UL' || event.target.id === 'root') {
    menu.style.color = 'gray';
    menu.childNodes[0].removeAttribute('id');
    menu.childNodes[1].removeAttribute('id');
  } else {
    menu.style.color = 'black';
    menu.childNodes[0].setAttribute('id', 'rename');
    menu.childNodes[1].setAttribute('id', 'delete');
    document.addEventListener('click', event => {
      let two = 2;
      if (event.button !== two) {
        menu.style.display = 'none';
      }
      menu.addEventListener('click', event => {
        event.stopPropagation();
      }, false);
    }, false);
    menu.querySelector('#rename').addEventListener('click', () => {
      let ren = event.target;
      ren.disabled = false;
      ren.focus();
      ren.select();
      ren.addEventListener('keydown', function(e) {
        let tt = 13;
        let ts = 27;
        if(e.keyCode === tt || e.keyCode === ts) {
          ren.disabled = true;
          let sel = window.getSelection ? window.getSelection() : document.selection;
          if (sel) {
            if (sel.removeAllRanges) {
              sel.removeAllRanges();
            } else if (sel.empty) {
              sel.empty();
            }
          }
        }
      })
      menu.style.display = 'none';
    }, false);
    menu.querySelector('#delete').addEventListener('click', () => {
      let del = event.target.closest('li');
      del.style.display = 'none';
      let parchild = del.parentNode.childNodes;
      let check = true;
      for(let i = 0; i<parchild.length;i++) {
        if(parchild[i].style.display !== 'none') {
          check = false;
          break;
        } 
      }
      if(check) {
        let ule = document.createElement('ul');
        ule.className = 'emp';
        let lie = document.createElement('li');
        lie.innerHTML = '<span class="empty"><i>Folder is empty</i></span>'
        ule.hidden = false;
        ule.append(lie);
        del.parentNode.append(ule);
        del.parentNode.className = 'emp';
      }
      menu.style.display = 'none';
    }, false);
  }
}, false);



createTree(rootNode, data);