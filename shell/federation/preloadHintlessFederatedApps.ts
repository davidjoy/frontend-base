import { patchApp } from '../../runtime/config';
import { FederatedApp } from '../../types';
import { getFederatedApps } from './getFederatedApps';
import { loadFederatedApp } from './loadFederatedApp';

export async function preloadHintlessFederatedApps() {
  const federatedApps = getFederatedAppsWithoutHints();
  for (const federatedApp of federatedApps) {
    const app = await loadFederatedApp(federatedApp);
    if (app !== null) {
      patchApp(app);
    } else {
      throw new Error(`Failed to load app ${federatedApp.moduleId} from ${federatedApp.remoteId} remote.`);
    }
  }
}

export function getFederatedAppsWithoutHints() {
  const federatedApps = getFederatedApps();

  return federatedApps.filter((federatedApp) => {
    return !federatedAppHasHints(federatedApp);
  });
}

export function federatedAppHasHints(federatedApp: FederatedApp) {
  if (typeof federatedApp.hints === 'object') {
    const { paths } = federatedApp.hints;
    if (Array.isArray(paths) && paths.length > 0) {
      return true;
    }
  }
  return false;
}
