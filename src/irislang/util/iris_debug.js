/**
 * IrisUtil
 * created by DaraW in 2016-12-26
 * 
 */

let warn = function () {};
let log = function () {};

if (process.env.NODE_ENV !== 'production') {

  warn = (msg) => {
    if (typeof console !== 'undefined') {
      console.warning(`[Iris warn]: ${msg} `);
    }
  };

  log = (msg) => {
    if (typeof console !== 'undefined') {
      console.log(`[Iris]: ${msg} `);
    }
  };
}

export { warn, log };