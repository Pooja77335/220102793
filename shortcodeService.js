const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';


export function generateShortcode(len = 6) {
const arr = new Uint8Array(len);
window.crypto.getRandomValues(arr);
return Array.from(arr).map(b => ALPHABET[b % ALPHABET.length]).join('');
}


export function sanitizeCustomShortcode(s) {
return s ? s.trim() : '';
}


export function isValidCustomShortcode(s) {
return /^[A-Za-z0-9]{4,12}$/.test(s);
}