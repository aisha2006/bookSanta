import React, {Component} from 'react';
import {StyleSheet,View,Text,TextInput,Touchableopacity, Alert} from 'react-native';
import firebase from 'firebase';
import db from '../config.js'

export default class WelcomeScreen extends Component{
    constructor(){
        super();
        this.state={
            emailId:"",
            password:""
        }
    }

    userSignUp=(email,password)=>{
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then((response)=>{
            return Alert.alert("User added successfully!!")
        })
        .catch(
          ()=>{
              var errorCode=error.code;
              var errorMessage=error.message;
              return Alert.alert(errorMessage);            
          }
        );
    }

    userLogin=(email,password)=>{
        firebase.auth().signInWithEmailAndPassword(email,password)
        .then(()=>{
            return Alert.alert("Logged in successfully!!")
        })
        .catch(
          ()=>{
              var errorCode=error.code;
              var errorMessage=error.message;
              return Alert.alert(errorMessage);            
          }
        );
    }
    
    render(){
        return(
            <View style={styles.container}>
                <View>
                    <Text style={styles.text}>Book Santa</Text>
                </View>
                <View>
                  <TextInput
                    style={styles.loginBox}
                    placeholder={"abc@mail.com"}
                    keyboardType="email-address"
                    onChangeText={(text)=>{
                        this.setState({emailId:text})
                    }}
                  />

                  <TextInput
                    style={styles.loginBox}
                    placeholder={"enter password"}
                    secureTextEntry={true}
                    onChangeText={(text)=>{
                        this.setState({password:text})
                    }}
                  />

                  <TouchableOpacity
                   style={styles.button}
                   onPress={()=>{this.userLogin(this.state.emailId,this.state.password)}}>
                      <Text style = {styles.buttonText}>Login</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                   style={styles.button}
                   onPress={()=>{this.userSignUp(this.state.emailId,this.state.password)}}>
                      <Text style = {styles.buttonText}>SignUp</Text>
                  </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"light-blue",
    },
    title: {
        fontSize: 65,
        fontWeight: '300',
        color: "#ff3d00"
    },
    loginBox: {
        width:300,
        height:40,
        borderColor:"black",
        borderBottomWidth:1.5,
        fontSize: 20,
        margin: 10,
        paddingLeft: 10
    },
    button:{
        width:300,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:25,
        backgroundColor:"#ff9800",
        shadowColor: "#000",
        shadowOffset: {
           width: 0,
           height: 8,
        },
        shadowOpacity: 0.30,
        shadowRadius: 10.32,
        elevation: 16,
    }
});

/*
this.title
this.input - name
this.button - play state

//form - this
this.button.mousePressed(
    function(){
        statement1;
        statement2;
        this.x;
    }
);
Binds the "this" to the root/original object that calls the function
*/