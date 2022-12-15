"use strict";
function makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}
// function debounce(func: { apply: (arg0: any, arg1: any[]) => void }, timeout = 300) {
//     let timer:any
//     return (...args: any[]) => {
//         clearTimeout(timer)
//         timer = setTimeout(() => {
//             func.apply(this, args)
//         }, timeout)
//     }
// }
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
module.exports = {
    makeId,
    getRandomInt,
    // debounce,
};
//# sourceMappingURL=util.service.js.map