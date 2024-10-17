import { Divider } from '../runtime';
import { AppConfigTypes, EnvironmentTypes, ProjectSiteConfig } from '../types';

import './index.scss';

const config: ProjectSiteConfig = {
  apps: {
    root: {
      type: AppConfigTypes.INTERNAL,
      config: {
        route: {
          path: '/',
          element: (
            <div className="p-3">Main content.</div>
          ),
        }
      }
    },
    'learner-dashboard': {
      type: AppConfigTypes.EXTERNAL,
      url: 'http://local.openedx.io:8000/dashboard'
    },
    support: {
      type: AppConfigTypes.EXTERNAL,
      url: 'https://local.openedx.io:8000',
    }
  },

  header: {
    primaryLinks: [
      {
        name: 'Courses',
        appId: 'learner-dashboard',
      },
      {
        name: 'Other',
        href: '#',
      },
      {
        name: 'Dropdown',
        items: [
          {
            name: 'Item #1',
            href: '#',
          },
          <Divider />,
          {
            name: 'Item #2',
            href: '#',
          },
        ]
      }
    ],
    secondaryLinks: [
      {
        name: 'Help',
        appId: 'support',
      }
    ]
  },

  APP_ID: 'shell',
  ACCOUNT_PROFILE_URL: 'http://apps.local.openedx.io:1995',
  ACCOUNT_SETTINGS_URL: 'http://apps.local.openedx.io:1997',
  BASE_URL: 'http://apps.local.openedx.io:8080',
  ENVIRONMENT: EnvironmentTypes.DEVELOPMENT,
  FAVICON_URL: 'https://edx-cdn.org/v3/default/favicon.ico',
  LEARNER_DASHBOARD_URL: 'http://local.openedx.io:8000/dashboard',
  LEARNING_BASE_URL: 'http://apps.local.openedx.io:2000',
  LMS_BASE_URL: 'http://local.openedx.io:8000',
  LOGIN_URL: 'http://local.openedx.io:8000/login',
  LOGO_TRADEMARK_URL: 'https://edx-cdn.org/v3/default/logo-trademark.svg',
  LOGO_URL: 'https://edx-cdn.org/v3/default/logo.svg',
  LOGO_WHITE_URL: 'https://edx-cdn.org/v3/default/logo-white.svg',
  LOGOUT_URL: 'http://local.openedx.io:8000/logout',
  MARKETING_SITE_BASE_URL: 'http://local.openedx.io:8000',
  MFE_CONFIG_API_URL: 'http://apps.local.openedx.io:8080/api/mfe_config/v1',
  ORDER_HISTORY_URL: 'http://apps.local.openedx.io:1996/orders',
  SITE_NAME: 'My Open edX Site',
  STUDIO_BASE_URL: 'http://studio.local.openedx.io:8001',
};

export default config;