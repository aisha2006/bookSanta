import React, {Component} from 'react';
import {StyleSheet,View,Text,TouchableOpacity,FlatList,ScrollView} from 'react-native';
import {ListItem,Icon} from 'react-native-elements'
import MyHeader from '../components/MyHeader';
import db from "../config";
import firebase from "firebase";

export default class MyDonationsScreen extends Component{
    constructor(){
        super();
        this.state={
            all_donations:[],
            user_id:firebase.auth().currentUser.email,
            donorName:""         
        }
        this.requestRef=null
    }    

    getAllDonations=()=>{
       this.requestRef = db.collection("all_donations").where("donor_id","==",this.state.user_id).onSnapshot(
           (snapshot)=>{
              var all_donations=snapshot.docs.map(
                  (document)=>document.data()
              );
              this.setState({all_donations:all_donations});
           }
       )
    }

    componentDidMount(){
        this.getAllDonations()
    }
    keyExtractor=(item,index)=> index.toString();

    renderItem = (item,i)=>{
        return(
            <ListItem
             key={i}
             title={item.book_name}
             subtitle={"Requested by: " + item.requested_by +"\nStatus: "+ item.request_status}
             titleStyle={{color:"black",fontWeight:'bold'}}
             leftElement={
                 <Icon
                 name="book"
                 type="font-awesome"
                 color="#696969"
                 />
             }
             rightElement={
                 <TouchableOpacity 
                style={[styles.button, {backgroundColor:item.request_status==="Book Sent"?"green":"#ff5722"}]}
                onPress={()=>{       
                    this.sendBook(item)
                }}
                >
                     <Text style={{color:"white"}}>{item.request_status==="Book Sent"?"book sent":"send book"}</Text>
                 </TouchableOpacity>
             }
             bottomDivider
            />
        )
    }

    sendNotification=(bookDetails,requestStatus)=>{
      var requestId=bookDetails.request_id;
      var donorId=bookDetails.donor_id;
      db.collection("notifications")
      .where("request_id","==",requestId)
      .where("donor_id","==",donorId)
      .get()
      .then(
          (snapshot)=>{
              snapshot.forEach(
                  (doc)=>{
                     var message="";
                     if(requestStatus==="Book Sent"){
                         message = this.state.donorName+" sent you the book";
                     }

                     else{
                         message=this.state.donorName+" has shown interest in donating"
                     }
                     db.collection("notifications").doc(doc.id).update({
                        notification_message:message,
                        status:"unread",
                        date:firebase.firestore.FieldValue.serverTimestamp()
                     })
                  }
              )
            }
          )
        
      ;
    }
    
    sendBook=(bookDetails)=>{
       if(bookDetails_status==="Book Sent"){
           var requestStatus = "Donor Interested";
           db.collection("all_donations").doc(bookDetails.doc_id).update({
               request_status:request_status
           })
           this.sendNotification(bookDetails,requestStatus);
       }

       else{
        var requestStatus = "Book Sent";
        db.collection("all_donations").doc(bookDetails.doc_id).update({
            request_status:request_status
        })
        this.sendNotification(bookDetails,requestStatus);
       }
    }
   
    render(){
        return(
            <View style={{flex:1}}>
              <MyHeader
              navigation={this.props.navigation}
              title="My donations"
              />
                
              <View style={{flex:1}}>
                  {
                    this.state.all_donations.length===0
                    ?(
                    <View style={styles.subtitle}><Text style={{fontSize:20}}>List of all book donations</Text></View>
                    )
                    :(<FlatList
                    keyExtractor={this.keyExtractor}
                    data={this.state.all_donations}
                    renderItem={this.renderItem}
                    />)
                  
                  }
              </View>
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    button: {
        width: 100,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ff5722",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8
          },
         elevation : 16
        
    },
    subtitle: {
        flex: 1,
        fontSize: 20,
        justifyContent: "center",
        alignItems:"center"
    }
});