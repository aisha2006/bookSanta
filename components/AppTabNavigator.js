import React, {Component} from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs'
import BookRequestScreen from '../screens/BookRequestScreen'
import BookDonateScreen from '../screens/BookDonateScreen'
import {Image} from "react-native";

export const AppTabNavigator = createBottomTabNavigator({
    BookRequest:{
        screen: BookRequestScreen,
        navigationOptions : {
            tabBarIcon: <Image source = {require("../assets/request-book.png")} style = {{width: 20,height:20}}/>,
            tabBarLabel: "Book Request"
        }
    },
    BookDonate: {
        screen: BookDonateScreen,
        navigationOptions: {
            tabBarIcon: <Image source={require("../assets/request-list.png")} style={{width:20, height:20}}/>,
            tabBarLabel: "Book Donate"
        }
    }
})

