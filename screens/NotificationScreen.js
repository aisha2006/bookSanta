import React, {Component} from 'react';
import {StyleSheet,View,Text,TextInput,TouchableOpacity, Alert, KeyboardAvoidingView, FlatList,Icon} from 'react-native';
import {ListItem} from "react-native-elements"
import MyHeader from '../components/MyHeader'
import db from "../config";
import firebase from "firebase";
import SwipeableFlatlist from '../components/SwipeableFlatlist';


export default class NotificationScreen extends Component{
    constructor(props){
       super(props);
       this.state={
           user_id:firebase.auth().currentUser.email,
           allNotifications: []
       }
       this.notificationRef=null;
    }
    getNotifications=()=>{
        this.notificationRef = db.collection('notifications')
        .where("status","==","unread")
        .where("target_user_id","==",this.state.user_id)
        .onSnapshot(
            (snapshot)=>{
                 var allNotifications = [];
                 snapshot.docs.map(
                     (doc)=>{
                       var notification = doc.data();
                       notification["doc_id"]=doc.id;
                       allNotifications.push(notification);
                     })
                     this.setState({allNotifications:allNotifications})
            }
        )
    }
    componentDidMount(){
        this.getNotifications();
    }
    keyExtractor=(item,index)=> index.toString();

    renderItem = (item,i)=>{
        return(
            <ListItem
             key={i}
             title={item.book_name}
             subtitle={item.message}
             titleStyle={{color:"black",fontWeight:'bold'}}
             leftElement={
                 <Icon
                 name="book"
                 type="font-awesome"
                 color="#696969"
                 />
             }
             bottomDivider
            />
            )}
    render(){
        return(
                <View style= {{flex: 1}}>
                    <View style= {{flex: 0.1}}>
                        <MyHeader
                        navigation={this.props.navigation}
                        title="Notifications"
                        />
                    </View>
                    <View style= {{flex: 0.9}}>
                        {this.state.allNotifications.length===0?
                        (<View style = {{flex: 1, justifyContent: "center", alignItems: "center"}}>
                            <Text style={{fontSize:25}}>
                               You have no notification 
                            </Text>
                         </View>)
                         :(<SwipeableFlatlist
                            allNotifications = {this.state.allNotifications}
                         />)}
                        
                    </View>
                </View>
        )
    }

}

