<template>
  <div class="d-flex flex-column" style="position: relative;">
    <v-overlay v-if="!preview && isCartLoading" absolute>
      <v-progress-circular indeterminate />
    </v-overlay>
    <div class="ma-4 d-flex flex-row justify-space-between">
      <span>{{ $t('components.website.userCart.cartAmount') }}</span>
      <span>{{ cartAmountString }}</span>
    </div>
    <v-divider v-if="selectedDelivery" inset />
    <div v-if="selectedDelivery" class="ma-4 d-flex flex-row justify-space-between">
      <span>{{ $t('components.website.userCart.cartShipping') }}</span>
      <span>{{ cartShippingAmountString }}</span>
    </div>
    <v-divider inset />
    <div v-if="cartGiftCode" class="ma-4 d-flex flex-row justify-space-between">
      <span>{{ $t('components.website.userCart.cartOff') }}</span>
      <span class="green--text"><strong>{{ cartGiftAmountString }}</strong></span>
    </div>
    <v-divider inset />
    <div class="ma-4 d-flex flex-row justify-space-between">
      <span>{{ $t('components.website.userCart.cartPayable') }}</span>
      <span><strong>{{ cartTotalAmountString }}</strong></span>
    </div>
  </div>
</template>

<script>
  import UserCartDetails from '@peynman/press-vue-core/mixins/UserCartDetails'

  export default {
    name: 'CartAmount',
    mixins: [
      UserCartDetails,
    ],
    props: {
      selectedDelivery: Boolean,
      cart: Object,
      preview: Boolean,
    },
    computed: {
      isCartLoading () {
        return this.$store.getters['cart/isLoading']
      },
    },
  }
</script>
