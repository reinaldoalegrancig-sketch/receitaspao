const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

// Replace main price
const originalPrice = /69,90/g;
const newPrice = '17,90';
content = content.replace(originalPrice, newPrice);

// Replace installment
const originalInstallment = /7,02/g;
const newInstallment = '1,49';
content = content.replace(originalInstallment, newInstallment);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Price updated to 17,90 and installments to 1,49');
