import { defineCollection, z } from "astro:content";

import { file } from "astro/loaders";

const providers = defineCollection({
	loader: file("storage_providers.yml"),
	schema: z.object({
		name: z.string(),
		cost_per_gb_stored: z.number(),
	}),
});

export const collections = { providers };
