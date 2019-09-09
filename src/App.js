import React, { Component } from 'react';
//importing css file
import './App.css';
//importing axios from the node modules (in order to make API call)
import axios from 'axios';
// importing images
import Giphy from './Assets/tenor.gif';
// importing firebase
import firebase from './firebase.js';

// creating parent component
class App extends Component {

  // creating constructor with states
 constructor(){
   console.log("Halllo from Constructor");
   super();
   this.state = {
     jokeArray: [],
     jokes: [],
    //  userInput: '',
     jokeSubmitted: false
   }
 }

// this event will fire every time there is a change in the input it is attached to
// handleChange = (event) => {

//   this.setState({userInput: event.target.value})
// }
componentDidMount(){

// stores what database looks like
const dbRef = firebase.database().ref();
// monitors stores and returns changes
  dbRef.on('value', (data) => {
    // this only returns the jokes, e.g. the items
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

//  this is the API call to pull random joke
getJoke = (e) => {
  axios({
    method: 'get',
    url: 'http://api.icndb.com/jokes/random/exclude=[explicit]/?escape=javascript',
    responseType: 'json'
  }).then((res) => {

    // setting new joke state
    this.setState({
      jokeArray: res.data.value,
      jokeTime: res.data.value.joke

    });

  })
  e.stopPropagation()

}



// alert function to handle errors (when user tries to add multiple jokes to board)
sendAlert = () => {
    alert("You've already added a joke");
  }


// this adds a joke to the community board / firebase
handleSubmit = (event) => {

  event.preventDefault();

  const dbRef = firebase.database().ref();

  dbRef.push(this.state.jokeTime);

  // setting state to disbable add joke to board feature
  this.setState({
    jokeSubmitted: true

    
  });


  event.stopPropagation()
};

 render(){

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
                      <p>{joke.title}<span><button className="nes-btn is-warning remove-button" onClick={() => this.removeJoke(joke.uniqueKey)}>Remove</button></span></p>
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