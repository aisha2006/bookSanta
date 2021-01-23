import React, {Component} from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import RecieverDetailsScreen from '../screens/RecieverDetailsScreen'; 
import BookDonateScreen from "../screens/BookDonateScreen";

export const AppStackNavigator = createStackNavigator(
{
    BookDonateList: {
        screen:BookDonateScreen,
        navigationOptions:{headerShown:false}
    },
    ReceiverDetails: {
        screen:RecieverDetailsScreen,
        navigationOptions:{headerShown:false}
    }
},

{
    initialRouteName: "BookDonateList"
}
);