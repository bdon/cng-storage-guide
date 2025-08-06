import type { CollectionEntry } from "astro:content";
import {
	type ColumnDef,
	createSolidTable,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
} from "@tanstack/solid-table";
import { createSignal, For, type JSX } from "solid-js";

type Provider = CollectionEntry<"providers">;

const defaultColumns: ColumnDef<Provider>[] = [
	{
		accessorFn: (row) => row.data.name,
		cell: (info) => info.getValue(),
		header: "name",
	},
	{
		accessorFn: (row) => row.data.cost_per_gb_stored,
		cell: (info) => info.getValue(),
		header: "Cost per GB/Month",
		enableSorting: true,
	},
	{
		accessorFn: (row) => row.data.cost_per_1k_gets,
		cell: (info) => info.getValue(),
		header: "Cost per 1000 GETs",
		enableSorting: true,
	},
	{
		accessorFn: (row) => row.data.cost_per_gb_egress,
		cell: (info) => info.getValue(),
		header: "Egress per GB",
		enableSorting: true,
	},
	{
		accessorFn: (row) => row.data.currency,
		cell: (info) => info.getValue(),
		header: "Currency",
		enableSorting: true,
	},
	{
		accessorFn: (row) => row.data.pricing_page,
		cell: (info) => {
			const href = info.getValue() as string | undefined;
			return (
				<a class="underline text-blue-500" target="_blank" href={href ?? "#"}>
					pricing
				</a>
			);
		},
		header: "Pricing page",
	},
];

function TableComponent(props: { providers: Provider[] }) {
	const [sorting, setSorting] = createSignal([]);

	const table = createSolidTable({
		get data() {
			return props.providers;
		},
		columns: defaultColumns,
		state: {
			get sorting() {
				return sorting();
			},
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
	});

	return (
		<div>
			<table class="table-auto">
				<thead>
					<For each={table.getHeaderGroups()}>
						{(headerGroup) => (
							<tr>
								<For each={headerGroup.headers}>
									{(header) => (
										<th
											onClick={header.column.getToggleSortingHandler()}
											class="cursor-pointer"
										>
											{flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
											{{
												asc: " 🔼",
												desc: " 🔽",
											}[header.column.getIsSorted() as string] ?? ""}
										</th>
									)}
								</For>
							</tr>
						)}
					</For>
				</thead>
				<tbody>
					<For each={table.getRowModel().rows}>
						{(row) => (
							<tr>
								<For each={row.getVisibleCells()}>
									{(cell) => (
										<td>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</td>
									)}
								</For>
							</tr>
						)}
					</For>
				</tbody>
			</table>
		</div>
	);
}

export default TableComponent;
