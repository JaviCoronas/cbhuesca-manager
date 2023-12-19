import { z, defineCollection } from "astro:content";

export const collections = {
  posts: defineCollection({
    schema: z.object({
      title: z.string(),
      coverImage: z.string(),
      date: z.string(),
      resume: z.string(),
    }),
  }),
};
