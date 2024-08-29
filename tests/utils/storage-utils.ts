// utils/storage-utils.ts
import * as fs from 'fs';
import * as path from 'path';

// Function to read data from a JSON file
export function readDataFromFile(filename: string): any {
  const filePath = path.resolve(__dirname, `../data/${filename}.json`);
  if (fs.existsSync(filePath)) {
    const rawData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(rawData);
  }
  return null;
}

// Function to write data to a JSON file
export function writeDataToFile(data: any, filename: string): void {
  const filePath = path.resolve(__dirname, `../data/${filename}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}
