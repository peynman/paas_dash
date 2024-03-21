<template>
  <v-card>
    <v-card-title />
    <v-card-text>
      <user-cart-list :cart="cart" :user="cart.customer" preview />
    </v-card-text>
    <v-card-text>
      <cart-delivery :cart="cart" :user="cart.customer" />
      <v-alert
        v-if="deliveryAlert"
        text
        type="warning"
        border="bottom"
        class="my-1 mx-3"
        icon="mdi-alert"
      >
        <v-row align="center">
          <v-col class="grow">
            {{ deliveryAlert }}
          </v-col>
          <v-col class="shrink">
            <v-btn text to="/faqs" target="_blank">
              {{ $t('components.website.userCart.seeDeliveryFaqs') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-alert>
      <v-divider />
      <cart-amount :cart="cart" :user="cart.customer" selected-delivery preview />
    </v-card-text>
  </v-card>
</template>

<script>
  import UserCartDetails from '../../../mixins/UserCartDetails'
  import CartAmount from '../../UserCart/CartAmount.vue'
  import CartDelivery from '../../UserCart/CartDelivery.vue'
  import UserCartList from '../../UserCart/UserCartList.vue'

  export default {
    name: 'CartDetailsLoader',
    components: {
      CartDelivery,
      CartAmount,
      UserCartList,
    },
    mixins: [
      UserCartDetails,
    ],
    props: {
      value: Object,
    },
    data: vm => ({
      cartLoaded: null,
    }),
    computed: {
      deliveryAlert () {
        return this.cartDeliveryAgent?.hint
      },
      cart () {
        return {
          ...(this.value ?? {}),
          ...(this.cartLoaded ?? {}),
        }
      },
    },
    methods: {
      updateCartDetails () {

      },
    },
  }
</script>
