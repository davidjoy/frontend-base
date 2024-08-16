import { render as rtlRender, screen } from '@testing-library/react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-unresolved
import {
  AppProvider,
  configureAuth, configureI18n, configureLogging, getConfig, IntlProvider,
  MockAuthService,
  setAuthenticatedUser
} from '../../../runtime';

import { LearningHeader as Header } from '../index';

class MockLoggingService {
  logInfo = jest.fn();

  logError = jest.fn();
}

const authenticatedUser = {
  userId: 'abc123',
  username: 'Mock User',
  roles: [],
  administrator: false,
};

function initializeMockApp() {
  const loggingService = configureLogging(MockLoggingService, {
    config: getConfig(),
  });
  const authService = configureAuth(MockAuthService, {
    config: getConfig(),
    loggingService,
  });

  setAuthenticatedUser(authenticatedUser);

  // i18n doesn't have a service class to return.
  configureI18n({
    config: getConfig(),
    loggingService,
    messages: [{
      ar: {},
      // NOTE: 'en' is not included in this list intentionally, since it's the fallback.
      'es-419': {},
      fa: {},
      'fa-ir': {},
      fr: {},
      'zh-cn': {},
      ca: {},
      he: {},
      id: {},
      'ko-kr': {},
      pl: {},
      'pt-br': {},
      ru: {},
      th: {},
      uk: {},
    }],
  });

  return { loggingService, authService };
}

function render(
  ui,
  {
    store = null,
    ...renderOptions
  } = {},
) {
  const Wrapper = ({ children }) => (
    // eslint-disable-next-line react/jsx-filename-extension
    <IntlProvider locale="en">
      <AppProvider store={store}>
        {children}
      </AppProvider>
    </IntlProvider>
  );

  Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

describe('Header', () => {
  beforeAll(async () => {
    // We need to mock AuthService to implicitly use `getAuthenticatedUser` within `AppContext.Provider`.
    await initializeMockApp();
  });

  it('displays user button', () => {
    render(<Header />);
    expect(screen.getByText(authenticatedUser.username)).toBeInTheDocument();
  });

  it('displays course data', () => {
    const courseData = {
      courseOrg: 'course-org',
      courseNumber: 'course-number',
      courseTitle: 'course-title',
    };
    render(<Header {...courseData} />);

    expect(screen.getByText(`${courseData.courseOrg} ${courseData.courseNumber}`)).toBeInTheDocument();
    expect(screen.getByText(courseData.courseTitle)).toBeInTheDocument();
  });
});
