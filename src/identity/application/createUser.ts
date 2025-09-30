import { User } from "../domain/User";
import { UserRepository } from "../infrastructure/UserRepository";

export const createUser = (user: Omit<User, "id">) => {
  const userRepository = new UserRepository();
  const id = userRepository.nextId();
  const newUser = User.create(user.pseudo, id, userRepository.isPseudoAvailable(user.pseudo));
  userRepository.save(newUser);
  return newUser;
};
