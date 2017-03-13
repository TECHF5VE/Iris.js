/**
 * IrisUtil
 * created by DaraW in 2016-12-26
 * 
 */

export const error = (...msgs) => {
    if (process.env.NODE_ENV !== 'production') {
        console.error('[Iris Error]', ...msgs);
    }
};

export const warn = (...msgs) => {
    if (process.env.NODE_ENV !== 'production') {
        console.warn('[Iris Warn]', ...msgs);
    }
};

export const log = (...msgs) => {
    if (process.env.NODE_ENV !== 'production') {
        console.log('[Iris]', ...msgs);
    }
};