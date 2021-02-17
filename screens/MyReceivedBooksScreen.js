import React, {Component} from 'react';
import {StyleSheet,View,Text,TouchableOpacity,FlatList} from 'react-native';
import {ListItem} from 'react-native-elements'
import db from "../config.js"
import firebase from "firebase";
import MyHeader from "../components/MyHeader";


export default class MyReceivedBooksScreen extends Component{
    constructor(){
      super();
      this.state={
          receivedBooksList:[],
          userId:firebase.auth().currentUser.email
      }
      this.requestRef=null;
    }

    getReceivedBooksList=()=>{
     this.requestRef=db.collection('bookRequests')
     .where("user_id","==",this.state.userId)
     .where("book_status", "==", "received")
     .onSnapshot((snapshot)=>{
         var receivedBooksList = snapshot.docs.map(document=> document.data())
         this.setState({receivedBooksList:receivedBooksList});
     })
    }

    componentDidMount(){
        this.getReceivedBooksList();
    }

    componentWillUnmount(){
        this.requestRef();
    }

    keyExtractor=(item,index)=> index.toString();

    renderItem = ({item,i})=>{
        return(
            <ListItem
             key={i}
             title={item.book_name}
             subtitle={item.reason_to_request}
             titleStyle={{color:"black",fontWeight:'bold'}}
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
                   {this.state.receivedBooksList.length===0?
                   ( 
                   <View style={styles.subContainer}>
                     <Text style={{fontSize:20}}>list of all received books</Text>
                    </View>):
                    (
                        <FlatList
                            data={this.state.receivedBooksList}
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