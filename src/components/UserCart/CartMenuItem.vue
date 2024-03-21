<template>
  <v-list-item>
    <v-list-item-avatar>
      <v-img :src="pickedIdentityImage" />
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>
        {{ productTitle }}
      </v-list-item-title>
      <v-list-item-subtitle>
        <span>{{ pickedLabel }}</span>
        <v-icon :color="pickedColor">mdi-record</v-icon>
        <span>{{ $t('components.website.productCard.pickedLabelAfter') }}</span>
      </v-list-item-subtitle>
      <v-list-item-subtitle class="d-flex flex-row flex-grow-1 align-center">
        <span>{{ $t('components.website.productCard.quantity', { n: $n(quantity, 'decimal') }) }}</span>
      </v-list-item-subtitle>
      <v-list-item-subtitle>
        {{ getProductPriceStringForQuantity(quantity) }}
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action v-if="!preview">
      <v-tooltip top>
        <template v-slot:activator="{on}">
          <v-btn
            :loading="loading"
            small
            icon
            v-on="on"
            @click="onRemoveFromCart"
          ><v-icon small>mdi-close</v-icon></v-btn>
        </template>
        <span>{{ $t('components.website.userCart.remove') }}</span>
      </v-tooltip>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
  import Product from '../../mixins/Product'

  export default {
    name: 'CartMenuItem',
    mixins: [
      Product,
    ],
    props: {
      value: Object,
      preview: Boolean,
    },
    data: vm => ({
      loading: false,
      quantity: vm.value?.pivot?.data?.quantity ?? 1,
    }),
    computed: {
      pickedLabel () {
        return this.$t('components.website.productCard.pickedLabel', {
          size: this.value?.pivot?.data?.extra?.size,
          color: this.value?.pivot?.data?.extra?.name,
        })
      },
      pickedColor () {
        return this.value?.pivot?.data?.extra?.color
      },
      pickedMaxQuantityInStock () {
        return this.getProductInStockCount(
          this.value,
          this.value?.pivot?.data?.extra?.color,
          this.value?.pivot?.data?.extra?.size
        )
      },
      pickedIdentityImage () {
        return this.getProductIdentityImage(this.pickedColor)
      },
    },
    watch: {
      value () {
        this.quantity = this.value?.pivot?.data?.quantity ?? 1
      },
    },
    methods: {
      onRemoveFromCart () {
        this.loading = true
        this.$store.dispatch('cart/removeFromCart', { product: this.value })
          .finally(() => {
            this.loading = false
          })
      },

      onQuantityChagned () {
        this.$store.dispatch('cart/changeQuantity', { product: this.value, quantity: this.quantity })
      },
    },
  }
</script>
