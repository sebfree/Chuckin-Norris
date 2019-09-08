import React, { Component } from 'react';
//importing css file
import './App.css';
//importing axios from the node modules (in order to make API call)
import axios from 'axios';
import He from 'he';

import Giphy from './Assets/tenor.gif';


import firebase from './firebase.js';


class App extends Component {

 constructor(){
   console.log("Halllo from Constructor");
   super();
   this.state = {
     jokeArray: [],
     jokes: [],
     userInput: '',
     jokeSubmitted: false
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

removeJoke = (jokeId) => {
  const dbRef = firebase.database().ref();

  dbRef.child(jokeId).remove();

}
   
   
 componentDidUpdate(){

 }
 componentWillUnmount(){

 }

getJoke = (e) => {
  axios({
    method: 'get',
    url: 'http://api.icndb.com/jokes/random/exclude=[explicit]/?escape=javascript',
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

// handleBodyClick = () => {
//   alert('`no bad bad')
// }


handleChange = (event) => {
  this.setState({
    userInput: event.target.value,
  })

}
sendAlert = () => {
    alert('bla');
  }

handleSubmit = (event) => {

  event.preventDefault();

  const dbRef = firebase.database().ref();

  dbRef.push(this.state.jokeTime);

  this.setState({
    userInput: '',
    jokeSubmitted: true

    
  });

  // TRYING TO SEND ALERT

  event.stopPropagation()
};

 render(){

  console.log(this.state.jokeTime);
  console.log(this.state.jokeSubmitted);
  // console.log(sendAlert());

 return (

  // <div>{myValue.replace(/ /g, "\u00a0")}</div>
   <body onClick={this.handleBodyClick} >
     <div className="wrapper">
     
      <div className="header-flex">
        <div className="header-image">
          <img src={Giphy}></img>
        </div>
        <div className="header-text">
          <h1>Chuckin'Norris</h1>
          <h2 className="quotation">Cuz Chuck Norris is the world's greatest human</h2>
        </div>
          
      </div>
      

        <div className="jokes">

            <div className="jokes-api">
              <p className="nes-container is-rounded">{this.state.jokeTime}</p>
            </div>

          <div className="jokes-button">
            <button type="button" className="nes-btn is-warning"onClick={this.getJoke}>Get a Chuckin'joke</button>
          </div>
        </div>

        <div className="board">
          <div className="board-button">
            <button type="button" className="nes-btn is-warning"onClick={this.state.jokeSubmitted ? this.sendAlert : this.handleSubmit}>Add joke to board</button>

          </div>
          <div className="nes-container is-rounded board-container">
            <h2>Community Board : A list of favourite jokes</h2>
              <ul className="nes-list is-circle">
                {this.state.jokes.map(joke => {
                  return (
                    <li key = {joke.uniqueKey}>
                      <p>{joke.title}<span><button onClick={() => this.removeJoke(joke.uniqueKey)}>Remove Joke</button></span></p>
                    </li>
                  ); 
                })}
              </ul>
          </div>
        </div>

      </div>

      <footer>
        <p>&copy; Seb Freeman 2019</p>
      </footer>

  </body>


   
  );
 }
}


export default App;