import { createPinia, setActivePinia } from "pinia";
import { useDataStore } from "@/stores/data";
import { beforeEach, describe, expect, it } from "vitest";
import { pizzaPrice } from "@/common/helpers/pizza-price.js";
import mockDoughs from "./mocks/dough.json";
import mockIngredients from "./mocks/ingredients.json";
import mockSauces from "./mocks/sauces.json";
import mockSizes from "./mocks/sizes.json";

describe("pizzaPrice", () => {
  beforeEach(() => {
    setActivePinia(createPinia());

    const dataStore = useDataStore();

    // Load all required data to the store
    dataStore.doughs = mockDoughs;
    dataStore.ingredients = mockIngredients;
    dataStore.sauces = mockSauces;
    dataStore.sizes = mockSizes;
  });

  it("pizzaPrice calculates correctly", () => {
    const pizza = {
      name: "Test Pizza",
      sizeId: 2,
      doughId: 1,
      sauceId: 1,
      ingredients: [
        { ingredientId: 1, quantity: 2 },
        { ingredientId: 3, quantity: 3 },
      ],
    };

    const result = pizzaPrice(pizza);

    // Expected calculation:
    // (dough + sauce + ingredients) * sizeMultiplier
    // dough price: 300
    // sauce price: 50
    // ingredients: (33*2) + (42*3) = 66 + 126 = 192
    // total before multiplier: 300 + 50 + 192 = 542
    // multiplied by sizeMultiplier=2: 542 * 2 = 1084

    expect(result).toBe(1084);
  });
});
