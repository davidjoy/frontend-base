import { EnvironmentTypes, ProjectSiteConfig } from '../types';

const config: ProjectSiteConfig = {
  apps: [],

  APP_ID: 'runtime',
  BASE_URL: 'http://localhost:8080',
  ENVIRONMENT: EnvironmentTypes.TEST,
  FAVICON_URL: 'https://edx-cdn.org/v3/default/favicon.ico',
  LMS_BASE_URL: 'http://localhost:18000',
  LOGIN_URL: 'http://localhost:18000/login',
  LOGO_TRADEMARK_URL: 'https://edx-cdn.org/v3/default/logo-trademark.svg',
  LOGO_URL: 'https://edx-cdn.org/v3/default/logo.svg',
  LOGO_WHITE_URL: 'https://edx-cdn.org/v3/default/logo-white.svg',
  LOGOUT_URL: 'http://localhost:18000/logout',
  SEGMENT_KEY: 'segment_whoa',
  SITE_NAME: 'edX',
};

export default config;
