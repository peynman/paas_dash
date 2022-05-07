export default {
  IPermissionsRepository: {
    methods: [{
      name: 'getVisiblePermissions',
      params: [{
        name: 'user',
        type: null,
      }],
    }],
    class: 'Larapress\\CRUD\\Repository\\IPermissionsRepository',
  },
  IRoleRepository: {
    methods: [{
        name: 'getVisibleRoles',
        params: [{
          name: 'user',
          type: null,
        }],
      },
      {
        name: 'getUserHighestRole',
        params: [{
          name: 'user',
          type: null,
        }],
      },
    ],
    class: 'Larapress\\CRUD\\Repository\\IRoleRepository',
  },
  IPhoneNumberRepository: {
    methods: [{
      name: 'getPhoneNumberFlags',
      params: [{
        name: 'user',
        type: {},
      }],
    }],
    class: 'Larapress\\Profiles\\Repository\\PhoneNumber\\IPhoneNumberRepository',
  },
  IDomainRepository: {
    methods: [{
        name: 'getVisibleDomains',
        params: [{
            name: 'user',
            type: {},
          },
          {
            name: 'columns',
            type: null,
          },
        ],
      },
      {
        name: 'getDomainFlags',
        params: [{
          name: 'user',
          type: {},
        }],
      },
      {
        name: 'getRequestDomain',
        params: [{
          name: 'request',
          type: {},
        }],
      },
      {
        name: 'isRequestDefaultDomain',
        params: [{
          name: 'request',
          type: {},
        }],
      },
      {
        name: 'getCurrentRequestDomain',
        params: [],
      },
      {
        name: 'isCurrentRequestDefaultDomain',
        params: [],
      },
    ],
    class: 'Larapress\\Profiles\\Repository\\Domain\\IDomainRepository',
  },
  IFormRepository: {
    methods: [{
        name: 'getFillableForms',
        params: [{
          name: 'user',
          type: null,
        }],
      },
      {
        name: 'getForm',
        params: [{
            name: 'user',
            type: null,
          },
          {
            name: 'request',
            type: {},
          },
          {
            name: 'route',
            type: {},
          },
          {
            name: 'formId',
            type: null,
          },
        ],
      },
    ],
    class: 'Larapress\\Profiles\\Repository\\Form\\IFormRepository',
  },
  IFilterRepository: {
    methods: [{
        name: 'getByType',
        params: [{
          name: 'type',
          type: null,
        }],
      },
      {
        name: 'randomByType',
        params: [{
          name: 'type',
          type: null,
        }],
      },
      {
        name: 'getVisibleByType',
        params: [{
            name: 'user',
            type: null,
          },
          {
            name: 'type',
            type: null,
          },
        ],
      },
      {
        name: 'randomVisibleByType',
        params: [{
            name: 'user',
            type: null,
          },
          {
            name: 'type',
            type: null,
          },
        ],
      },
    ],
    class: 'Larapress\\Profiles\\Repository\\Filter\\IFilterRepository',
  },
  IBankGatewayRepository: {
    methods: [{
      name: 'getAllBankGateways',
      params: [{
        name: 'user',
        type: null,
      }],
    }],
    class: 'Larapress\\ECommerce\\Services\\Banking\\IBankGatewayRepository',
  },
  IProductRepository: {
    methods: [{
        name: 'getProdcutCategories',
        params: [{
          name: 'user',
          type: null,
        }],
      },
      {
        name: 'getProductTypes',
        params: [{
          name: 'user',
          type: null,
        }],
      },
      {
        name: 'getProdcutCategoryChildren',
        params: [{
            name: 'user',
            type: null,
          },
          {
            name: 'category',
            type: null,
          },
        ],
      },
      {
        name: 'getRootProductCategories',
        params: [{
          name: 'user',
          type: null,
        }],
      },
      {
        name: 'getProductsPaginated',
        params: [{
            name: 'user',
            type: null,
          },
          {
            name: 'page',
            type: null,
          },
          {
            name: 'limit',
            type: null,
          },
          {
            name: 'inCategories',
            type: null,
          },
          {
            name: 'withTypes',
            type: null,
          },
          {
            name: 'sortBy',
            type: null,
          },
          {
            name: 'notIntCatgories',
            type: null,
          },
          {
            name: 'withoutTypes',
            type: null,
          },
        ],
      },
      {
        name: 'getPurchasedProductsPaginated',
        params: [{
            name: 'user',
            type: null,
          },
          {
            name: 'page',
            type: null,
          },
          {
            name: 'limit',
            type: null,
          },
          {
            name: 'inCategories',
            type: null,
          },
          {
            name: 'withTypes',
            type: null,
          },
          {
            name: 'sortBy',
            type: null,
          },
          {
            name: 'notIntCatgories',
            type: null,
          },
          {
            name: 'withoutTypes',
            type: null,
          },
        ],
      },
      {
        name: 'getProductReviews',
        params: [{
            name: 'user',
            type: null,
          },
          {
            name: 'productId',
            type: null,
          },
          {
            name: 'page',
            type: null,
          },
          {
            name: 'limit',
            type: null,
          },
        ],
      },
      {
        name: 'getPurchasedProductsCarts',
        params: [{
          name: 'user',
          type: null,
        }],
      },
      {
        name: 'getProductDetails',
        params: [{
            name: 'user',
            type: null,
          },
          {
            name: 'product_id',
            type: null,
          },
        ],
      },
      {
        name: 'getProductAncestorIds',
        params: [{
          name: 'product',
          type: null,
        }],
      },
    ],
    class: 'Larapress\\ECommerce\\Services\\Product\\IProductRepository',
  },
  IPageRepository: {
    methods: [{
        name: 'getAllPageRepositories',
        params: [{
          name: 'user',
          type: null,
        }],
      },
      {
        name: 'getAllPageObjectFetchers',
        params: [{
          name: 'user',
          type: null,
        }],
      },
      {
        name: 'getAllPageTitles',
        params: [{
          name: 'user',
          type: null,
        }],
      },
    ],
    class: 'Larapress\\Pages\\Repository\\IPageRepository',
  },
  ISMSGatewayRepository: {
    methods: [{
        name: 'getAllSMSGatewayTypes',
        params: [{
          name: 'user',
          type: null,
        }],
      },
      {
        name: 'getSMSGateways',
        params: [{
          name: 'user',
          type: null,
        }],
      },
    ],
    class: 'Larapress\\Notifications\\Services\\SMSService\\ISMSGatewayRepository',
  },
  ICourseSessionRepository: {
    methods: [{
        name: 'getTodayCourseSessions',
        params: [{
          name: 'user',
          type: null,
        }],
      },
      {
        name: 'getWeekCourseSessions',
        params: [{
          name: 'user',
          type: null,
        }],
      },
      {
        name: 'getIntroducedUsersList',
        params: [{
          name: 'user',
          type: null,
        }],
      },
    ],
    class: 'Larapress\\LCMS\\Services\\CourseSession\\ICourseSessionRepository',
  },
  IWalletTransactionRepository: {
    methods: [{
      name: 'getWalletTransactionsPaginated',
      params: [{
          name: 'user',
          type: null,
        },
        {
          name: 'page',
          type: null,
        },
        {
          name: 'limit',
          type: null,
        },
      ],
    }],
    class: 'Larapress\\ECommerce\\Services\\Wallet\\IWalletTransactionRepository',
  },
  INotificationsRepository: {
    methods: [{
        name: 'getUnseenNotificationsPaginated',
        params: [{
            name: 'user',
            type: {},
          },
          {
            name: 'page',
            type: null,
          },
          {
            name: 'limit',
            type: null,
          },
        ],
      },
      {
        name: 'getOldNotificationsPaginated',
        params: [{
            name: 'user',
            type: {},
          },
          {
            name: 'page',
            type: null,
          },
          {
            name: 'limit',
            type: null,
          },
        ],
      },
    ],
    class: 'Larapress\\Notifications\\Services\\Notifications\\INotificationsRepository',
  },
  IChatRepository: {
    methods: [{
        name: 'getJoinedRoomsPaginated',
        params: [{
            name: 'user',
            type: {},
          },
          {
            name: 'page',
            type: null,
          },
          {
            name: 'limit',
            type: null,
          },
        ],
      },
      {
        name: 'getClosedRoomsPaginated',
        params: [{
            name: 'user',
            type: {},
          },
          {
            name: 'page',
            type: null,
          },
          {
            name: 'limit',
            type: null,
          },
        ],
      },
      {
        name: 'getRoomMessagesPaginated',
        params: [{
            name: 'user',
            type: {},
          },
          {
            name: 'room',
            type: null,
          },
          {
            name: 'page',
            type: null,
          },
          {
            name: 'limit',
            type: null,
          },
        ],
      },
    ],
    class: 'Larapress\\Chat\\Services\\Chat\\IChatRepository',
  },
  ICartRepository: {
    methods: [{
      name: 'getPurchasedCartsPaginated',
      params: [{
          name: 'user',
          type: {},
        },
        {
          name: 'page',
          type: null,
        },
        {
          name: 'limit',
          type: null,
        },
      ],
    }],
    class: 'Larapress\\ECommerce\\Services\\Cart\\ICartRepository',
  },
}
