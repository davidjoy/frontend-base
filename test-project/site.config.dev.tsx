import { AppConfigTypes, PluginOperations, PluginTypes } from '@openedx/frontend-base';

import { EnvironmentTypes, ProjectSiteConfig } from '@openedx/frontend-base';
import { authenticatedPageConfig, examplePageConfig, iframePluginConfig, pluginPageConfig } from './src';
import ModularComponent from './src/plugin-page/components/ModularComponent';
import PluginDirect from './src/plugin-page/components/PluginDirect';
import './src/project.scss';

const modifyWidget = (widget) => {
  widget.content = {
    title: 'Modified Modular Plugin',
    uniqueText: 'Note that the original text defined in the JS config is replaced by this modified one.',
  };
  return widget;
};

const modifyWidgetDefaultContentsUsernamePII = (widget) => {
  widget.content = {
    'data-custom-attr': 'customValue',
    'data-another-custom-attr': '',
    className: 'font-weight-bold',
    style: { color: 'blue' },
    onClick: (e) => { console.log('Username clicked!', 'custom', e); },
  };
  return widget;
};

const modifyWidgetDefaultContentsLink = (widget) => {
  widget.content.href = 'https://openedx.org';
  return widget;
};

const wrapWidget = ({ component }) => (
  <div className="bg-warning" data-testid="wrapper">
    <div className="px-3">
      <p className="mb-0">This is a wrapper component that is placed around the default content.</p>
    </div>
    {component}
    <div className="px-3">
      <p>With this wrapper, you can add anything before or after a component.</p>
      <p className="mb-0">Note in the JS config that an iFrame plugin was Inserted, but a Hide operation was also used to hide it!</p>
    </div>
  </div>
);

