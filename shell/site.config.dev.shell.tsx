import { Button } from '@openedx/paragon';
import { EnvironmentTypes, ProjectSiteConfig, SlotOperationTypes } from '../types';
import defaultShellConfig from './defaultShellConfig';
import CoursesLink from './dev-project/header/CoursesLink';
import homeConfig from './dev-project/home';
import userConfig from './dev-project/user/userConfig';
import defaultFooterConfig from './footer/defaultFooterConfig';
import defaultHeaderConfig from './header/defaultHeaderConfig';

import './app.scss';
import DropdownMenuSlot from './menus/DropdownMenuSlot';
import LinkMenuItem from './menus/LinkMenuItem';

const config: ProjectSiteConfig = {
  apps: [
    defaultShellConfig,
    defaultHeaderConfig,
    defaultFooterConfig,
    userConfig,
    homeConfig,
    {
      slots: [
        {
          slotId: 'frontend.shell.header.primaryLinks.widget',
          id: 'header.learnerDashboard.link',
          op: SlotOperationTypes.APPEND,
          element: (
            <LinkMenuItem
              label={<CoursesLink />}
              url="#"
              variant="navLink"
            />
          )
        },
        {
          slotId: 'frontend.shell.header.primaryLinks.widget',
          id: 'header.booyah.link',
          op: SlotOperationTypes.APPEND,
          element: (
            <LinkMenuItem
              label="Booyah"
              url="#"
              variant="navLink"
            />
          )
        },
        {
          slotId: 'frontend.shell.footer.desktop.top.widget',
          id: 'footer.booyah.revealed',
          op: SlotOperationTypes.APPEND,
          element: (
            <Button>I are button</Button>
          )
        },
        {
          slotId: 'frontend.shell.footer.desktop.top.widget',
          id: 'footer.booyah.revealed.options',
          op: SlotOperationTypes.OPTIONS,
          options: {
            label: 'I Reveal Buttons',
          }
        },
        {
          slotId: 'frontend.shell.footer.desktop.top.widget',
          id: 'footer.booyah.revealed.linky',
          op: SlotOperationTypes.APPEND,
          element: (
            <Button>I Are Another Button</Button>
          )
        },
        {
          slotId: 'frontend.shell.footer.desktop.centerLinks.first.widget',
          id: 'footer.booyah.centerLinks.first.1',
          op: SlotOperationTypes.APPEND,
          element: (
            <LinkMenuItem label="Link 1" url="#" />
          )
        },
        {
          slotId: 'frontend.shell.footer.desktop.centerLinks.fourth.widget',
          id: 'footer.booyah.centerLinks.fourth.dropdown',
          op: SlotOperationTypes.APPEND,
          element: (
            <DropdownMenuSlot id="frontend.shell.footer.desktop.centerLinks.fourth.dropdown.widget" label="Resources" />
          )
        },
        {
          slotId: 'frontend.shell.footer.desktop.centerLinks.fourth.dropdown.widget',
          id: 'footer.booyah.centerLinks.fourth.dropdown.1',
          op: SlotOperationTypes.APPEND,
          element: (
            <LinkMenuItem label="Resource 1" url="#" variant="navDropdownItem" />
          )
        }
      ]
    }
  ],
  externalRoutes: [
    {
      role: 'logout',
      url: 'http://local.openedx.io:8000/logout'
    }
  ],

  // General
  APP_ID: 'shell',
  BASE_URL: 'http://apps.local.openedx.io:8080',
  ENVIRONMENT: EnvironmentTypes.DEVELOPMENT,
  SITE_NAME: 'My Open edX Site',

  // Frontend URLs
  ACCOUNT_PROFILE_URL: 'http://apps.local.openedx.io:1995',
  ACCOUNT_SETTINGS_URL: 'http://apps.local.openedx.io:1997',
  LEARNER_DASHBOARD_URL: 'http://local.openedx.io:8000/dashboard',
  LEARNING_BASE_URL: 'http://apps.local.openedx.io:2000',
  LOGIN_URL: 'http://local.openedx.io:8000/login',
  ORDER_HISTORY_URL: 'http://apps.local.openedx.io:1996/orders',
  STUDIO_BASE_URL: 'http://studio.local.openedx.io:8001',
  MARKETING_SITE_BASE_URL: 'http://local.openedx.io:8000',
  LOGOUT_URL: 'http://local.openedx.io:8000/logout',

  // API URLs
  LMS_BASE_URL: 'http://local.openedx.io:8000',
  MFE_CONFIG_API_URL: 'http://apps.local.openedx.io:8080/api/mfe_config/v1',

  // Brand URLs
  FAVICON_URL: 'https://edx-cdn.org/v3/default/favicon.ico',
  LOGO_TRADEMARK_URL: 'https://edx-cdn.org/v3/default/logo-trademark.svg',
  LOGO_URL: 'https://edx-cdn.org/v3/default/logo.svg',
  LOGO_WHITE_URL: 'https://edx-cdn.org/v3/default/logo-white.svg',
};

export default config;
