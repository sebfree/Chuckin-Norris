import React, { Component } from 'react';
// import ReactHoldButton from 'react-long-press';
//importing css file
import './App.css';
//importing axios from the node modules (in order to make API call)
import axios from 'axios';

import Giphy from './Assets/tenor.gif';


class App extends Component {

 constructor(){
   console.log("Halllo from Constructor");
   super();
   this.state = {
     jokeArray: [],
   }
 }

// STARTS HERE 

onMouseDown = () => {
  setTimeout(() => {
    console.log('sup')
    
  }, 300);

};

onMouseOut = () => {

};





// ENDS HERE
 componentDidMount(){
   console.log('Hello from COMPONENT DID MOUNT');
   
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
    url: 'http://api.icndb.com/jokes/random/escape=javascript/exclude=[explicit]',
    responseType: 'json'
  }).then((res) => {
    console.log (res)

    this.setState({
      jokeArray: res.data.value,
      jokeTime: res.data.value.joke

    // }, () => {
    //   this.roundhouseJokes()
    });
  })
  e.stopPropagation()

}

// roundhouseJokes = () => {
//   for (let key in this.jokeArray) {
//     const randomJoke = Math.floor(Math.random() * this.jokeArray.length);
//     return jokeArray[randomJoke];
//   }
// }

handleBodyClick = () => {
  alert('`no bad bad')
}

 handleClick = (ev) => {

  ev.preventDefault()

}

 render(){
   console.log('Hello from the RENDER method');
 return (

  // <div>{myValue.replace(/ /g, "\u00a0")}</div>
   <div className="App" onClick={this.handleBodyClick}>
     
     <img src={Giphy}></img>
     <h1>Chuckin'Norris</h1>
     <p>test test</p>
     <p>{this.state.jokeTime}</p>
     <button onClick={this.getJoke}></button>

     {/* <button onClick={this.getManyJokes}></button> */}


   </div>


   
  );
 }
}


export default App;