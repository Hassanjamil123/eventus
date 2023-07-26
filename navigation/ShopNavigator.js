import { Platform } from 'react-native'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'


import Colors from '../constants/Colors'

import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen'
import ProductDetailScreen from '../screens/shop/ProductDetailScreen'
import CartScreen from '../screens/shop/CartScreen'
import PaymentScreen from '../screens/shop/PaymentScreen'
import OrderScreen from '../screens/shop/OrderScreen'
import UserProductScreen from '../screens/user/UserProductScreen'
import EditProductScreen from '../screens/user/EditProductScreen'
import SettingScreen from '../screens/shop/settingScreen'
import AuthScreen from '../screens/user/AuthScreen'
import OrgAuthScreen from '../screens/user/OrgAuthScreen'
import SearchScreen from '../screens/shop/SearchScreen'
import EditProfileScreen from '../screens/user/EditProfileScreen'
import SavedEventsScreen from '../screens/shop/SavedEventsScreen'
import EventsCalendarScreen from '../screens/shop/EventsCalenderScreen'
import InterestsScreen from '../screens/shop/InterestsScreen'


import HomeScreen from '../screens/org/HomeScreen'
import CreateEventScreen from '../screens/org/CreateEventScreen'
import SettingsScreen from '../screens/org/SettingsScreen'
import CurrentEventScreen from '../screens/org/CurrentEventScreen'
import NotificationScreen from '../screens/org/NotificationScreen'
import WalletScreen from '../screens/org/WalletScreen'
import InsightsScreen from '../screens/org/InsightsScreen'
import TicketsScreen from '../screens/org/TicketsScreen'
import EventDetailScreen from '../screens/org/EventDetailScreen'
import EditEventScreen from '../screens/org/EditEventScreen'
import ForgotPasswordScreen from '../screens/user/ForgotPasswordScreen'

const defaultNavOptions = {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTitleStyle: {
      fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
      fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
  };


const ShopNavigator = createStackNavigator({
    ProductsOverview: ProductOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen,
    Orders: OrderScreen,
    Settings: SettingScreen,
    Search: SearchScreen,
    EditProduct: EditProductScreen,
    EditProfile: EditProfileScreen,
    SavedEvents: SavedEventsScreen,
    Calendar: EventsCalendarScreen,
    Interests: InterestsScreen,
    Payment: PaymentScreen
}, 
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
            },
            headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
        },
        navigationOptions: ({ navigation }) => {
            const userId = navigation.getParam('userId');
            return {
              headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
              headerRight: () => (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                  <Item
                    title="Save Event"
                    iconName="bookmark-outline"
                    onPress={() =>
                      navigation.navigate('SavedEvents', { userId: userId }) // Pass userId to SavedEventsScreen
                    }
                  />
                  {/* Other header items */}
                </HeaderButtons>
              ),
            };
          },
    }
)

const OrgNavigator = createStackNavigator({
    Home: HomeScreen,
    CreateEvent: CreateEventScreen,
    Settings: SettingsScreen,
    CurrentEvent: CurrentEventScreen,
    Notifications: NotificationScreen,
    Wallet: WalletScreen,
    Insights: InsightsScreen,
    Tickets: TicketsScreen,
    EventDetails: EventDetailScreen,
    Edit: EditEventScreen



}, 
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
            },
            headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
        }
    }
)

const AuthNavigator = createStackNavigator(
{
    Auth: AuthScreen,
    ForgotPassword: ForgotPasswordScreen,
    OrgAuth: OrgAuthScreen
}, 
{
    defaultNavigationOptions: defaultNavOptions
})

const MainNavigator = createSwitchNavigator({
    Auth: AuthNavigator,
    Shop: ShopNavigator,
    Org: OrgNavigator  
})


export default createAppContainer(MainNavigator)