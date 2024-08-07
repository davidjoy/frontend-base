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
  ensureConfig,
  ensureDefinedConfig,
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

export interface OpenedXConfig {
  /**
   * The application content for the shell.  This is a temporary configuration option while we
   * convert micro-frontends to plugins.  It must be a React functional component that takes no
   * arguments and returns JSX.
   */
  app?: () => JSX.Element
}
