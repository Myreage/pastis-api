import { Ingredient, IngredientName } from "./Ingredient";
import { Quantity, QuantityUnit } from "./Quantity";

export class IngredientLine {
  private constructor(
    public ingredient: Ingredient,
    public quantity: Quantity
  ) {}

  public static create(
    ingredient: IngredientName,
    amount: number,
    unit: QuantityUnit
  ) {
    if (amount <= 0) {
      throw new Error("Amount must be greater than 0");
    }
    
    return new IngredientLine(
      new Ingredient(ingredient),
      new Quantity(amount, unit)
    );
  }
}
