import { User } from "./User";

export interface UserRepository {
  save: (user: User) => void;
  find: (pseudo: string) => User | null;
  nextId: () => string;
  isPseudoAvailable: (pseudo: string) => boolean;
}
