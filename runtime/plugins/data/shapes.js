import PropTypes from 'prop-types';
import { PluginTypes } from '../../../types';

export const pluginConfigShape = {
  /** Id for the plugin */
  id: PropTypes.string.isRequired,
  /** Plugin type */
  type: PropTypes.oneOf([PluginTypes.IFRAME, PluginTypes.DIRECT]).isRequired,
  /** Priority of the plugin — ordered low-to-high */
  priority: PropTypes.number,
};

export const iframePluginConfigShape = {
  ...pluginConfigShape,
  /** URL for the iframe src */
  url: PropTypes.string.isRequired,
  /** Title attribute for the iframe */
  title: PropTypes.string.isRequired,
};

export const directPluginConfigShape = {
  ...pluginConfigShape,
  /** Component that receives id and content as props */
  RenderWidget: PropTypes.func.isRequired,
  /** Content that is passed to the RenderWidget function */
  content: PropTypes.object,
};

export const slotOptionsShape = {
  mergeProps: PropTypes.bool,
};
