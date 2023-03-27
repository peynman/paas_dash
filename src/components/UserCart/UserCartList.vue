<template>
  <v-list
    :max-height="maxHeight"
    :style="`${maxHeight ? 'overflow-y: auto;':''}`"
  >
    <div v-if="cartItemsCount > 0">
      <div v-for="(p, index) in cartItems" :key="`purchasing-cart-${index}`" class="d-flex flex-column flex-grow-1">
        <cart-menu-item :value="p" :preview="preview" />
        <v-divider v-if="index !== cartItemsCount - 1" />
      </div>
      <slot />
    </div>
    <v-list-item v-else>
      <v-list-item-content>
        <v-list-item-title>{{ $t('components.admin.userCart.empty') }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
  import UserCartDetails from '@peynman/press-vue-core/mixins/UserCartDetails'
  import Themeable from '@peynman/press-vue-core/mixins/Themeable'
  import CartMenuItem from './CartMenuItem.vue'

  export default {
    name: 'UserCartList',
    components: {
      CartMenuItem,
    },
    mixins: [
      Themeable,
      UserCartDetails,
    ],
    props: {
      maxHeight: String,
      preview: Boolean,
      cart: Object,
    },
  }
</script>
