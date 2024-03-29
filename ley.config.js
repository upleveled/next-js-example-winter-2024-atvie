import postgres from 'postgres';
import { setEnvironmentVariables } from './util/config.js';

setEnvironmentVariables();

const options = {
  ssl: Boolean(process.env.POSTGRES_URL),
  transform: postgres.camel,
};

export default options;
