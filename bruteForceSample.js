//read passwords.txt file
var fs = require('fs');
var path = require('path');
const puppeteer = require('puppeteer');
// const {setTimeout } = require('timers');
// required setTimeout
const { setTimeout } = require('node:timers/promises');

var filePath = path.join(__dirname, 'passwords.txt');
var passwords = fs.readFileSync(filePath, 'utf8');

var passwordArray = passwords.split('\n');


//open website and try to login with each password
// (async () => {
//     const browser = await puppeteer.launch({ headless: false });
//     const page = await browser.newPage();
//     await page.goto('http://127.0.0.1:5500/loginForm.html');

//     for (let i = 0; i < passwordArray.length; i++) {
//         await page.type('#email', 'admin@mail.com');
//         await page.type('#password', passwordArray[i]);
//         await page.click('#loginbutton');
//         // await page.$eval('#loginbutton', el => el.click());
//         // await page.waitForTimeout(1000);
//     }

// })();
