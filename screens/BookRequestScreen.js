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
            requestedBookName:"",
            reasonToRequest:"",
            userId:firebase.auth().currentUser.email,
            isBookRequestActive: "",
            bookStatus: "",
            requestId: "",
            userDocId: "",
            docId:""
        }
    }

    createUniqueId(){
       return Math.random().toString(36);
    }

    addRequest=async (bookName,reasonToRequest)=>{
        var randomRequestId = this.createUniqueId();
        var userId = this.state.userId;
        db.collection("bookRequests").add({
            "user_id": userId,
            "book_name":bookName,
            "reason_to_request":reasonToRequest,
            "request_id": randomRequestId,
            "book_status": "requested",
            "date": firebase.firestore.FieldValue.serverTimestamp()
        })

        await this.getBookRequest();

        db.collection("users").where("emailId","==",userId).get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
               db.collection("users").doc(doc.id).update({
                   isBookRequestActive:true
               })
            })
        })

        this.setState({bookName:"",reasonToRequest:"", requestId:randomRequestId});
        
        return Alert.alert("request submitted!");
        
    }

    receivedBooks = (bookName)=>{
        var requestId = this.state.requestId;
        var userId = this.state.userId;
        db.collection("received_books").add({
            user_id: userId,
            request_id: requestId,
            book_name: bookName,
            book_status: "received"
        })
    }


    getIsBookRequestActive(){
       db.collection("users").where("emailId","==",this.state.userId).onSnapshot((snapshot)=>{
          snapshot.forEach((doc)=>{
              this.setState({
                  isBookRequestActive:doc.data().isBookRequestActive,
                  userId:doc.id
                })

          })
       })
    }
    
    getBookRequest =()=>{
        var requestedBooks = db.collection("bookRequests").where("user_id","==",this.state.userId).get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
               if(doc.data().book_status!=="recieved"){
                   this.setState({
                      requestId: doc.data().request_id,
                      requestedBookName: doc.data().book_name,
                      bookStatus: doc.data().book_status,
                      docId: doc.id
                    }) 
               }
            })
        })
    }

    sendNotification=()=>{
        db.collection("users").where("emailId","==",this.state.userId).get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                var firstName = doc.data().first_name
                var lastName = doc.data().last_name
                db.collection("notifications").where("request_id","==",this.state.requestId).get()
                .then((snapshot)=>{
                    snapshot.forEach((doc)=>{
                        var donorId = doc.data().donor_id
                        var bookName = doc.data().book_name
                        db.collection("notifications").add({
                            targeted_user_id: donorId,
                            message: firstName + " " + lastName + " has received the book "  + bookName,
                            status: "unread",
                            book_name: bookName
                        })
                    })
                })
            })
        })
    }

    componentDidMount(){
        this.getBookRequest()
        this.getIsBookRequestActive()
    }

    updateBookRequestStatus = ()=>{
        db.collection("requested_books").doc(this.state.docId).update({
            book_status:"received"
        })

        db.collection("users").where("emailId","==",this.state.userId).get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                db.collection("users").doc(doc.id).update({
                   isBookRequestActive:false
                })
            })
        })}

    
    render(){
        if(this.state.isBookRequestActive===true){
           return(
               <View style = {{flex: 1, justifyContent: "center"}}>
                   <View style = {{borderColor: "orange", borderWidth: 2, justifyContent: "center", alignItems: "center", padding: 10, margin: 10}}>
                       <Text>Book Name</Text>
                       <Text>{this.state.requestedBookName}</Text>
                    </View >

                    <View style = {{borderColor: "orange", borderWidth: 2, justifyContent: "center", alignItems: "center", padding: 10, margin: 10}}>
                        <Text>Book Status</Text>
                        <Text>{this.state.book_status}</Text>
                    </View>

                    <View>
                        <TouchableOpacity 
                        style={{borderWidth: 1, borderColor: "orange", backgroundColor: "orange", width: 300, alignSelf: "center", alignItems: "center", height: 30, marginTop: 30}}
                        onPress={()=>{
                            this.sendNotification();
                            this.updateBookRequestStatus();
                            this.receivedBooks(this.state.requestedBookName);
                        }}
                        >
                            <Text>I recieved the book</Text>
                        </TouchableOpacity>
                    </View>
               </View>
           )
        }

        else{
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