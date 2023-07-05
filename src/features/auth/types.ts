import { TypeOf } from "zod";
import { CredentialsSchema, UserSchema } from "./schemas";

export type User = TypeOf<typeof UserSchema>;
export type Credentials = TypeOf<typeof CredentialsSchema>;
