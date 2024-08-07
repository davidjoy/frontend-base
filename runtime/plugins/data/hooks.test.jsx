import '@testing-library/jest-dom';

import { getConfig } from '../../config';

import { IFRAME_PLUGIN, PLUGIN_OPERATIONS } from './constants';
import { usePluginSlot } from './hooks';

const mockSlotChanges = [
  {
    op: PLUGIN_OPERATIONS.Insert,
    widget: {
      id: 'login',
      priority: 50,
      type: IFRAME_PLUGIN,
      url: '/login',
      title: 'Login',
    },
  },
];

jest.mock('../../config');

describe('usePluginSlots', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('when the plugin slot is defined', () => {
    it('returns keepDefault and plugin changes', () => {
      getConfig.mockImplementation(() => (
        {
          pluginSlots: {
            example_plugin_slot: {
              plugins: mockSlotChanges,
              keepDefault: true,
            },
          },
        }
      ));

      const slotConfig = usePluginSlot('example_plugin_slot');
      expect(slotConfig.keepDefault).toBe(true);
      expect(slotConfig.plugins).toBe(mockSlotChanges);
    });
  });

  describe('when the plugin slot is not defined', () => {
    it('returns true for keepDefault and no plugin changes', () => {
      getConfig.mockImplementation(() => {});

      const slotConfig = usePluginSlot('example_plugin_slot');

      expect(slotConfig.keepDefault).toBe(true);
      expect(slotConfig.plugins).toStrictEqual([]);
    });
  });
});
