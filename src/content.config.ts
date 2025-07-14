import { defineCollection, z } from "astro:content";

import { file } from "astro/loaders";

const providers = defineCollection({
	loader: file("storage_providers.yml"),
	schema: z.object({
		name: z.string(),
		cost_per_gb_stored: z.number(),
		cost_per_gb_egress: z.number(),
		pricing_page: z.string(),
		currency: z.string()
	}),
});

export const collections = { providers };
