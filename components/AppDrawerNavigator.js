import React, {Component} from 'react';
import {StyleSheet,View,Text,TextInput,TouchableOpacity, Alert, Modal, KeyboardAvoidingView,ScrollView,FlatList} from 'react-native';
import {createDrawerNavigator} from 'react-navigation-drawer';
import AppTabNavigator from './AppTabNavigator';
import CustomSideBarMenu from './CustomSideBarMenu';
import SettingScreen from "../screens/SettingScreen";
import MyDonationsScreen from '../screens/MyDonationsScreen'
import NotificationScreen from "../screens/NotificationScreen"
export const AppDrawerNavigator = createDrawerNavigator(
    {
        Home:{screen:AppTabNavigator},
        MyDonations:{screen:MyDonationsScreen},
        Notifications:{screen:NotificationScreen},
        Setting:{screen:SettingScreen},

    },
    {contentComponent:CustomSideBarMenu },
    {initialRouteName:"Home"}
)