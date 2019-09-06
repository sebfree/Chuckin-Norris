import React, { Component } from 'react';
// import ReactHoldButton from 'react-long-press';
//importing css file
import './App.css';
//importing axios from the node modules (in order to make API call)
import axios from 'axios';

import Giphy from './Assets/tenor.gif';

import firebase from './firebase.js';


class App extends Component {

 constructor(){
   console.log("Halllo from Constructor");
   super();
   this.state = {
     jokeArray: [],
     jokes: [],
     userInput: ''
   }
 }

// this event will fire every time there is a change in the input it is attached to
handleChange = (event) => {

  // we're telling React to update the state of our `App` component to be 
  // equal to whatever is currently the value of the input field
  this.setState({userInput: event.target.value})
}
 componentDidMount(){

// stores what database looks like
const dbRef = firebase.database().ref();
// monitors stores and returns changes
  dbRef.on('value', (data) => {
    // this only returns the books, e.g. the items
   const response = data.val();

    const newState = [];

    for (let key in response) {
      newState.push({
        title: response[key],
        uniqueKey: key, 
      });

    }


    this.setState({
      jokes: newState,
    });
  });

}
   
   
 componentDidUpdate(){
   console.log('hello from DID UPDATE')
 }
 componentWillUnmount(){
   console.log('hello from COMPONENT WILL UNMOUNT')
 }

getJoke = (e) => {
  axios({
    method: 'get',
    url: 'http://api.icndb.com/jokes/random/?escape=javascript/exclude=[explicit]',
    responseType: 'json'
  }).then((res) => {
    console.log (res)

    this.setState({
      jokeArray: res.data.value,
      jokeTime: res.data.value.joke

    });
  })
  e.stopPropagation()

}

handleBodyClick = () => {
  alert('`no bad bad')
}

handleChange = (event) => {
  this.setState({
    userInput: event.target.value,
  })

}

handleSubmit = (event) => {
  event.preventDefault();

  const dbRef = firebase.database().ref();

  dbRef.push(this.state.jokeTime);

  this.setState({
    userInput: '',
  });
  event.stopPropagation()
};

 render(){
   console.log('Hello from the RENDER method');
 return (

  // <div>{myValue.replace(/ /g, "\u00a0")}</div>
   <div className="App" onClick={this.handleBodyClick}>
     
     <img src={Giphy}></img>
     <h1>Chuckin'Norris</h1>

     <p>{this.state.jokeTime}</p>
     <button onClick={this.getJoke}>Get a Chuckin'joke</button>

     <form action="">
        {/* <input onChange={this.handleChange} type="text" value={this.state.userInput}/> */}
        <button onClick={this.handleSubmit}>Add to fave jokes</button>
    </form>
      <ul>
        {this.state.jokes.map(joke => {
          return (
            <li key = {joke.uniqueKey}>
              <p>{joke.title}</p>
            </li>
          ); 
        })}
      </ul>


   </div>


   
  );
 }
}


export default App;