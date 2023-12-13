import fs from 'fs/promises';

async function readFile(path) {
  try {
    const data = await fs.readFile(path, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading file:', error.message);
    throw error;
  }
}

async function writeFile(path, data) {
  try {
    await fs.writeFile(path, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing file:', error.message);
    throw error;
  }
}

export { readFile, writeFile };

