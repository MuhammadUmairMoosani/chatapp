import React,{ Component } from 'react';
import {ListItem} from 'material-ui';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';



class ChatItems extends Component {
    render() {
        return(
               
            <div>
        <ListItem primaryText={this.props.state.name[this.props.index]} leftIcon={<CommunicationChatBubble />} onClick={() => this.props.toggle(this.props.index,this.props)}/> 
        </div>
        )
    }
}

export default ChatItems;