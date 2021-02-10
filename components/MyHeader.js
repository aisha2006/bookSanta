import React, {Component} from 'react';
import {View,Text} from 'react-native';
import {Header,Icon,Badge} from 'react-native-elements';
import db from '../config';

export default class MyHeader extends Component{
    constructor(props){
        super(props);
        this.state={
            value=""
        }
    }
    getNumberofUnreadNotifications=()=>{
        db.collection("notifications")
        .where('status','==','unread')
        .onSnapshot(
            (snapshot)=>{
                var unreadNotifications= snapshot.docs.map((doc)=>{
                    doc.data()
                })
                this.setState({value:unreadNotifications.length()})
            }
        )
    }

    componentDidMount(){
        this.getNumberofUnreadNotifications();
    }

    BellIconWithBadge=()=>{
        return(
            <View>
                
                <Icon
                    name="bell"
                    type="font-awesome"
                    color="#696969"
                    size={25}
                    onPress={()=>{
                        props.navigation.navigate("Notifications")
                    }}
                />
    
                <Badge
                   value={this.state.value}
                   containerStyle={
                       {position:'absolute',top:-4,right:-4}
                    }
                />
            </View>
        )
    }
    render(){
        return(
            <Header
            leftComponent={
            <
            Icon
            color="#696969"
            name="bars"
            type="font-awesome"
            onPress={()=>{
                props.navigation.toggleDrawer()
            }}
            />
            }
            centerComponent={{text:props.title,style: {color:'white',fontSize:20,fontWeight:'bold'}}}
            rightComponent={
                <this.BellIconWithBadge {...props}/>
               }
                backgroundColor= "#eaf8fe"
            />
        )
    }
}




export default MyHeader;
