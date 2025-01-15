import { PluginSlot } from '@openedx/frontend-base';
import ModularComponent from '../components/ModularComponent';

interface PluginSlotWithModifyWrapHideProps {
  id: string,
  label: string,
}

function PluginSlotWithModifyWrapHide({ id, label }: PluginSlotWithModifyWrapHideProps) {
  const content = {
    title: 'Default Content',
    uniqueText: 'Because this modular component is default content, this text is passed in as a prop within PluginSlot.'
  };

  return (
    <div className="border border-primary">
      <h3 id={id} className="pl-3">{label}</h3>
      <PluginSlot
        id="slot_with_modify_wrap_hidden_operations"
      >
        <ModularComponent content={content} />
      </PluginSlot>
    </div>
  );
}

export default PluginSlotWithModifyWrapHide;
