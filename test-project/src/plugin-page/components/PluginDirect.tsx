export default function PluginDirect() {
  return (
    <section className="bg-warning p-3">
      <h4>Inserted Direct Plugin</h4>
      <p>
        This plugin is a component that lives in the example app and is directly inserted via JS configuration.
        What makes this unique is that it isn&apos;t part of the default content defined for this slot, but is instead
        inserted as a plugin slot change &quot;PluginOperationTypes.INSERT&quot;.
      </p>
    </section>
  );
}
