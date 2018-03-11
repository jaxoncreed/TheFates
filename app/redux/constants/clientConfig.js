import { IS_PRODUCTION } from '../../web/constants/config';

// export const API_BETA_URL = 'http://localhost:4300/api/v1';
export const API_BETA_URL = 'http://52.44.147.233:4301/api/v1';
export const API_PROD_URL = 'https://api.gaugeinsights.com/api/v1';

export const API_HOST = IS_PRODUCTION ? API_PROD_URL : API_BETA_URL;