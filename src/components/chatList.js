import React, {Component} from 'react';
import * as firebase from 'firebase';
import '../firebase/firebase';
import ChatItems from './chatItems';
import {List} from 'material-ui/List';






class ChatList extends Component {
    constructor() {
        super();
        this.state = {
            email:[],
            name:[],
            iValue:[],
            message:[],
        }

    }
    componentWillMount() {
      let ref = firebase.database().ref().child('user');
      ref.on('value',snap => {
          let value = snap.val();
          let temEmail = [];
          let temName = [];
          let temIValue = [];
          let temMessage = []
        

              for(let i in value) {       
                  if(value[i].email === localStorage.getItem('user')) {
                      localStorage.setItem("uid",i)
                  } else {
                  temEmail.push(value[i].email);
                  temName.push(value[i].name);
                  temIValue.push(i);
                  temMessage.push(value[i].message)
                }
              }
          
          this.setState({email:temEmail,name:temName,iValue:temIValue,message:temMessage});
         
        })
    }
    render() { 
        
        return(
            <List>
                {
                    this.state.email.map((value,index) =>  {
                        return (
                            <div key={index}>
                        <ChatItems index={index} state={this.state} toggle={this.props.toggle}/>
                        </div>
                        )
                      
                    })
                }
                

            </List>
        )
    }
}

export default ChatList;