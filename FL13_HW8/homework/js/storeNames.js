function storeNames() {
    let names = [];
    for (let i = 0; i < arguments.length; i++) {
        names[i] = arguments[i];
    }
    return names;
}

console.log(storeNames('Nick Fury', 'Iron Man', 'Doctor Strange'));