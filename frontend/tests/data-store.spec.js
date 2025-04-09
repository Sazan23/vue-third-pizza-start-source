import { beforeEach, describe, expect, it } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useDataStore } from "@/stores/data";
import mockDoughs from "./mocks/dough.json";
import mockIngredients from "./mocks/ingredients.json";
import mockSauces from "./mocks/sauces.json";
import mockSizes from "./mocks/sizes.json";
import mockMisc from "./mocks/misc.json";

describe("data store", () => {
  let dataStore;

  beforeEach(() => {
    setActivePinia(createPinia());
    dataStore = useDataStore();

    dataStore.doughs = mockDoughs;
    dataStore.ingredients = mockIngredients;
    dataStore.sauces = mockSauces;
    dataStore.sizes = mockSizes;
    dataStore.misc = mockMisc;
  });

  it("data is loaded correctly", () => {
    // Проверка загрузки
    expect(dataStore.isDataLoaded).toBe(true);
  });

  it("data works correctly", () => {
    // Проверка каждого типа данных
    {
      const firstDough = dataStore.doughs[0];
      expect(firstDough.id).toBe(1);
      expect(firstDough.name).toBe("Тонкое");
      expect(firstDough.price).toBe(300);
    }

    {
      const firstIngredient = dataStore.ingredients[0];
      expect(firstIngredient.id).toBe(1);
      expect(firstIngredient.name).toBe("Грибы");
      expect(firstIngredient.price).toBe(33);
    }

    {
      const firstSauce = dataStore.sauces[0];
      expect(firstSauce.id).toBe(1);
      expect(firstSauce.name).toBe("Томатный");
      expect(firstSauce.price).toBe(50);
    }

    {
      const firstSize = dataStore.sizes[0];
      expect(firstSize.id).toBe(1);
      expect(firstSize.name).toBe("23 см");
      expect(firstSize.multiplier).toBe(1);
    }
  });
});
