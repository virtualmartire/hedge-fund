// Utility to read quota.csv and return JSON array
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function getQuotaData() {
  const filePath = path.join(__dirname, 'quota.csv');
  const data = fs.readFileSync(filePath, 'utf8');
  const [header, ...rows] = data.trim().split('\n');
  const keys = header.split(',');
  return rows.map(row => {
    const values = row.split(',');
    const obj = {};
    keys.forEach((key, i) => {
      obj[key] = isNaN(values[i]) ? values[i] : Number(values[i]);
    });
    return obj;
  });
}
