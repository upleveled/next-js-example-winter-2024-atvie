import dotenvSafe from 'dotenv-safe';

export function setEnvironmentVariables() {
  dotenvSafe.config();
}
