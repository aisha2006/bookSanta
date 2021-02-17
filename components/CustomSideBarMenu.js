import React, {Component} from 'react';
import {StyleSheet,View,Text,TextInput,TouchableOpacity, Alert, Modal, KeyboardAvoidingView,ScrollView,FlatList} from "react-native";
import {DrawerItems} from 'react-navigation-drawer'
import firebase from 'firebase'; 
export default class CustomSideBarMenu extends Component{
    render(){
        return(
            <View style = {{flex: 1}}>
                <View style={styles.drawerItemsContainer}>
                <DrawerItems
                  {...this.props}
                />
                </View>

                <View style={styles.logOutContainer}>
                    <TouchableOpacity 
                    style={styles.logOutButton}
                    onPress={()=>{
                        firebase.auth().signOut()
                        this.props.Navigation.navigate("WelcomeScreen");                    
                    }}>
                        <Text style={styles.logOutText}>log out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    logOutContainer: {
        flex:  0.2,
        justifyContent: "flex-end",
        paddingBottom: 30
    },
    drawerItemsContainer: {
        flex:0.8
    },
    logOutButton: {
        height:30,
        width:"100%",
        justifyContent:"center",
        padding:10
    },
    logOutText: {
        fontSize: 30,
        fontWeight: "bold"
    }
});
