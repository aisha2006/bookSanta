import React, {Component} from 'react';
import {View,Text,Animated, StyleSheet,Dimensions} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {ListItem, Icon} from "react-native-elements";
import db from "../config";
import { Dimensions } from 'react-native';

export default class SwipeableFlatlist extends Component{
    constructor(props){
        super(props);
        this.state={
            allNotifications:this.props.allNotifications
        }
    }

    updateMarkAsRead=(notification)=>{
        db.collection("notifications").doc(notification.doc_id).update({
            status:"read"
        })
    }

    onSwipeValueChange=(swipeData)=>{
        var allNotifications = this.state.allNotifications;
        const {key,value} = swipeData;
        if(value<-Dimensions.get("window").width){
           const newData = [...allNotifications] 
           const prevIndex = allNotifications.findIndex((item)=>{item.key===key})
           this.updateMarkAsRead(allNotifications[prevIndex])
            //Removing prevIndex from all notification
           newData.splice(prevIndex, 1)
           this.setState({allNotifications:newData});
        }
    }

    renderHiddenItem=()=>{
        <View style={styles.rowBack}>
           <View style={[styles.backRightButton,styles.backRightButtonRight]}>
             <Text style={styles.backTextWhite}>Mark as read</Text>
           </View>      
        </View>
         
    }
    
    renderItem = (data)=>{
        return(
            <Animated.View>
            <ListItem
            leftElement={
                <Icon
                name="book"
                type="font-awesome"
                colour="#696969"
                />
            }
             title={data.item.book_name}
             subtitle={data.item.message}
             titleStyle={{color:"black",fontWeight:'bold'}}
             bottomDivider
            
            />
            </Animated.View>
        ) 
    }
    
  render(){
      return(
          <View style={styles.container}>
              <SwipeListView
              data={this.state.allNotifications}
              renderItem={this.renderItem}
              renderHiddenItem={this.renderHiddenItem}
              onSwipeValueChange={this.onSwipeValueChange}
              rightOpenValue={-Dimensions.get("window").width}
              disableRightSwipe
              previewRowKey={"0"}
              previewOpenValue={-40}
              previewOpenDelay={3000}
              />
          </View>
      )
  }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1
    },
    backTextWhite: {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 15,
        textAlign: "center",
        alignSelf: "flex-start"
      }, 
      backRightButton: {
        alignItems: "center",
        bottom: 0,
        justifyContent: "center",
        position: "absolute",
        top: 0,
        width: 100
      },
      backRightButtonRight: {
        backgroundColor: "#29b6f6",
        right: 0
      },
      rowBack: {
        alignItems: "center",
        backgroundColor: "#29b6f6",
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 15
      },
});