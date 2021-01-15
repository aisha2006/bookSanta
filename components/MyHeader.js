import React, {Component} from 'react';
import {StyleSheet,View,Text,TextInput,TouchableOpacity, Alert, Modal, KeyboardAvoidingView,ScrollView} from 'react-native';
import {Header} from 'react-native-elements';

const MyHeader = (props)=>{
    return(
        <Header
        centerComponent={{text:props.title,style: {color:'white',fontSize:20,fontWeight:'bold'}}}
        backgroundColor= "orange"
        />
    )
}

export default MyHeader;
