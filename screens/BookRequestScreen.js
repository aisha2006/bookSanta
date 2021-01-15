import React, {Component} from 'react';
import {StyleSheet,View,Text,TextInput,TouchableOpacity, Alert, KeyboardAvoidingView} from 'react-native';
import MyHeader from '../components/MyHeader'
import db from "../config";
import firebase from "firebase";


export default class BookRequestScreen extends Component{
    constructor(){
        super();
        this.state={
            bookName:"",
            reasonToRequest:"",
            userId:firebase.auth().currentUser.email
        }
    }

    createUniqueId(){
       return Math.random().toString(36);
    }

    addRequest=(bookName,reasonToRequest)=>{
        var randomRequestId = this.createUniqueId();
        var userId = this.state.userId;
        db.collection("bookRequests").add({
            "user_id": userId,
            "book_name":bookName,
            "reason_to_request":reasonToRequest,
            "request_id": randomRequestId
        })
        this.setState({bookName:"",reasonToRequest:""});
        
        return Alert.alert("request submitted!");
        
    }
    
    render(){
        return(
            <View style = {{flex:1}}>
                <MyHeader
                title="Request Book"
                />

                <KeyboardAvoidingView>
                    <TextInput
                    style={styles.formTextInput}
                    placeholder="enter Book Name"
                    onChangeText={(text)=>this.setState({bookName:text})}
                    value = {this.state.bookName}
                    />

                   <TextInput
                    style={styles.formTextInput}
                    multiline
                    numberOfLines={5}
                    placeholder="why do you need the book?"
                    onChangeText={(text)=>this.setState({reasonToRequest:text})}
                    value = {this.state.reasonToRequest}
                    />

                    <TouchableOpacity
                     style={styles.button}
                     onPress={()=>{this.addRequest(this.state.bookName,this.state.reasonToRequest)}}
                    >
                        <Text>Request</Text>
                    </TouchableOpacity>
                    
                </KeyboardAvoidingView>                
            </View>
        )
    }
} 

const styles = StyleSheet.create({
    formTextInput: {
        width:"75%",
        height:35,
        alignSelf:'center',
        borderColor:'#ffab91',
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        padding:10,
    },
    button: {
         width:"75%",
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        backgroundColor:"#ff5722",
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
        marginTop:20
    }
});