/* eslint-disable prettier/prettier */
export {};
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SERVER_PORT: string;
      NODE_ENV: 'production' | 'development' | 'staging';
      INITIAL_lECT_NUMB: string;
      BCRYPT_SALT: string;
    }
  }
}
