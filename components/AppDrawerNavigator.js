import React, {Component} from 'react';
import {StyleSheet,View,Text,TextInput,TouchableOpacity, Alert, Modal, KeyboardAvoidingView,ScrollView,FlatList} from 'react-native';
import {createDrawerNavigator} from 'react-navigation-drawer';
import AppTabNavigator from './AppTabNavigator';
import CustomSideBarMenu from './CustomSideBarMenu';

export const AppDrawerNavigator = createDrawerNavigator(
    {Home:{screen:AppTabNavigator}},
    {contentComponent:CustomSideBarMenu },
    {initialRouteName:"Home"}
)