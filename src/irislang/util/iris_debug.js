/**
 * IrisUtil
 * created by DaraW in 2016-12-26
 * 
 */

export const error = (msg) => {
    if (process.env.NODE_ENV !== 'production') {
        console.error('[Iris Error]', msg);
    }
};

export const warn = (msg) => {
    if (process.env.NODE_ENV !== 'production') {
        console.warn('[Iris Warn]', msg);
    }
};

export const log = (msg) => {
    if (process.env.NODE_ENV !== 'production') {
        console.log('[Iris]', msg);
    }
};