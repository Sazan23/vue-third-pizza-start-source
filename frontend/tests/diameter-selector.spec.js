import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import DiameterSelector from "@/modules/constructor/DiameterSelector.vue";
import mockSizes from "./mocks/sizes.json";

describe("DiameterSelector component", () => {
  const mockItem = mockSizes[0];

  // Группа тестов для проверки взаимодействия с компонентом
  describe("Component interaction", () => {
    // Тест проверяет, что компонент эмитит событие при выборе размера
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

    // Тест проверяет, что значение modelValue обновляется при клике на размер
    it("Should update modelValue when clicking on a size", async () => {
      const wrapper = mount(DiameterSelector, {
        props: {
          modelValue: mockItem.id,
          items: mockSizes,
        },
      });

      const radioInput = wrapper.find('[data-test="radio-diameter--1"]');
      radioInput.trigger("click");
      await wrapper.vm.$nextTick();

      expect(wrapper.props("modelValue")).toBe(1);
    });
  });

  // Группа тестов для проверки структуры DOM
  describe("Dom Structure", () => {
    // Тест проверяет, что все размеры из items корректно отображаются
    it("Should render all sizes passed in items prop", () => {
      const wrapper = mount(DiameterSelector, {
        props: {
          modelValue: mockItem.id,
          items: mockSizes,
        },
      });

      const radioButtons = wrapper.findAll('[data-test^="radio-diameter--"]');
      expect(radioButtons.length).toBe(mockSizes.length);
    });

    // Тест проверяет, что компонент рендерится корректно
    it("Should render the component correctly", () => {
      const wrapper = mount(DiameterSelector, {
        props: {
          modelValue: mockItem.id,
          items: mockSizes,
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.html().includes("23 см")).toBe(true);
    });
  });

  // Группа тестов для проверки пропсов
  describe("Props validation", () => {
    // Тест проверяет, что компонент получает корректные пропсы
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

    // Тест проверяет, что компонент корректно обрабатывает некорректное значение modelValue
    it("Should handle invalid modelValue gracefully", () => {
      const wrapper = mount(DiameterSelector, {
        props: {
          modelValue: 999,
          items: mockSizes,
        },
      });

      const selectedInput = wrapper.find("input:checked");
      expect(selectedInput.exists()).toBe(false);
    });
  });
});
