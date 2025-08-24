const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '../.env');
const envExamplePath = path.join(__dirname, '../.env.example');

if (!fs.existsSync(envPath)) {
  fs.copyFileSync(envExamplePath, envPath);
  console.log('.env criado a partir do .env.example');
} else {
  console.log('.env já existe, nada foi feito');
}