export default function ($t) {
  return [
    {
      id: 'home',
      title: $t('components.admin.navigation.home'),
      icon: 'mdi-home',
      to: '/',
      color: 'blue-grey lighten-4',
      order: 100,
      permission: null
    },
    {
      id: 'dashboard',
      title: $t('components.admin.navigation.adminHome'),
      icon: 'mdi-desktop-mac-dashboard',
      to: '/admin',
      color: 'blue-grey lighten-4',
      order: 200,
      permission: null
    },
    {
      divider: true,
      order: 300
    },
    {
      id: 'users-management',
      title: $t('components.admin.navigation.userManagement'),
      icon: 'mdi-account',
      permission: 'users.query',
      color: 'blue-grey lighten-4',
      order: 400,
      children: [
        {
          id: 'users',
          title: $t('components.admin.navigation.users'),
          icon: 'mdi-account-box',
          to: '/admin/users',
          color: 'blue-grey lighten-4',
          order: 100,
          permission: 'users.query',
          actions: [
            {
              id: 'add-user',
              title: $t('components.admin.navigation.addUser'),
              icon: 'mdi-account-plus',
              color: 'green',
              to: '/admin/users/create',
              dialog: true,
              permission: 'users.store'
            },
            {
              id: 'user-reports',
              title: $t('components.admin.navigation.userReports'),
              icon: 'mdi-chart-bell-curve',
              color: 'blue-grey lighten-4',
              to: '/admin/users/reports',
              permission: 'users.reports'
            },
            {
              id: 'online-users',
              title: $t('components.admin.navigation.onlineUsers'),
              icon: 'mdi-account-network',
              color: 'blue-grey lighten-4',
              to: '/admin/users/online',
              permission: 'users.online'
            }
          ]
        },
        {
          id: 'roles',
          title: $t('components.admin.navigation.roles'),
          icon: 'mdi-account-hard-hat',
          to: '/admin/roles',
          color: 'blue-grey lighten-4',
          permission: 'roles.query',
          order: 200,
          actions: [
            {
              id: 'add-role',
              title: $t('components.admin.navigation.addRole'),
              icon: 'mdi-plus-circle',
              color: 'green',
              to: '/admin/roles/create',
              dialog: true,
              permission: 'roles.store'
            }
          ]
        },
        {
          id: 'domains',
          title: $t('components.admin.navigation.domains'),
          icon: 'mdi-domain',
          to: '/admin/domains',
          color: 'blue-grey lighten-4',
          order: 300,
          permission: 'domains.query',
          actions: [
            {
              id: 'add-domain',
              title: $t('components.admin.navigation.addDomain'),
              icon: 'mdi-plus-circle',
              color: 'green',
              to: '/admin/domains/create',
              dialog: true,
              permission: 'domains.store'
            }
          ]
        },
        {
          id: 'groups',
          title: $t('components.admin.navigation.groups'),
          icon: 'mdi-group',
          to: '/admin/groups',
          color: 'blue-grey lighten-4',
          order: 300,
          permission: 'groups.query',
          actions: [
            {
              id: 'add-group',
              title: $t('components.admin.navigation.addGroup'),
              icon: 'mdi-plus-circle',
              color: 'green',
              to: '/admin/groups/create',
              dialog: true,
              permission: 'domains.store'
            }
          ],
          children: [
            {
              id: 'add-group',
              title: $t('components.admin.navigation.addGroup'),
              icon: 'mdi-plus-circle',
              color: 'green',
              to: '/admin/groups/create',
              dialog: true,
              permission: 'domains.store'
            }
          ]
        },
        {
          id: 'emails',
          title: $t('components.admin.navigation.emails'),
          icon: 'mdi-email',
          to: '/admin/emails',
          color: 'blue-grey lighten-4',
          order: 400,
          permission: 'users.query'
        },
        {
          id: 'phones',
          title: $t('components.admin.navigation.phones'),
          icon: 'mdi-phone',
          to: '/admin/phone-numbers',
          color: 'blue-grey lighten-4',
          permission: 'phone-numbers.query',
          order: 500
        },
        {
          id: 'addresses',
          title: $t('components.admin.navigation.addresses'),
          icon: 'mdi-map-marker',
          to: '/admin/addresses',
          color: 'blue-grey lighten-4',
          permission: 'addresses.query',
          order: 600
        },
        {
          id: 'devices',
          title: $t('components.admin.navigation.devices'),
          icon: 'mdi-devices',
          to: '/admin/devices',
          color: 'blue-grey lighten-4',
          order: 600,
          permission: 'devices.query'
        }
      ]
    },
    {
      id: 'content-management',
      title: $t('components.admin.navigation.contentManagement'),
      icon: 'mdi-offer',
      color: 'blue-grey lighten-4',
      order: 500,
      children: [
        {
          id: 'posts',
          title: $t('components.admin.navigation.posts'),
          icon: 'mdi-post',
          to: '/admin/posts',
          color: 'blue-grey lighten-4',
          order: 100,
          permission: 'posts.query',
          actions: [
            {
              id: 'add-post',
              title: $t('components.admin.navigation.addPost'),
              icon: 'mdi-plus-circle',
              color: 'green',
              to: '/admin/posts/create',
              permission: 'posts.store',
              dialog: true
            },
            {
              id: 'post-reports',
              title: $t('components.admin.navigation.postReports'),
              icon: 'mdi-chart-bell-curve',
              color: 'blue-grey lighten-4',
              to: '/admin/posts/reports',
              permission: 'posts.reports'
            }
          ]
        },
        {
          id: 'pages',
          title: $t('components.admin.navigation.pages'),
          icon: 'mdi-web',
          to: '/admin/pages',
          color: 'alternate',
          order: 200,
          permission: 'pages.query',
          actions: [
            {
              id: 'add-page',
              title: $t('components.admin.navigation.addPage'),
              icon: 'mdi-plus-circle',
              color: 'green',
              to: '/admin/pages/create',
              permission: 'pages.store',
              dialog: true
            },
            {
              id: 'page-reports',
              title: $t('components.admin.navigation.pageReports'),
              icon: 'mdi-chart-bell-curve',
              color: 'blue-grey lighten-4',
              to: '/admin/pages/reports',
              permission: 'pages.reports'
            }
          ]
        },
        {
          id: 'page-schemas',
          title: $t('components.admin.navigation.pageSchemas'),
          icon: 'mdi-web-box',
          to: '/admin/page-schemas',
          color: 'blue-grey lighten-4',
          order: 200,
          permission: 'page-schemas.query'
        },
        {
          id: 'forms',
          title: $t('components.admin.navigation.forms'),
          icon: 'mdi-form-dropdown',
          to: '/admin/forms',
          color: 'blue-grey lighten-4',
          order: 300,
          permission: 'forms.query',
          actions: [
            {
              id: 'add-forms',
              title: $t('components.admin.navigation.addForm'),
              icon: 'mdi-plus-circle',
              color: 'green',
              to: '/admin/forms/create',
              permission: 'forms.store',
              dialog: true
            }
          ]
        },
        {
          id: 'form-entries',
          title: $t('components.admin.navigation.formEntries'),
          icon: 'mdi-form-textbox',
          to: '/admin/form-entries',
          color: 'blue-grey lighten-4',
          permission: 'form-entries.query',
          order: 300,
          actions: [
            {
              id: 'add-form-entry',
              title: $t('components.admin.navigation.addFormEntry'),
              icon: 'mdi-plus-circle',
              color: 'green',
              to: '/admin/form-entries/create',
              dialog: true,
              permission: 'form-etnries.store'
            },
            {
              id: 'form-entry-reports',
              title: $t('components.admin.navigation.formEntryReports'),
              icon: 'mdi-chart-bell-curve',
              color: 'blue-grey lighten-4',
              to: '/admin/form-entries/reports',
              permission: 'form-entries.reports'
            }
          ]
        },
        {
          id: 'filters',
          title: $t('components.admin.navigation.filters'),
          icon: 'mdi-filter',
          to: '/admin/filters',
          color: 'blue-grey lighten-4',
          order: 300,
          permission: 'filters.query',
          actions: [
            {
              id: 'add-filter',
              title: $t('components.admin.navigation.addFilter'),
              icon: 'mdi-plus-circle',
              color: 'green',
              to: '/admin/filters/create',
              permission: 'filters.store',
              dialog: true
            }
          ]
        },
        {
          id: 'file-uploads',
          title: $t('components.admin.navigation.files'),
          icon: 'mdi-cloud-upload',
          to: '/admin/file-uploads',
          color: 'blue-grey lighten-4',
          permission: 'file-upload.query',
          order: 300
        }
      ]
    },
    {
      title: $t('components.admin.navigation.productManagement'),
      icon: 'mdi-package-variant',
      color: 'blue-grey lighten-4',
      order: 600,
      children: [
        {
          id: 'products',
          title: $t('components.admin.navigation.products'),
          icon: 'mdi-package',
          to: '/admin/products',
          permission: 'products.query',
          order: 100,
          actions: [
            {
              id: 'add-product',
              title: $t('components.admin.navigation.addProduct'),
              icon: 'mdi-plus-circle',
              color: 'green',
              to: '/admin/products/create',
              permission: 'products.store',
              dialog: true
            },
            {
              id: 'product-reports',
              title: $t('components.admin.navigation.productReports'),
              icon: 'mdi-chart-bell-curve',
              color: 'blue-grey lighten-4',
              to: '/admin/products/reports',
              permission: 'products.reports'
            }
          ]
        },
        {
          id: 'product-categories',
          title: $t('components.admin.navigation.productCategories'),
          icon: 'mdi-select-group',
          to: '/admin/product-categories',
          order: 200,
          permission: 'product-categories.query',
          actions: [
            {
              id: 'add-product-category',
              title: $t('components.admin.navigation.addProductCategory'),
              icon: 'mdi-plus-circle',
              color: 'green',
              to: '/admin/product-categories/create',
              permission: 'product-categories.create',
              dialog: true
            },
            {
              id: 'product-category-reports',
              title: $t('components.admin.navigation.productCategoryReports'),
              icon: 'mdi-chart-bell-curve',
              color: 'blue-grey lighten-4',
              to: '/admin/product-categories/reports',
              permission: 'product-categories.reports'
            }
          ]
        },
        {
          id: 'product-types',
          title: $t('components.admin.navigation.productTypes'),
          icon: 'mdi-texture-box',
          to: '/admin/product-types',
          order: 300,
          permission: 'product-types.query'
        }
      ]
    },
    {
      title: $t('components.admin.navigation.ecommerce'),
      icon: 'mdi-cart',
      color: 'blue-grey lighten-4',
      order: 700,
      children: [
        {
          id: 'bank-gateways',
          title: $t('components.admin.navigation.bankGateways'),
          icon: 'mdi-bank',
          to: '/admin/bank-gateways',
          order: 100,
          permission: 'bank-gateways.query'
        },
        {
          id: 'bank-gateway-transactions',
          title: $t('components.admin.navigation.bankTransactions'),
          icon: 'mdi-bank-transfer',
          to: '/admin/bank-gateway-transactions',
          order: 200,
          permission: 'bank-gateway-transactions.query',
          actions: [
            {
              id: 'bank-transactions-reports',
              title: $t('components.admin.navigation.bankTransactionReports'),
              icon: 'mdi-chart-bell-curve',
              color: 'blue-grey lighten-4',
              to: '/admin/bank-gateway-transactions/reports',
              permission: 'bank-gateway-transactions.reports'
            }
          ]
        },
        {
          id: 'carts',
          title: $t('components.admin.navigation.carts'),
          icon: 'mdi-cart',
          to: '/admin/carts',
          order: 300,
          permission: 'carts.query',
          actions: [
            {
              id: 'bank-transactions-create',
              title: $t('components.admin.navigation.addCart'),
              icon: 'mdi-plus-circle',
              color: 'green',
              to: '/admin/carts/create',
              permission: 'carts.store'
            },
            {
              id: 'cart-reports',
              title: $t('components.admin.navigation.cartReports'),
              icon: 'mdi-chart-bell-curve',
              color: 'blue-grey lighten-4',
              to: '/admin/carts/reports',
              permission: 'carts.reports'
            }
          ]
        },
        {
          id: 'wallet-transactions',
          title: $t('components.admin.navigation.walletTransactions'),
          icon: 'mdi-wallet',
          to: '/admin/wallet-transactions',
          order: 300,
          permission: 'wallet-transactions.query',
          actions: [
            {
              id: 'wallet-transactions-create',
              title: $t('components.admin.navigation.addWalletTransaction'),
              icon: 'mdi-plus-circle',
              color: 'green',
              to: '/admin/wallet-transactions/create',
              permission: 'wallet-transactions.store'
            }
          ]
        },
        {
          id: 'invoices',
          title: $t('components.admin.navigation.invoices'),
          icon: 'mdi-cash-register',
          to: '/admin/invoices',
          order: 400,
          permission: 'invoices.query',
          actions: [
            {
              id: 'invoice-reports',
              title: $t('components.admin.navigation.invoiceReports'),
              icon: 'mdi-chart-bell-curve',
              color: 'blue-grey lighten-4',
              to: '/admin/invoices/reports',
              permission: 'invoices.create'
            }
          ]
        },
        {
          id: 'gift-codes',
          title: $t('components.admin.navigation.giftCodes'),
          icon: 'mdi-gift',
          to: '/admin/gift-codes',
          order: 500,
          permission: 'gift-codes.query'
        }
      ]
    },
    {
      id: 'crm',
      title: $t('components.admin.navigation.crm'),
      icon: 'mdi-comment-check',
      order: 800,
      children: [
        {
          id: 'sms-gateways',
          title: $t('components.admin.navigation.smsGateways'),
          icon: 'mdi-cellphone-basic',
          to: '/admin/sms-gateways',
          order: 100,
          permission: 'sms-gateways.query'
        },
        {
          id: 'sms-messages',
          title: $t('components.admin.navigation.smsMessages'),
          icon: 'mdi-cellphone-message',
          to: '/admin/sms-messages',
          order: 200,
          permission: 'sms-messages.query',
          actions: [
            {
              id: 'send-sms-message',
              title: $t('components.admin.navigation.sendSmsMessage'),
              icon: 'mdi-send',
              color: 'green',
              to: '/admin/sms-messages/send',
              permission: 'sms-messages.send',
              dialog: true
            },
            {
              id: 'sms-messages-reports',
              title: $t('components.admin.navigation.smsMessageReports'),
              icon: 'mdi-chart-bell-curve',
              color: 'blue-grey lighten-4',
              to: '/admin/sms-messages/reports',
              permission: 'sms-messages.reports'
            }
          ]
        },
        {
          id: 'notifications',
          title: $t('components.admin.navigation.notifications'),
          icon: 'mdi-alert-decagram',
          to: '/admin/notifications',
          order: 300,
          permission: 'notifications.query',
          actions: [
            {
              id: 'send-notification',
              title: $t('components.admin.navigation.sendNotification'),
              icon: 'mdi-alert-octagram-outline',
              color: 'green',
              to: '/admin/notifications/send',
              permission: 'notifications.send',
              dialog: true
            },
            {
              id: 'notifications-reports',
              title: $t('components.admin.navigation.notificationReports'),
              icon: 'mdi-chart-bell-curve',
              color: 'blue-grey lighten-4',
              to: '/admin/notifications/reports',
              permission: 'notifications.reports'
            }
          ]
        },
        {
          id: 'chats',
          title: $t('components.admin.navigation.chats'),
          icon: 'mdi-comment',
          to: '/admin/chat-rooms',
          order: 300,
          permission: 'chats.query',
          actions: [
            {
              id: 'send-notification',
              title: $t('components.admin.navigation.chatMessages'),
              icon: 'mdi-chat-plus',
              color: 'green',
              to: '/admin/chat-messages',
              dialog: true,
              permission: 'chats.store'
            }
          ]
        },
        {
          id: 'reviews',
          title: $t('components.admin.navigation.reviews'),
          icon: 'mdi-comment-multiple',
          to: '/admin/product-reviews',
          order: 300,
          permission: 'product-reviews.query',
          actions: [
            {
              id: 'review-reports',
              title: $t('components.admin.navigation.reviewReports'),
              icon: 'mdi-chart-bell-curve',
              color: 'blue-grey lighten-4',
              to: '/admin/product-reviews/reports',
              permission: 'reviews.repots'
            }
          ]
        }
      ]
    },
    {
      id: 'system-management',
      title: $t('components.admin.navigation.systemManagement'),
      icon: 'mdi-cog',
      order: 900,
      children: [
        {
          id: 'log',
          title: $t('components.admin.navigation.logs'),
          icon: 'mdi-file-settings',
          to: '/admin/notifications',
          order: 300,
          permission: 'app.log-viewer'
        },
        {
          id: 'horizon',
          title: $t('components.admin.navigation.horizon'),
          icon: 'mdi-flare',
          to: '/admin/horizon',
          order: 300,
          permission: 'app.horizon'
        },
        {
          id: 'task-queues',
          title: $t('components.admin.navigation.taskQueues'),
          icon: 'mdi-timeline-clock',
          to: '/admin/task-queues',
          order: 300,
          permission: 'task-reports.query'
        },
        {
          id: 'activity-logs',
          title: $t('components.admin.navigation.activityLogs'),
          icon: 'mdi-timeline-text',
          to: '/admin/activity-logs',
          order: 300,
          permission: 'activity-logs.query'
        }
      ]
    }
  ]
}