const config: ProjectSiteConfig = {
  apps: {
    examplePage: {
      type: AppConfigTypes.INTERNAL,
      config: examplePageConfig,
    },
    authenticatedPage: {
      type: AppConfigTypes.INTERNAL,
      config: authenticatedPageConfig,
    },
    pluginPage: {
      type: AppConfigTypes.INTERNAL,
      config: pluginPageConfig,
    },
    // This site is serving its own iframe plugin and embedding it in the PluginPage.  This is
    // obviously not quite like a real world use case, but it helps us test the mechanism without
    // adding another test project to the library.
    iframePlugin: {
      type: AppConfigTypes.INTERNAL,
      config: iframePluginConfig,
    },
  },

  APP_ID: 'shell',
  ENVIRONMENT: EnvironmentTypes.DEVELOPMENT,
  ACCOUNT_PROFILE_URL: 'http://apps.local.openedx.io:1995',
  ACCOUNT_SETTINGS_URL: 'http://apps.local.openedx.io:1997',
  BASE_URL: 'http://apps.local.openedx.io:8080',
  LEARNER_DASHBOARD_URL: 'http://local.openedx.io:8000/dashboard',
  LEARNING_BASE_URL: 'http://apps.local.openedx.io:2000',
  LMS_BASE_URL: 'http://local.openedx.io:8000',
  LOGIN_URL: 'http://local.openedx.io:8000/login',
  LOGOUT_URL: 'http://local.openedx.io:8000/logout',
  STUDIO_BASE_URL: 'http://studio.local.openedx.io:8001',
  MARKETING_SITE_BASE_URL: 'http://local.openedx.io:8000',
  ORDER_HISTORY_URL: 'http://apps.local.openedx.io:1996/orders',
  SITE_NAME: 'My Open edX Site',
  MFE_CONFIG_API_URL: 'http://apps.local.openedx.io:8080/api/mfe_config/v1',

  LOGO_URL: 'https://edx-cdn.org/v3/default/logo.svg',
  LOGO_TRADEMARK_URL: 'https://edx-cdn.org/v3/default/logo-trademark.svg',
  LOGO_WHITE_URL: 'https://edx-cdn.org/v3/default/logo-white.svg',
  FAVICON_URL: 'https://edx-cdn.org/v3/default/favicon.ico',

  pluginSlots: {
    slot_with_insert_operation: {
      keepDefault: true,
      plugins: [
        {
          op: PluginOperations.INSERT,
          widget: {
            id: 'inserted_direct_plugin',
            type: PluginTypes.DIRECT,
            priority: 10,
            RenderWidget: PluginDirect,
          },
        },
        {
          op: PluginOperations.INSERT,
          widget: {
            id: 'inserted_iframe_plugin',
            type: PluginTypes.IFRAME,
            priority: 30,
            url: 'http://apps.local.openedx.io:8080/iframe-plugin',
            title: 'The iFrame plugin that is inserted in the slot',
          },
        },
      ],
    },
    slot_with_modify_wrap_hidden_operations: {
      keepDefault: true,
      plugins: [
        {
          op: PluginOperations.INSERT,
          widget: {
            id: 'inserted_plugin',
            type: PluginTypes.DIRECT,
            priority: 10,
            RenderWidget: ModularComponent,
            content: {
              title: 'Modular Direct Plugin',
              uniqueText: 'This is some text that will be replaced by the Modify operation below.',
            },
          },
        },
        {
          op: PluginOperations.INSERT,
          widget: {
            id: 'inserted_iframe_plugin',
            type: PluginTypes.IFRAME,
            priority: 30,
            url: 'http://apps.local.openedx.io:8080/iframe-plugin',
            title: 'This iFrame plugin will be hidden due to the Hide operation in this config.',
          },
        },
        {
          op: PluginOperations.WRAP,
          widgetId: 'default_contents',
          wrapper: wrapWidget,
        },
        {
          op: PluginOperations.MODIFY,
          widgetId: 'inserted_plugin',
          fn: modifyWidget,
        },
        {
          op: PluginOperations.HIDE,
          widgetId: 'inserted_iframe_plugin',
        },
      ],
    },
    slot_with_modular_plugins: {
      keepDefault: true,
      plugins: [
        {
          op: PluginOperations.INSERT,
          widget: {
            id: 'insert_modular_direct_plugin',
            type: PluginTypes.DIRECT,
            priority: 1,
            RenderWidget: ModularComponent,
            content: {
              title: 'Modular Direct Plugin',
              uniqueText: 'This is a direct plugin with priority of 1, which is why it appears first in this slot.',
            },
          },
        },
      ],
    },
    slot_without_default: {
      keepDefault: false,
      plugins: [
        {
          op: PluginOperations.INSERT,
          widget: {
            id: 'insert_direct_plugin',
            type: PluginTypes.DIRECT,
            priority: 1,
            RenderWidget: ModularComponent,
            content: {
              title: 'Modular Direct Plugin With Content Defined in JS Config',
              uniqueText: 'This modular component receives some of its content from the JS config (such as this text).',
            },
          },
        },
        {
          op: PluginOperations.INSERT,
          widget: {
            id: 'insert_another_direct_plugin',
            type: PluginTypes.DIRECT,
            priority: 10,
            RenderWidget: PluginDirect,
          },
        },
        {
          op: PluginOperations.INSERT,
          widget: {
            id: 'inserted_iframe_plugin',
            type: PluginTypes.IFRAME,
            priority: 30,
            url: 'http://apps.local.openedx.io:8080/iframe-plugin',
            title: 'The iFrame plugin that is inserted in the slot',
          },
        },
      ],
    },
    slot_with_username_pii: {
      keepDefault: true,
      plugins: [
        {
          op: PluginOperations.MODIFY,
          widgetId: 'default_contents',
          fn: modifyWidgetDefaultContentsUsernamePII,
        },
      ],
    },
    slot_with_hyperlink: {
      keepDefault: true,
      plugins: [
        {
          op: PluginOperations.MODIFY,
          widgetId: 'default_contents',
          fn: modifyWidgetDefaultContentsLink,
        },
      ],
    },
  },

  custom: {
    FALSE_VALUE: false,
    CORRECT_BOOL_VALUE: 'Good, false meant false.  We did not cast a boolean to a string.',
    INCORRECT_BOOL_VALUE: 'Why was a false boolean true?',
    INTEGER_VALUE: 123,
    EXAMPLE_VAR: 'Example Value',
  }
};

export default config;
