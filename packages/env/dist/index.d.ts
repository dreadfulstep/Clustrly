export type Env = {
    [key: string]: string | undefined;
};
export type LoadedEnvFiles = Array<{
    path: string;
    contents: string;
    env: Env;
}>;
export declare const processEnv: (loadedEnvFiles: LoadedEnvFiles, forceReload?: boolean) => {
    combinedEnv: Env;
    loadedEnvFiles: LoadedEnvFiles;
};
export declare const resetEnv: () => void;
export declare const loadEnvConfig: (mode?: string, forceReload?: boolean) => {
    combinedEnv: Env;
    loadedEnvFiles: LoadedEnvFiles;
};
