import React, { Component } from 'react';
import * as firebase from 'firebase';
import {AppBar,IconButton,IconMenu,MenuItem} from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import '../firebase/firebase';
import CurrentUser from './currentUser';
import ChatList from './chatList';
import ChatBubble from 'react-chat-bubble';


class Dashboard extends Component {
    constructor() {
        super();
        this.userDisplay = this.userDisplay.bind(this)
        this.state = {
            logged: true,
            userChatDis:false,
            userIndex:'',
            userProps:'',
            getMessage:[],
            name:'',
            displayArray:[]
        }
    }
    
    
      handleChange = (event, logged) => {
        this.setState({logged: logged});
      };
    
    logOut() {
        firebase.auth().signOut();
        this.props.history.push('/')
    }
  componentWillMount() {
      if(firebase.auth().currentUser != null) {
        localStorage.setItem("user",firebase.auth().currentUser.email)  
      }
  }
  userDisplay(index,getProps) {
    this.setState({userChatDis:true,name:getProps.state.name[index],userIndex:index,userProps:getProps})
     let ref = firebase.database().ref().child(`chat/${localStorage.getItem("uid")}/${getProps.state.iValue[index]}`)
    ref.on('value',snap => {
        if(snap.val() === null) {
          this.setState({getMessage:[]})
        } else {

            let disArray = []
            Object.values(snap.val()).map((value,index) => {
                if(value.text.user === localStorage.getItem('user')) {
                    let data = {
                        "type" : 1,
                        "text": value.text.text
                    }
                    disArray.push(data)
                } else {
                    let data = {
                        "type":0,
                        "text": value.text.text
                    }
                    disArray.push(data)
                }
                
            })
            this.setState({getMessage:disArray})
        }
        
    })
  
  }
  saveMessageFirebase(getmessage) {

               let data = {
                   "text":getmessage,
                   "user":firebase.auth().currentUser.email
               }
      firebase.database().ref().child(`chat/${localStorage.getItem("uid")}/${this.state.userProps.state.iValue[this.state.userIndex]}`).push({"text":data})
      firebase.database().ref().child(`chat/${this.state.userProps.state.iValue[this.state.userIndex]}/${localStorage.getItem("uid")}`).push({"text":data})
      
    }

  trueState() {
    const styles = {
        chatlist: {
             width:250,
            border: '5px solid #FF8970'
        },
        appBar: {
           width:800,
           position:'relative',
           left:400,
           bottom:60
        },
        chatBubble: {
            height:400,
            
        }
    }
 
     return (
         <div>
        <div style={styles.chatlist}>
        <ChatList toggle={this.userDisplay}/>
        </div >
        <div style={styles.appBar} >
        <AppBar  title={this.state.name} showMenuIconButton={false} />
        <div id="chat" style={styles.chatBubble} ref="div">
        <ChatBubble  messages= {this.state.getMessage}  onClick={() => console.log('this')} onNewMessage={(e) => this.saveMessageFirebase(e)}/>
        </div>
        </div>
        </div>
     )
  }
  falseState() {
    const styles = {
        chatlist: {
            width:250,
            position:'relative',
            bottom:150,
            border: '5px solid #FF8970'
        }
    }
     return (
         <div>
        <CurrentUser/>
        <div style={styles.chatlist}>
        <ChatList  toggle={this.userDisplay}/>
</div>
</div>
     )
  }

     render() {
        
        const Logged = (props) => (
            <IconMenu
              {...props}
              iconButtonElement={
                <IconButton><MoreVertIcon /></IconButton>
              }
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
              <MenuItem primaryText="Sign out" onClick={() => this.logOut()} />
            </IconMenu>
          );
          
          Logged.muiName = 'IconMenu';




        return (
            <div>
        <AppBar
          title="Chat App"
          showMenuIconButton={false}
          iconElementRight={this.state.logged ? <Logged /> : ""}
        />
  
        <section>
            {
                this.state.userChatDis ? this.trueState() : this.falseState()
            }
        </section>
            </div>
        )
    }
}


export default Dashboard;