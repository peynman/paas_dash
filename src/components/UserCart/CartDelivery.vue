<template>
  <div class="d-flex flex-column" style="position: relative;">
    <div class="ma-4 d-flex flex-row justify-space-between">
      <span>{{ $t('components.website.userCartVerify.address') }}</span>
      <span class="d-flex flex-column">
        {{ cartAddressString }}
        <span v-if="cartAddressPostalCode">
          {{ $t('components.website.userCartVerify.postalCode', [cartAddressPostalCode]) }}</span>
      </span>
    </div>
    <v-divider />
    <div class="ma-4 d-flex flex-row justify-space-between">
      <span>{{ $t('components.website.userCartVerify.deliveryAgent') }}</span>
      <span>{{ cartDeliveryAgentString }}</span>
    </div>
  </div>
</template>

<script>
  import Iran from '@peynman/press-vue-core/mixins/Iran'
  import UserCartDetails from '@peynman/press-vue-core/mixins/UserCartDetails'

  export default {
    name: 'CartDelivery',
    mixins: [
      Iran,
      UserCartDetails,
    ],
    props: {
      cart: Object,
    },
    computed: {
      cartAddressProvince () {
        return this.getProvinceById(this.cartAddress?.province_code)?.text
      },
      cartAddressCity () {
        return this.getCityById(this.cartAddress?.province_code, this.cartAddress?.city_code)?.text
      },
      cartAddressString () {
        return `${this.cartAddressProvince} - ${this.cartAddressCity} - ${this.cartAddress?.address}`
      },
      cartDeliveryAgentString () {
        return this.cartDeliveryAgent?.text
      },
      cartAddressPostalCode () {
        return this.cartAddress?.postal_code
      },
    },
  }
</script>
