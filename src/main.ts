import { App } from './app';
import { EnvConfig } from './config/variables';

const PORT = EnvConfig.PORT || 3030;

new App().start(PORT);