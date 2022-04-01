import { JSDOM } from 'jsdom';

const { window } = new JSDOM('<!DOCTYPE html><div id="app"></div>', { url: 'http://localhost' });

global.window = window;
global.document = window.document;
