// @flow

import { StackNavigator } from 'react-navigation';

import Colors from '../constants/Colors';

import MainTabNavigator from './MainTabNavigator';
import PostScreen from '../screens/PostScreen';
import CommentsScreen from '../screens/CommentsScreen';
import UserScreen from '../screens/UserScreen';
import HomeScreen from '../screens/HomeScreen';

const RootStackNavigator = StackNavigator(
  {
    Main: {
      screen: MainTabNavigator,
    },
    Post: {
      screen: PostScreen,
    },
    Comments: {
      screen: CommentsScreen,
    },
    User: {
      screen: UserScreen,
    },
    Tag: {
      screen: HomeScreen,
    },
  },
  {
    navigationOptions: () => ({
      headerStyle: {
        backgroundColor: Colors.primary,
        elevation: 0,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'normal',
      },
    }),
  },
);

export default RootStackNavigator;
