<template>
  <v-list-item>
    <v-list-item-avatar>
      <v-dialog max-width="766">
        <template v-slot:activator="{on}">
          <v-badge
            :color="statusColor"
            :content="itemsCount"
            bordered
            overlap
            offset-y="10"
            offset-x="10"
          >
            <v-avatar :color="statusColor" size="50">
              <v-btn icon dark v-on="on"><v-icon>mdi-cart</v-icon></v-btn>
            </v-avatar>
          </v-badge>
        </template>
        <cart-details-loader :value="cart" :user="cart.customer" />
      </v-dialog>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>
        {{ amount }}
      </v-list-item-title>
      <v-list-item-subtitle class="d-flex flex-column align-start">
        <div class="d-flex flex-row align-center">
          <v-chip x-small label :color="statusColor" class="me-1">
            {{ statusString }}
          </v-chip>
          <confirm-remove-dialog
            :title="$t('components.admin.crud.cart.syncCartWarning')"
            @remove="onSyncCart"
          >
            <template v-slot:activator="{on}">
              <v-tooltip top>
                <template v-slot:activator="tooltip">
                  <v-btn dense icon x-small :loading="loading" :disabled="cartStatus === 1">
                    <v-icon small :color="syncColor" v-on="{ ...on, ...tooltip.on }">mdi-cube</v-icon>
                  </v-btn>
                </template>
                {{ $t('components.admin.crud.cart.synced') }}
              </v-tooltip>
            </template>
          </confirm-remove-dialog>
          <confirm-remove-dialog
            :title="$t('components.admin.crud.cart.markPostedWarning')"
            @remove="onMarkCartAsPosted"
          >
            <template v-slot:activator="{on}">
              <v-tooltip top>
                <template v-slot:activator="tooltip">
                  <v-btn dense icon x-small :loading="loading" :disabled="cartStatus === 1">
                    <v-icon small :color="sentColor" v-on="{ ...on, ...tooltip.on }">mdi-cube-send</v-icon>
                  </v-btn>
                </template>
                {{ $t('components.admin.crud.cart.posted') }}
              </v-tooltip>
            </template>
          </confirm-remove-dialog>
        </div>
        <v-chip
          v-if="isPurchased"
          x-small
          label
          color="secondary"
          dark
        >
          {{ purchaseDateString }}
        </v-chip>
      </v-list-item-subtitle>
      <v-list-item-subtitle>
        <v-chip
          v-for="flag in flags"
          :key="`bitwiseflag-${flag.value}`"
          :color="flag.color"
          :dark="flag.dark"
          x-small
          label
        >
          {{ flag.text }}
        </v-chip>
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
  import TimestampFormatter from '../../../mixins/TimestampFormatter'
  import CartDetailsLoader from './CartDetailsLoader.vue'
  import ConfirmRemoveDialog from '../../Inputs/ConfirmDialog/ConfirmRemoveDialog.vue'

  export default {
    name: 'CartDetailsColumn',
    components: {
      CartDetailsLoader,
      ConfirmRemoveDialog,
    },
    mixins: [
      TimestampFormatter,
    ],
    props: {
      cart: {
        type: Object,
        default: () => ({}),
      },
    },
    data: vm => ({
      loading: false,
    }),
    computed: {
      itemsCount () {
        return this.$n(this.cart?.products?.length ?? 0, 'decimal')
      },
      isPurchased () {
        return !!this.cart?.data?.period_start
      },
      purchaseDateString () {
        return this.getRelativeTimestamp(this.cart?.data?.period_start)
      },
      statusString () {
        return this.status?.find(i => i.value === this.cart?.status)?.text
      },
      statusColor () {
        return this.status?.find(i => i.value === this.cart?.status)?.color
      },
      syncColor () {
        return this.cart?.data?.synced ? 'success' : 'warning'
      },
      sentColor () {
        return this.cart?.data?.posted_at ? 'success' : 'warning'
      },
      status () {
        return this.$press.getAvailableCartStatuses(this)
      },
      cartStatus () {
        return this.cart?.status
      },
      flags () {
        return Object.keys(this.$t('components.admin.crud.cart.flags'))
          .reduce((flags, flag) => {
            if ((flag & this.cart?.flags) !== 0) {
              flags.push({
                value: flag,
                text: this.$t('components.admin.crud.cart.flags.' + flag),
              })
            }
            return flags
          }, [])
      },
      amount () {
        if (this.cart?.amount) {
          return this.$t('components.admin.currencyColumn.amount', {
            amount: this.$n(this.cart?.amount, 'decimal'),
            currency: this.$store.getters['banking/currentCurrencyTitle'],
          })
        }

        return this.$t('components.admin.currencyColumn.free')
      },
    },
    methods: {
      onSyncCart () {
        this.loading = true
        this.$store.dispatch('apiCall', {
          url: `/api/giv/sync/cart/${this.cart.id}`,
          method: 'POST',
        })
          .then(json => {
            this.$set(this.cart.data, 'synced', true)
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => {
            this.loading = false
          })
      },
      onMarkCartAsPosted () {
        this.loading = true
        this.$store.dispatch('apiCall', {
          url: `/api/carts/${this.cart.id}/mark-posted`,
          method: 'PUT',
        })
          .then(json => {
            this.$set(this.cart.data, 'posted_at', new Date())
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => {
            this.loading = false
          })
      },
    },
  }
</script>
