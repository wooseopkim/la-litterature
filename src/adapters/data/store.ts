import { derived, writable } from "svelte/store";
import type User from "../network/users/User";

export const authenticatedUser = writable<User>(null);

export const authenticated = derived(
  authenticatedUser,
  (x) => Boolean(x?.uid),
);
