export class RecipeStep {
  constructor(public number: number, public instructions: string) {
    if (number <= 0) {
      throw new Error("Number must be greater than 0");
    }
    if (instructions.length === 0) {
      throw new Error("Instructions must be greater than 0");
    }
    if (instructions.length > 1000) {
      throw new Error("Instructions must be less than 1000 characters");
    }
  }
}
