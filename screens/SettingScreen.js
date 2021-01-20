import React, {Component} from 'react';
import {StyleSheet,View,Text,TextInput,TouchableOpacity, Alert} from 'react-native';
import {MyHeader} from '../components/MyHeader';
import db from '../config';
import firebase from 'firebase';

export default class SettingScreen extends Component{
    constructor(){
        super();
        this.state={
            emailId:"",
            firstName:"",
            lastName:"",
            address: "",
            age: null,
            contact: "",
            docId: ""
        }
    }

    getUserDetails=()=>{
        var user = firebase.auth().currentUser;
        var email = user.email;
        
        db.collection("users").where("emailId","==",email).get()
        .then((snapshot)=>{
           snapshot.forEach(
               (doc)=>{
                  var data=doc.data()
                  this.setState({
                        emailId: data.emailId,
                        firstName:data.first_name,
                        lastName:data.last_name,
                        address: data.address,
                        age: data.age,
                        contact:data.phoneNo,
                        docId: doc.id
                    })
               }
           )
        })
    }

    updateUserDetails=()=>{
        db.collection("users").doc(this.state.docId).update({
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            address: this.state.address,
            phoneNo: this.state.contact,
            age:this.state.age,  
        })

        Alert.alert("profile updated successfully!!")
    }

    componentDidMount(){
        this.getUserDetails();
    }

    render(){
        return(
            <View style={styles.container}>
                <MyHeader
                title="settings"
                navigation={this.props.navigation}
                />

                <View style= {styles.formContainer}>
                    <TextInput
                    style={styles.formTextInput}
                    placeholder={"first name"}
                    maxLength={10}
                    onChangeText={(text)=>{
                        this.setState({firstName:text})
                    }}
                    value = {this.state.firstName}
                    />

                    <TextInput
                    style={styles.formTextInput}
                    placeholder={"last name"}
                    maxLength={10}
                    onChangeText={(text)=>{
                        this.setState({lastName:text})
                    }}
                    value={this.state.lastName}
                    />

                    <TextInput
                    style={styles.formTextInput}
                    placeholder={"abc@gmail.com"}
                    keyboardType={"email-address"}
                    onChangeText={(text)=>{
                        this.setState({emailId:text})
                    }}
                    value={this.state.emailId}
                    />

                    <TextInput
                    style={styles.formTextInput}
                    placeholder={"age"}
                    maxLength={2}
                    onChangeText={(text)=>{
                        this.setState({age:text})
                    }}
                    value = {this.state.age}
                    />


                    <TextInput
                    style={styles.formTextInput}
                    placeholder={"Contact"}
                    maxLength={10}
                    keyboardType={"numeric"}
                    onChangeText={(text)=>{
                        this.setState({contact:text})
                    }}
                    value = {this.state.contact}
                    />

                    <TextInput
                    style={styles.formTextInput}
                    placeholder={"Address"}
                    multiline={true}
                    onChangeText={(text)=>{
                        this.setState({address:text})
                    }}
                    value = {this.state.address}
                    />

                    <TouchableOpacity 
                    style={styles.button}
                    onPress={()=>{this.updateUserDetails()}}
                    >
                        <Text style={styles.buttonText}>confirm</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    formTextInput: {
        width: "75%",
        height:35,
        alignSelf:'center',
        borderColor:'#ffab91',
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        padding:10,
    },
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    formContainer: {
        flex:1,
        width:'100%',
        alignItems: 'center'
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
    },
    buttonText: {
        fontSize:25,
        fontWeight:"bold",
        color:"#fff"
    }
});