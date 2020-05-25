function assign() {
    let target = Object(arguments[0]);
    let one = 1;
    for(let i = one; i < arguments.length; i++) {
        let source = Object(arguments[i]);
        Object.getOwnPropertyNames(source).forEach(key => {
            target[key] = source[key];
        });
    }
    return target;
}