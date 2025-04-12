import * as dotenv from 'dotenv';
import * as path from 'path';
import { expand as dotenvExpand } from 'dotenv-expand';

export const loadEnvConfig = (mode = 'local') => {
  const baseEnvPath = path.resolve(process.cwd(), `.env`);
  const modeEnvPath = path.resolve(process.cwd(), `.env.${mode}`);
  const dotenvFiles = [baseEnvPath, modeEnvPath];

  dotenvFiles.forEach((filePath) => {
      try {
          const result = dotenv.config({ path: filePath });
          dotenvExpand(result);
      } catch (err) {
          console.error(`Failed to load ${filePath}:`, err);
      }
  });
};