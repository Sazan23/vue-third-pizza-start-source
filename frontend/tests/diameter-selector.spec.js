import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import DiameterSelector from "@/modules/constructor/DiameterSelector.vue";
import mockSizes from "./mocks/sizes.json";

describe("DiameterSelector component", () => {
  const mockItem = mockSizes[0];

  describe("Component interaction", () => {
    it("Should emit when a size is selected", async () => {
      const wrapper = mount(DiameterSelector, {
        props: {
          modelValue: mockItem.id,
          items: mockSizes,
        },
      });

      await wrapper.find("input").setValue(1);
      expect(wrapper.props("modelValue")).toBe(1);
    });

    it("Should update modelValue when clicking on a size", async () => {
      const wrapper = mount(DiameterSelector, {
        props: {
          modelValue: mockItem.id,
          items: mockSizes,
        },
      });

      // Simulate click on the first item
      const radioInput = wrapper.find('[data-test="radio-diameter--1"]');
      radioInput.trigger("click");
      await wrapper.vm.$nextTick();

      // Verify that modelValue is updated correctly
      expect(wrapper.props("modelValue")).toBe(1);
    });

    // Тест на рендеринг всех переданных размеров
    it("Should render all sizes passed in items prop", () => {
      const wrapper = mount(DiameterSelector, {
        props: {
          modelValue: mockItem.id,
          items: mockSizes,
        },
      });

      // Проверяем, что количество радиокнопок соответствует количеству элементов в items
      const radioButtons = wrapper.findAll('[data-test^="radio-diameter--"]');
      expect(radioButtons.length).toBe(mockSizes.length);
    });

    // Тест на обработку некорректных пропсов
    it("Should handle invalid modelValue gracefully", () => {
      const wrapper = mount(DiameterSelector, {
        props: {
          modelValue: 999, // Некорректное значение, которого нет в items
          items: mockSizes,
        },
      });

      // Проверяем, что ни один элемент не выбран
      const selectedInput = wrapper.find("input:checked");
      expect(selectedInput.exists()).toBe(false);
    });
  });

  describe("Dom Structure", () => {
    it("Should render the component correctly", () => {
      const wrapper = mount(DiameterSelector, {
        props: {
          modelValue: mockItem.id,
          items: mockSizes,
        },
      });

      // Verify that component is rendered and structure exists
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.html().includes("23 см")).toBe(true);
    });
  });

  describe("Props validation", () => {
    it("Should have correct props", () => {
      const wrapper = mount(DiameterSelector, {
        props: {
          modelValue: mockItem.id,
          items: mockSizes,
        },
      });

      expect(wrapper.props("modelValue")).toBe(mockItem.id);
      expect(wrapper.props("items")).toEqual(mockSizes);
    });
  });
});
