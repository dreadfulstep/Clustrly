import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { expand as dotenvExpand } from 'dotenv-expand';
let cachedEnvFiles = [];
let initialEnv = undefined;
const loadEnv = (mode = 'local') => {
    const baseEnvPath = path.resolve(process.cwd(), `.env`);
    const modeEnvPath = path.resolve(process.cwd(), `.env.${mode}`);
    const dotenvFiles = [baseEnvPath, modeEnvPath];
    const loadedEnvFiles = [];
    dotenvFiles.forEach((filePath) => {
        try {
            const stats = fs.statSync(filePath);
            if (stats.isFile()) {
                const content = fs.readFileSync(filePath, 'utf8');
                loadedEnvFiles.push({
                    path: filePath,
                    contents: content,
                    env: dotenvExpand(dotenv.parse(content)).parsed || {},
                });
            }
        }
        catch (err) {
            if (err.code !== 'ENOENT') {
                console.error(`Error loading env file at ${filePath}`, err);
            }
        }
    });
    return loadedEnvFiles;
};
export const processEnv = (loadedEnvFiles, forceReload = false) => {
    if (!initialEnv) {
        initialEnv = { ...process.env };
    }
    if (cachedEnvFiles.length > 0 && !forceReload) {
        return { combinedEnv: { ...process.env }, loadedEnvFiles: cachedEnvFiles };
    }
    cachedEnvFiles = loadedEnvFiles;
    let combinedEnv = { ...initialEnv };
    loadedEnvFiles.forEach((envFile) => {
        Object.entries(envFile.env).forEach(([key, value]) => {
            if (value !== undefined) {
                combinedEnv[key] = value;
            }
        });
    });
    Object.assign(process.env, combinedEnv);
    return { combinedEnv, loadedEnvFiles };
};
export const resetEnv = () => {
    if (initialEnv) {
        Object.assign(process.env, initialEnv);
    }
};
export const loadEnvConfig = (mode = 'local', forceReload = false) => {
    const loadedEnvFiles = loadEnv(mode);
    return processEnv(loadedEnvFiles, forceReload);
};
