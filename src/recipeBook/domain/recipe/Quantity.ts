export type QuantityUnit = "kg" | "cs" | "cc" | "L" | "mL";

export class Quantity {
  constructor(public amount: number, public unit: QuantityUnit) {
    if (amount <= 0) {
      throw new Error("Amount must be greater than 0");
    }
  }
}
