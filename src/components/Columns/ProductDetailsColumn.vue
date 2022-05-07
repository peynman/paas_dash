<template>
  <div class="d-flex flex-column justify-center align-start">
    <span class="caption"><strong>{{ product.data.title }}</strong></span>
    <div class="d-flex flex-row justify-center align-center">
      <v-chip dense label x-small>{{ product.name }}</v-chip>
      <v-tooltip v-if="product.name.startsWith('giv-')" top>
        <template v-slot:activator="{on}">
          <v-btn icon :loading="syncingGiv" x-small @click="syncGivProduct" v-on="on">
            <v-icon small>mdi-file-image</v-icon>
          </v-btn>
        </template>
        {{ $t('components.admin.crud.product.column.syncGiv') }}
      </v-tooltip>
      <v-menu open-on-hover offset-y>
        <template v-slot:activator="{on}">
          <v-btn icon x-small v-on="on"><v-icon small>mdi-texture-box</v-icon></v-btn>
        </template>
        <v-list dense>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                {{ $t('components.admin.crud.product.column.types') }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider />
          <v-list-item v-for="(type, index) in productTypes" :key="`product-${productId}-type-${index}`">
            <v-chip label>{{ type.data.title }}</v-chip>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu open-on-hover :close-on-content-click="false" offset-y>
        <template v-slot:activator="{on}">
          <v-btn icon x-small v-on="on"><v-icon small>mdi-select-group</v-icon></v-btn>
        </template>
        <v-list dense>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                {{ $t('components.admin.crud.product.column.categories') }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider />
          <v-list-item v-for="(cat, index) in productCategories" :key="`product-${productId}-cat-${index}`">
            <confirm-remove-dialog v-if="canEditCategories" @remove="removeCategory(cat)">
              <template v-slot:activator="{on}">
                <v-tooltip top>
                  <template v-slot:activator="tooltipAct">
                    <v-btn color="red" dark icon :loading="removingCategory" v-on="{...on, ...tooltipAct.on}">
                      <v-icon small>mdi-minus</v-icon>
                    </v-btn>
                  </template>
                  {{ $t('components.admin.crud.product.column.removeCategory') }}
                </v-tooltip>
              </template>
            </confirm-remove-dialog>
            <v-chip :color="cat.data.backColor" label>
              {{ cat.data.title }}
            </v-chip></v-list-item>
        </v-list>
      </v-menu>
    </div>
    <div v-if="fixedPrice" class="d-flex flex-column flex-grow-1 mt-1">
      <div class="d-flex flex-row justify-center align-center">
        <v-chip
          label
          x-small
          dense
          elevation="3"
          color="green"
          dark
          outlined
        >
          <span class="font12">{{ fixedPriceString }} </span>
        </v-chip>
      </div>
      <div v-if="offAmount" class="my-1 d-flex flex-row justify-center align-center">
        <v-chip color="red" label outlined x-small dense>
          <span class="font10 strikethrough red--text">{{ offAmountString }}</span>
        </v-chip>
      </div>
    </div>
  </div>
</template>

<script>
  import User from '@peynman/press-vue-core/mixins/User'
  import Product from '@peynman/press-vue-core/mixins/Product'
  import ConfirmRemoveDialog from '../Inputs/ConfirmDialog/ConfirmRemoveDialog.vue'

  export default {
    name: 'ProductDetailsColumn',
    components: { ConfirmRemoveDialog },
    mixins: [
      Product,
      User,
    ],
    props: {
      value: Object,
    },
    data: vm => ({
      removingCategory: false,
      syncingGiv: false,
    }),
    computed: {
      canEditCategories () {
        return this.authUserHasPermission('products.update')
      },
    },
    methods: {
      removeCategory (cat) {
      },
      syncGivProduct () {
        this.syncingGiv = true
        this.$store.dispatch('apiCall', {
          url: `/api/giv/sync/product/${this.productId}`,
          method: 'POST',
        })
          .then(json => {
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => {
            this.syncingGiv = false
          })
      },
    },
  }
</script>
