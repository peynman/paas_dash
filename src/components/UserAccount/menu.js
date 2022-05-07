export default function ($t) {
  return [
      {
          id: 'edit-profile',
          title: $t('components.admin.account.editProfile'),
          icon: 'mdi-face-profile',
          to: '/me/profile',
      },
      {
          id: 'my-chats',
          title: $t('components.admin.account.myChats'),
          icon: 'mdi-chat-alert',
          to: '/me/chats',
      },
      // {
      //     id: 'my-notifications',
      //     title: $t('components.admin.account.myNotifications'),
      //     icon: 'mdi-alert',
      //     to: '/me/notifications',
      // },
      {
          id: 'my-purchases',
          title: $t('components.admin.account.myPurchases'),
          icon: 'mdi-cart',
          to: '/me/carts',
      },
      {
          id: 'my-transactions',
          title: $t('components.admin.account.myTransactions'),
          icon: 'mdi-wallet',
          to: '/me/wallet',
      },
      {
          id: 'change-password',
          title: $t('components.admin.account.changePassword'),
          icon: 'mdi-lock',
          to: '/me/change-password',
      },
      // {
      //     id: 'update-security',
      //     title: $t('components.admin.account.updateSecurity'),
      //     icon: 'mdi-lock-check',
      //     to: '/me/update-security',
      // },
      {
          id: 'exit',
          title: $t('components.admin.account.exit'),
          icon: 'mdi-exit-run',
          click () {
            this.$store.dispatch('logout')
            if (this.$router.currentRoute.path !== '/') {
              setTimeout(() => {
                this.$router.replace('/')
              }, 100)
            }
          },
    },
  ]
}
