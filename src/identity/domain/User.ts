export class User {
  constructor(public pseudo: string, public id: string) {}

  public static create(pseudo: string, id: string, isPseudoAvailable: boolean) {
    if (!isPseudoAvailable) {
      throw new Error("Pseudo is already taken");
    }
    if (pseudo.length === 0) {
      throw new Error("Pseudo must be greater than 0");
    }
    if (pseudo.length > 100) {
      throw new Error("Pseudo must be less than 100 characters");
    }
    return new User(pseudo, id);
  }
}
