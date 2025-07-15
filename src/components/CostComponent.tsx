import type { CollectionEntry } from "astro:content";
import { createSignal, For, type JSX } from "solid-js";

type Provider = CollectionEntry<"providers">;

function CostComponent(props: { providers: Provider[] }) {
	const providers = props.providers;

	const [selectedProvider, setSelectedProvider] = createSignal<Provider>(
		providers[0],
	);

	const selectProvider: JSX.EventHandler<HTMLSelectElement, Event> = (
		event,
	) => {
		const slug = event.currentTarget.value;
		const selected = providers.find((item: Provider) => item.id === slug);
		if (selected) setSelectedProvider(selected);
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
			<p>
				Total storage costs for 100GB:{" "}
				<strong>
					{(selectedProvider().data.cost_per_gb_stored * 100).toFixed(2)}
				</strong>{" "}
				{selectedProvider().data.currency}
			</p>
			<p>
				Total egress costs for 100GB:{" "}
				<strong>
					{(selectedProvider().data.cost_per_gb_egress * 100).toFixed(2)}
				</strong>{" "}
				{selectedProvider().data.currency}
			</p>
		</div>
	);
}

export default CostComponent;
