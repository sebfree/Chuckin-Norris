import React, { Component } from 'react';
//importing css file
import './App.css';
//importing axios from the node modules (in order to make API call)
import axios from 'axios';

class App extends Component {

 constructor(){
   console.log("Halllo from Constructor");
   super();
   this.state = {
     jokeArray: [],
   }
 }
 componentDidMount(){
   console.log('Hello from COMPONENT DID MOUNT');
   //making an API call with axios
  //  axios({
  //    method: 'get',
  //    url: 'http://api.icndb.com/jokes/random?escape=javascript',
  //    responseType: 'json'
  //  }).then((res) => {
  //    console.log (res)

  //    this.setState({
  //      jokeArray: res.data.value,
  //      jokeTime: res.data.value.joke


  //     //  jokeName: res.dajokeObjects[0].title
  //    });

  //    console.log(res.data.value)
  //    console.log(res.data.value.joke)
  //  });

   
 }
 componentDidUpdate(){
   console.log('hello from DID UPDATE')
 }
 componentWillUnmount(){
   console.log('hello from COMPONENT WILL UNMOUNT')
 }

//  getNext = (ev) =>{
//   ev.preventDefault()
//   axios.get('http://api.icndb.com/jokes/random?escape=javascript')
// }

getJoke = () => {
  axios({
    method: 'get',
    url: 'http://api.icndb.com/jokes/random?escape=javascript',
    responseType: 'json'
  }).then((res) => {
    console.log (res)

    this.setState({
      jokeArray: res.data.value,
      jokeTime: res.data.value.joke
     //  jokeName: res.dajokeObjects[0].title
    });
  })
}

 handleClick = (ev) => {

  ev.preventDefault()

}



 render(){
   console.log('Hello from the RENDER method');
 return (
   <div className="App">
     <h1>Chuckin' Norris</h1>
     <p>test test</p>
     <p>{this.state.jokeTime}</p>
     <button onClick={this.getJoke}></button>
     
   </div>
  );
  console.log(this.handleClick)
 }
}


export default App;