import { randomUUID } from "crypto";
import { User } from "../domain/User";
import { UserRepository as UserRepositoryInterface } from "../domain/UserRepository";

const users: {
  id: string;
  pseudo: string;
}[] = [];

export class UserRepository implements UserRepositoryInterface {
  save(user: User) {
    users.push({
      id: user.id,
      pseudo: user.pseudo,
    });
  }

  nextId() {
    return randomUUID();
  }

  find(pseudo: string) {
    const foundUser =  users.find((user) => user.pseudo === pseudo);
    if (!foundUser) {
      return null;
    }
    return User.create(foundUser.pseudo, foundUser.id, true);
  }

  isPseudoAvailable(pseudo: string) {
    return users.find((user) => user.pseudo === pseudo) === undefined;
  }
}
