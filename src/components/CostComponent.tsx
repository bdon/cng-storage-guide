import { For, type JSX, createSignal } from "solid-js";

function CostComponent(props: any) {
  const providers = props.providers;

  const [selectedProvider, setSelectedProvider] = createSignal(providers[0]);

  const selectProvider: JSX.EventHandler<HTMLSelectElement, Event> = (event) => {
    const slug = event.currentTarget.value;
    setSelectedProvider(providers.find(item => item.id === slug));
  };

  return (
    <div>
      <select onChange={selectProvider}>
       <For each={props.providers}>
          {(provider) => (
            <option value={provider.id}>{provider.data.name}</option>
          )}
        </For>
      </select>
      <p>Total storage costs for 100GB: <strong>{(selectedProvider().data.cost_per_gb_stored * 100).toFixed(2)}</strong> {selectedProvider().data.currency}</p>
      <p>Total egress costs for 100GB: <strong>{(selectedProvider().data.cost_per_gb_egress * 100).toFixed(2)}</strong> {selectedProvider().data.currency}</p>
    </div>
  );
}

export default CostComponent;