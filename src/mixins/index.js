import * as CartDetails from './CartDetails'
import * as ChartSettings from './ChartSettings'
import * as ChatRoom from './ChatRoom'
import * as CrudRoute from './CrudRoute'
import * as CrudTable from './CrudTable'
import * as Decoratable from './Decoratable'
import * as FormValidations from './FormValidations'
import * as Iran from './Iran'
import * as PaasApp from './PaasApp'
import * as Product from './Product'
import * as ProductCategories from './ProductCategories'
import * as ProductList from './ProductList'
import * as ProductReviews from './ProductReviews'
import * as ResponseAlerts from './ResponseAlerts'
import * as Search from './Search'
import * as Themeable from './Themeable'
import * as TimestampFormatter from './TimestampFormatter'
import * as User from './User'
import * as UserCartDetails from './UserCartDetails'
import * as UserNotifications from './UserNotifications'
import * as UserProfile from './UserProfile'
import * as UserProfileMethods from './UserProfileMethods'
import * as UserPurchasingCart from './UserPurchasingCart'
import * as WidgetsRenderer from './WidgetsRenderer'

export const mixins = {
    CartDetails,
    ChartSettings,
    ChatRoom,
    CrudRoute,
    CrudTable,
    Decoratable,
    FormValidations,
    Iran,
    PaasApp,
    Product,
    ProductCategories,
    ProductList,
    ProductReviews,
    ResponseAlerts,
    Search,
    Themeable,
    TimestampFormatter,
    User,
    UserCartDetails,
    UserNotifications,
    UserProfile,
    UserProfileMethods,
    UserPurchasingCart,
    WidgetsRenderer,
}

// Declare install function executed by Vue.use()
export function install(Vue, options) {
	if (install.installed) return;
	install.installed = true;
    mixins.forEach(m => {
        Vue.mixin(m)
    })
}

// Create module definition for Vue.use()
const plugin = {
	install,
};

export default plugin