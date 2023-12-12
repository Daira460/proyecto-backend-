import fs from "fs";

import { fileURLToPath } from "url";
import { dirname } from "path";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

async function readFile(file) {
  try {
    const result = await fs.promises.readFile(__dirname + "/" + file, "utf-8");
    return JSON.parse(result);
  } catch (err) {
    console.error("Error reading file:", err.message);
    throw err;
  }
}

async function writeFile(file, data) {
  try {
    await fs.promises.writeFile(__dirname + "/" + file, JSON.stringify(data));
  } catch (err) {
    console.error("Error writing file:", err.message);
    throw err;
  }
}
