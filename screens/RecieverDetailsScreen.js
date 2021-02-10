import React, {Component} from 'react';
import {StyleSheet,View,Text,TextInput,TouchableOpacity, Alert, Modal, KeyboardAvoidingView} from 'react-native';
import db from "../config";
import firebase from "firebase";
import {Card,Header} from 'react-native-elements';

export default class RecieverDetailsScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            userId:firebase.auth().currentUser.email,
            userName:"",
            receiverId:this.props.navigation.getParam("details")["user_id"],
            requestId:this.props.navigation.getParam("details")["request_id"],
            bookName:this.props.navigation.getParam("details")["book_name"],
            reason_to_request:this.props.navigation.getParam("details")["reason_to_request"],
            receiverName:"",
            receiverContact:"",
            receiverAddress:"",
            recieverRequestDocId:"",
        }
    }


    getRecieverDetails(){
       db.collection("users").where("email_id","==",this.state.receiverId).get()
       .then((snapshot)=>{snapshot.forEach((doc)=>{
           this.setState({
               recieverName:doc.data().first_name,
               recieverContact:doc.data().phoneNo,
               receiverAddress:doc.data().address
           })
       })});
       
       db.collection("bookRequests").where("request_id","==",this.state.requestId).get()
       .then((snapshot)=>{snapshot.forEach((doc)=>{
        this.setState({recieverRequestDocId:doc.id})
    })})
}

    updateBookStatus=()=>{
        db.collection("all_donations").add({
            book_name: this.state.bookName,
            request_id: this.state.requestId,
            requested_by:this.state.recieverName,
            donor_id: this.state.userId,
            request_status: "Donor Interested"
        })
    }

    componentDidMount(){
        this.getRecieverDetails();
    }

    addNotifications=()=>{
        var message = this.state.userName+" has shown interest in donating the book";
        db.collection("notifications").add({
         book_name: this.state.bookName,
         target_user_id: this.state.recieverId,
         donor_id:this.state.userId,
         request_id:this.state.requestId,
         data:firebase.firestore.FieldValue.serverTimestamp(),
         status:"unread",
         notification_message:message
        })
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={{flex: 0.1}}>
                    <Header
                    leftComponent={}
                    centerComponent={{text:"donate Books",style:{color:"white",fontSize:20,fontWeight:"bold"}}}
                    backgroundColor="orange"
                    />
                </View >
                
                <View style={{flex:0.3}}>
                    <Card
                    title={"book information"}
                    titleStyle={{fontSize:20}}
                    >
                    <Card>
                        <Text style={{fontWeight:20}}>Name: {this.state.bookName}</Text>
                    </Card>

                    <Card>
                        <Text style={{fontWeight:20}}>Reason: {this.state.reason_to_request}</Text>
                    </Card>
                    
                    
                    </Card>
                    
                </View>

                <View style={{flex:0.3}}>
                    <Card
                    title={"reciever information"}
                    titleStyle={{fontSize:20}}
                    >
                    <Card>
                        <Text style={{fontWeight:20}}>Name: {this.state.receiverName}</Text>
                    </Card>

                    <Card>
                        <Text style={{fontWeight:20}}>Contact: {this.state.recieverContact}</Text>
                    </Card>

                    <Card>
                        <Text style={{fontWeight:20}}>Address: {this.state.receiverAddress}</Text>
                    </Card>
                    
                    </Card>
                    
                </View>

                <View style={styles.buttonContainer}>
                    {
                        this.state.recieverId!==this.state.userId
                        ?(
                        <TouchableOpacity
                        style={styles.button}
                        onPress={()=>{
                            this.updateBookStatus();
                            this.addNotifications();
                            this.props.navigation.navigate("MyDonations");
                            }}
                        >
                            <Text>I want to donate</Text>
                        </TouchableOpacity>
                        ): null
                    }
                </View>
                
                 
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    buttonContainer : {
        flex:0.3,
        justifyContent:'center',
        alignItems:'center'
      },
      button:{
        width:200,
        height:50,
        justifyContent:'center',
        alignItems : 'center',
        borderRadius: 10,
        backgroundColor: 'orange',
        shadowColor: "#000",
        shadowOffset: {
           width: 0,
           height: 8
         },
        elevation : 16
      }
});