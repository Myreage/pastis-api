import { User } from "./User";

export interface UserRepository {
  save: (user: User) => void;
  findByPseudo: (pseudo: string) => User | null;
  findById: (id: string) => User | null;
  nextId: () => string;
  isPseudoAvailable: (pseudo: string) => boolean;
}
