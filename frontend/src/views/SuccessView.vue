<template>
  <AppPopup>
    <router-link :to="{ name: 'orders' }" class="close">
      <span class="visually-hidden">Закрыть попап</span>
    </router-link>
    <AppPopupTitle> Спасибо за заказ </AppPopupTitle>
    <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
    <AppPopupButton>
      <router-link :to="{ name: 'orders' }" class="button">
        Отлично, я жду!
      </router-link>
    </AppPopupButton>
  </AppPopup>
</template>

<script setup>
import AppPopup from "@/common/components/popup/AppPopup.vue";
import AppPopupTitle from "@/common/components/popup/AppPopupTitle.vue";
import AppPopupButton from "@/common/components/popup/AppPopupButton.vue";
</script>
