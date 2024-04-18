import app from '~/app';
import { loadEnv } from './lib/env';

loadEnv();

app.start();
