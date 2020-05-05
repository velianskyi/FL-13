let ten = 10;

function convert() {
    let arr = [];
    for (let i = 0; i < arguments.length; i++) {
        arr.push(typeof arguments[i] === 'string' ? Number(arguments[i]) : String(arguments[i]));
    }
    return arr;
}

function executeforEach(arr, func) {
    for (let i = 0; i < arr.length; i++) {
        arr[i] = func(arr[i]);
    }
}

function mapArray(arr, func) {
    let narr = [];
    for (let i = 0; i < arr.length; i++) {
        narr[i] = +arr[i];
    }
    executeforEach(narr, func);
    return narr;
}

function filterArray(arr, func) {
    let narr = [];
    let tf = [];
    for (let i = 0; i < arr.length; i++) {
        tf[i] = arr[i];
    }
    executeforEach(tf, func);
    for (let i = 0; i < arr.length; i++) {
        if (tf[i]) {
            narr.push(arr[i]);
        }
    }
    return narr;
}

function containsValue(arr, num) {
    let res = false;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === num) {
            res = true;
            break;
        }
    }
    return res;
}

function flipOver(str) {
    let nstr = '';
    for (let i = str.length - 1; i >= 0; i--) {
        nstr += str[i];
    }
    return nstr;
}

function makeListFromRange(arr) {
    let narr = [];
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] <= arr[i + 1]) {
            for (let j = arr[i]; j <= arr[i + 1]; j++) {
                narr.push(j);
            }
        } else if (arr[i] >= arr[i + 1]) {
            for (let j = arr[i]; j >= arr[i + 1]; j--) {
                narr.push(j);
            }
        }
    }
    return narr;
}

function getArrayOfKeys(arr, key) {
    let narr = [];
    for (let i = 0; i < arr.length; i++) {
        narr[i] = arr[i][key];
    }
    return narr;
}

function substitute(arr) {
    let narr = [];
    for (let i = 0; i < arr.length; i++) {
        let dw = 20;
        if (arr[i] > ten && arr[i] < dw) {
            narr[i] = '*';
        } else {
            narr[i] = arr[i];
        }
    }
    return narr;
}

function getPastDay(date, num) {
    let ndate = new Date(date);
    ndate.setDate(ndate.getDate() - num);
    return ndate.getDate();
}

function formatDate(date = new Date()) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1 < ten ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    let day = date.getDate() < ten ? '0' + date.getDate() : date.getDate();
    let hours = date.getHours() < ten ? '0' + date.getHours() : date.getHours();
    let minutes = date.getMinutes() < ten ? '0' + date.getMinutes() : date.getMinutes();
    let sndate = `${year}/${month}/${day} ${hours}:${minutes}`;
    return sndate;
}