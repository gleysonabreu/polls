declare namespace NodeJS {
  export interface ProcessEnv {
    JWT_SECRET: string;
    PORT: number;
    ALLOWED_ORIGIN_CORS: string;
  }
}
