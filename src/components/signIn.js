import React, { Component } from 'react';
import '../App.css';
import {AppBar,TextField,RaisedButton} from 'material-ui';
import {Link } from 'react-router-dom';
import * as firebase from 'firebase';
import '../firebase/firebase';
import { RingLoader } from 'react-spinners';

class SignIn extends Component {
    constructor() {
        super();
        this.state = {
            email:'',
            pass:'',
            loading: false
           
        }
    }
    
    SignInFunc() {
        this.setState({loading:true})
        const promise = firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.pass);
        promise.catch(e => {alert(e.message),this.setState({loading:false})})
        promise.then(() => {this.setState({loading:false}), this.props.history.push('/dashboard')})
    
        this.setState({email:'',pass:''})
    
    }
    falseState() {
        const styles = {
            SignInBar: {
                width:300,
                margin: '0 auto',
                marginTop:100,
            },
            SignInBtn: {
                marginBottom:20,
                marginTop:50
            }

        }
        return (
            <div className="App">
                     <AppBar style={styles.SignInBar} title="Sign In" showMenuIconButton={false} />
                     <TextField hintText="Email" floatingLabelText="Email" onChange={(text) => this.setState({email:text.target.value})} value={this.state.email}/><br />
                     <TextField hintText="Password" type="password" floatingLabelText="Password" onChange={(text) => this.setState({pass:text.target.value})} value={this.state.pass}/><br />
                     <RaisedButton label="Sign In" primary={true} style={styles.SignInBtn} onClick={() => this.SignInFunc()} /><br />
                     <Link to="/signup"><RaisedButton label="Create Account" primary={true} /></Link>
             </div>
        )
    }
    trueState() {
        const styles = {
       
            Spinning: {
              marginLeft:'50%',
              marginTop:'20%'
            }

        }
        return (
            <div style={styles.Spinning}>
              <RingLoader  color={'#123abc'}  loading={this.state.loading} />
              </div>
              
          )
    }
    render() {
        return (
            <section>
                {
                    this.state.loading ? this.trueState() : this.falseState()

                }
            </section>
        )
         
        

     
      
     

    }
}



export default SignIn;