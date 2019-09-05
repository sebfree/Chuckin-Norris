import React, { Component } from 'react';
//importing css file
import './App.css';
//importing axios from the node modules (in order to make API call)
import axios from 'axios';

// added this

class App extends Component {

 constructor(){
   console.log("Halllo from Constructor");
   super();
   this.state = {
     roundhouse: [],
   }
 }

 componentDidMount(){
   console.log('Hello from COMPONENT DID MOUNT');
   
 }
 componentDidUpdate(){
   console.log('hello from DID UPDATE')
 }
 componentWillUnmount(){
   console.log('hello from COMPONENT WILL UNMOUNT')
 }

// getManyJokes = (e) => {
//   axios({
//     method: 'get',
//     url: 'http://api.icndb.com/jokes/random?escape=javascript/10',
//     responseType: 'json'
//   }).then((res) => {
//     console.log(res);
//     //this changes the initial state to the value that we get back from our API call - in this case an array of art objects, and the title of the first art object
//     this.setState({
//       roundhouse:res.data.value,
//       roundhouseName: res.data.value.joke[0]
//     });
//   })
//   e.stopPropagation()
// }

getJoke = (e) => {
  axios({
    method: 'get',
    url: 'http://api.icndb.com/jokes/random?escape=javascript',
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

 handleClick = (ev) => {

  ev.preventDefault()

}

 render(){
   console.log('Hello from the RENDER method');
 return (

  
   <div className="App" onClick={this.handleBodyClick}>
     <h1>Chuckin'Norris</h1>
     <p>test test</p>
     <p>{this.state.jokeTime}</p>
     <button onClick={this.getJoke}></button>

     <p>{this.state.roundhouseName}</p>

     {/* <button onClick={this.getManyJokes}></button> */}


   </div>


   
  );
 }
}


export default App;