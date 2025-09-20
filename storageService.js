import { generateShortcode, isValidCustomShortcode, sanitizeCustomShortcode } from './shortcodeService';
import logger from '../logging/loggingMiddleware';


const KEY = 'shortly_links_v1';


function loadAll() {
return JSON.parse(localStorage.getItem(KEY) || '{}');
}


function saveAll(map) {
localStorage.setItem(KEY, JSON.stringify(map));
}


export function createShortLink({ originalUrl, validityMinutes = 30, custom }) {
const store = loadAll();
let shortcode = custom ? sanitizeCustomShortcode(custom) : generateShortcode();


if (custom && !isValidCustomShortcode(shortcode)) {
logger.logEvent('SHORTEN_VALIDATION_ERROR', { originalUrl, custom });
throw new Error('Invalid custom shortcode');
}


let tries = 0;
while (store[shortcode]) {
if (custom) {
logger.logEvent('SHORTCODE_COLLISION', { shortcode, originalUrl });
throw new Error('Shortcode already exists');
}
shortcode = generateShortcode(6 + Math.min(tries, 4));
tries++;
if (tries > 12) throw new Error('Failed to generate unique shortcode');
}


const now = new Date();
const expires = new Date(now.getTime() + validityMinutes * 60000);
const obj = {
originalUrl,
shortcode,
createdAt: now.toISOString(),
expiresAt: expires.toISOString(),
clicks: 0,
clickData: []
};


store[shortcode] = obj;
saveAll(store);
logger.logEvent('SHORTEN_CREATED', { shortcode, originalUrl, validityMinutes });
return obj;
}


export function getLink(shortcode) {
const store = loadAll();
return store[shortcode] || null;
}


export function recordClick(shortcode, clickMeta) {
const store = loadAll();
const link = store[shortcode];
if (!link) return null;
link.clicks = (link.clicks || 0) + 1;
link.clickData.push(clickMeta);
saveAll(store);
logger.logEvent('SHORTLINK_CLICK', { shortcode, clickMeta });
return link;
}


export function getAllLinks() {
return loadAll();
}