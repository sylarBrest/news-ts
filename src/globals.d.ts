declare module '*.css' {}
declare const process: {
    env: {
        NODE_ENV: 'development' | 'production';
        API_KEY: string;
        API_URL: string;
    };
};
