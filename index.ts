export {
  APP_ANALYTICS_INITIALIZED,
  APP_AUTH_INITIALIZED,
  APP_CONFIG_INITIALIZED,
  APP_I18N_INITIALIZED,
  APP_INIT_ERROR,
  APP_LOGGING_INITIALIZED,
  APP_PUBSUB_INITIALIZED,
  APP_READY,
  APP_TOPIC,
  AUTHENTICATED_USER_CHANGED,
  AUTHENTICATED_USER_TOPIC,
  AppContext,
  AppProvider,
  AuthenticatedPageRoute,
  AxiosJwtAuthService,
  CONFIG_CHANGED,
  CONFIG_TOPIC,
  DIRECT_PLUGIN,
  ErrorBoundary,
  ErrorPage,
  FormattedDate,
  FormattedMessage,
  FormattedNumber,
  FormattedPlural,
  FormattedRelativeTime,
  FormattedTime,
  IFRAME_PLUGIN,
  IntlProvider,
  LOCALE_CHANGED,
  LOCALE_TOPIC,
  LoginRedirect,
  MockAnalyticsService,
  MockAuthService,
  MockLoggingService,
  NewRelicLoggingService,
  PLUGIN_OPERATIONS,
  PageWrap,
  Plugin,
  PluginSlot,
  SegmentAnalyticsService,
  auth,
  camelCaseObject,
  configureAnalytics,
  configureAuth,
  configureI18n,
  configureLogging,
  convertKeyNames,
  createIntl,
  defineMessages,
  ensureAuthenticatedUser,
  fetchAuthenticatedUser,
  getAnalyticsService,
  getAuthService,
  getAuthenticatedHttpClient,
  getAuthenticatedUser,
  getConfig,
  getCountryList,
  getCountryMessages,
  getHttpClient,
  getLanguageList,
  getLanguageMessages,
  getLocale,
  getLoggingService,
  getLoginRedirectUrl,
  getLogoutRedirectUrl,
  getMessages,
  getPath,
  getPrimaryLanguageSubtag,
  getQueryParameters,
  handleRtl,
  history,
  hydrateAuthenticatedUser,
  identifyAnonymousUser,
  identifyAuthenticatedUser,
  initError,
  initialize,
  initializeMockApp,
  injectIntl,
  intlShape,
  isRtl,
  logError,
  logInfo,
  mergeConfig,
  mergeMessages,
  mockMessages,
  modifyObjectKeys,
  parseURL,
  publish,
  redirectToLogin,
  redirectToLogout,
  resetAnalyticsService,
  resetLoggingService,
  sendPageEvent,
  sendTrackEvent,
  sendTrackingLogEvent,
  setAuthenticatedUser,
  setConfig,
  snakeCaseObject,
  subscribe,
  unsubscribe,
  useAppEvent,
  useIntl
} from './runtime';

export interface SiteConfig {
  /**
   * The application content for the shell.  This is a temporary configuration option while we
   * convert micro-frontends to plugins.  It must be a React functional component that takes no
   * arguments and returns JSX.
   */
  app?: () => JSX.Element,

  ACCESS_TOKEN_COOKIE_NAME?: string,
  ACCOUNT_PROFILE_URL: string,
  ACCOUNT_SETTINGS_URL: string,
  APP_ID: string,
  BASE_URL: string,
  REFRESH_ACCESS_TOKEN_API_PATH?: string,
  CREDENTIALS_BASE_URL: string,
  CSRF_TOKEN_API_PATH?: string,
  DISCOVERY_API_BASE_URL: string,
  ECOMMERCE_BASE_URL: string,
  ENVIRONMENT: string,
  FAVICON_URL: string,
  IGNORED_ERROR_REGEX: RegExp | null,
  LANGUAGE_PREFERENCE_COOKIE_NAME?: string,
  LEARNING_BASE_URL: string,
  LMS_BASE_URL: string,
  LOGIN_URL: string,
  LOGO_TRADEMARK_URL: string,
  LOGO_URL: string,
  LOGO_WHITE_URL: string,
  LOGOUT_URL: string,
  MARKETING_SITE_BASE_URL: string,
  MFE_CONFIG_API_URL?: string,
  ORDER_HISTORY_URL: string,
  PUBLIC_PATH: string,
  PUBLISHER_BASE_URL: string,
  SEGMENT_KEY: string,
  SITE_NAME: string,
  STUDIO_BASE_URL: string,
  SUPPORT_URL?: string,
  USER_INFO_COOKIE_NAME?: string,

  custom?: {
    [key:string]: any,
  }
}
