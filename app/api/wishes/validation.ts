import { assert, object, number, string, optional } from "superstruct";

export const WishRequest = object({
  title: string(),
  author: optional(string()),
  description: optional(string()),
  resource: optional(string()),
});
