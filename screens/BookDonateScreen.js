import React, {Component} from 'react';
import {StyleSheet,View,Text,TextInput,TouchableOpacity, Alert, Modal, KeyboardAvoidingView,ScrollView,FlatList} from 'react-native';
import {ListItem} from 'react-native-elements'
import db from "../config.js"
import firebase from "firebase";
import MyHeader from "../components/MyHeader";


export default class BookDonateScreen extends Component{
    constructor(){
      super();
      this.state={
          requestedBooksList:[],
      }
      this.requestRef=null;
    }

    getRequestedBooksList=()=>{
     this.requestRef=db.collection('bookRequests').onSnapshot((snapshot)=>{
         var requestedBooksList = snapshot.docs.map(document=> document.data())
         this.setState({requestedBooksList:requestedBooksList});
     })
    }

    componentDidMount(){
        this.getRequestedBooksList();
    }

    keyExtractor=(item,index)=> index.toString();

    renderItem = (item,i)=>{
        return(
            <ListItem
             key={i}
             title={item.book_name}
             subtitle={item.reason_to_request}
             titleStyle={{color:"black",fontWeight:'bold'}}
             rightElement={
                 <TouchableOpacity style={styles.button}>
                     <Text style={{color:"white"}}>View</Text>
                 </TouchableOpacity>
             }
             bottomDivider
            />
        )
    }
    
    render(){
        return(
            <View style = {{flex:1}}>
                <MyHeader
                title="Donate Books"
                />
               <View>
                   {this.state.requestedBooksList===0?
                   ( 
                   <View style={styles.subContainer}>
                     <Text style={{fontSize:20}}>list of all requested books</Text>
                    </View>):
                    (
                        <FlatList
                            data={this.state.requestedBooksList}
                            keyExtractor={this.keyExtractor}
                            renderitem={this.renderItem}
                        />
                    )
                
                }
               </View>
            </View>
        );
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
        
    },
    subContainer: {
        flex: 1,
        fontSize: 20,
        justifyContent: "center",
        alignItems: "center"
    }
});