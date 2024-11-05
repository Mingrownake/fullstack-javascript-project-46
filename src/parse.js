import { readFileSync } from 'node:fs';
import { cwd } from 'node:process';
import path from 'node:path';

export const parse = (firstPath, secondPath) => {
  const currentDir = cwd();
  const firstFilePath = path.resolve(currentDir, firstPath);
  const secondFilePath = path.resolve(currentDir, secondPath);
  console.log(JSON.parse(readFileSync(firstFilePath)));
  console.log(JSON.parse(readFileSync(secondFilePath)));
}