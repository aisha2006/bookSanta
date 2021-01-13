import React, {Component} from 'react';
import {StyleSheet,View,Text,TextInput,TouchableOpacity, Alert, Modal, KeyboardAvoidingView,scrollView} from 'react-native';
import firebase from 'firebase';
import db from '../config.js'
import SantaAnimation from '../components/SantaClaus'

export default class WelcomeScreen extends Component{
    constructor(){
        super();
        this.state={
            emailId:"",
            password:"",
            isModalVisible: false,
            confirmPassword: "",
            firstName: "",
            lastName: "",
            address: "",
            contact: "",
            age: null
        }
    }

    userSignUp=(email,password,confirmPassword)=>{
        if(password!==confirmPassword){
           return Alert.alert("Passowrds don't match\nCheck your password");
        }
        else{
            firebase.auth().createUserWithEmailAndPassword(email,password)
            .then(()=>{
                db.collection("users").add({
                    "first_name":this.state.firstName,
                    "last_name":this.state.lastName,
                   "contact":this.state.contact,
                   "age":this.state.age,
                   "emailId":this.state.emailId,
                   "address":this.state.address,
                })
                return Alert.alert("User added successfully!!",
                '',
                [
                  {
                      text:"ok",
                      onPress: ()=>this.setState({isModalVisible:false})
                  }
                ]);
            })
            .catch(
            ()=>{
                var errorCode=error.code;
                var errorMessage=error.message;
                return Alert.alert(errorMessage);            
            }
            );
        }
        

       
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

    showModal=()=>{
        return(
            <Modal
             animationType="fade"
             transparent={true}
             visible={this.state.isModalVisible}
            >

                <View>
                    <ScrollView>
                        <KeyboardAvoidingView>
                            <Text>Registration form</Text>
                            <TextInput
                            style={style.formTextInput}
                            placeholder={"first name"}
                            maxLength={10}
                            onChangeText={(text)=>{this.setState({firstName:text})}}
                            />

                            <TextInput
                            style={style.formTextInput}
                            placeholder={"last name"}
                            maxLength={10}
                            onChangeText={(text)=>{this.setState({lastName:text})}}
                            />

                            <TextInput
                            style={style.formTextInput}
                            placeholder={"Contact"}
                            maxLength={10}
                            keyboardType={"numeric"}
                            onChangeText={(text)=>{this.setState({contact:text})}}
                            />

                            <TextInput
                            style={style.formTextInput}
                            placeholder={"Age"}
                            maxLength={2}
                            keyboardType={"numeric"}
                            onChangeText={(text)=>{this.setState({age:text})}}
                            />

                            <TextInput
                            style={style.formTextInput}
                            placeholder={"Address"}
                            multiline={true}
                            onChangeText={(text)=>{this.setState({address:text})}}
                            />

                            <TextInput
                            style={style.formTextInput}
                            placeholder={"E-mail ID"}
                            keyboardType={"email-address"}
                            onChangeText={(text)=>{this.setState({emailId:text})}}
                            />

                            <TextInput
                            style={style.formTextInput}
                            placeholder={"Password"}
                            secureTextEntry={true}
                            onChangeText={(text)=>{this.setState({password:text})}}
                            />

                            <TextInput
                            style={style.formTextInput}
                            placeholder={"Confirm Password"}
                            secureTextEntry={true}
                            onChangeText={(text)=>{this.setState({confirmPassword:text})}}
                            />
                            
                            <View>
                                <TouchableOpacity 
                                style={styles.registerButton}
                                onPress={this.userSignUp(this.state.emailId,this.state.password,this.state.confirmPassword)}>
                                    <Text style = {styles.registerButtonText}>
                                        Register
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <View>
                                <TouchableOpacity
                                style={style.registerButton}
                                onPress={()=>{this.setState({isModalVisible:false})}}>
                                    <Text style={styles.registerButton}>cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </Modal>
        );
    }
    
    render(){
        return(
            <View style={styles.container}>
             {this.showModal()}
                <View style={{justifyContent:"center",alignItems:"center"}}>
                    <SantaAnimation/>
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
    },
    formTextInput: {
        width:"75%",
        height:35,
        alignSelf:'center',
        borderColor:'#ffab91',
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        padding:10
    },
    registerButton:{
        width:200,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        borderWidth:1,
        borderRadius:10,
        marginTop:30
      },
      registerButtonText:{
        color:'#ff5722',
        fontSize:15,
        fontWeight:'bold'
      },
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