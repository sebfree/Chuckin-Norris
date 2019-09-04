import React, { Component } from 'react';
//importing css file
import './App.css';
//importing axios from the node modules (in order to make API call)
import axios from 'axios';

class App extends Component {

 constructor(){
   console.log("Healllo from Constructor");
   super();
   this.state = {
     counter : 0,
     jokeArray: [],
   }
 }
 componentDidMount(){
   console.log('Hello from COMPONENT DID MOUNT');
   //making an API call with axios
   axios({
     method: 'get',
     url: 'http://api.icndb.com/jokes/random',
     responseType: 'json',
     params: {
       key:'',
       q: '',
       format: 'json',
       imgonly: 'true',
     }
   }).then((res) => {
     console.log(res.data.jokeObjects);
     this.setState({
       artArray: res.data.jokeObjects,
       artName: res.data.jokeObjects[0].title
     });
   });
 }
 componentDidUpdate(){
   console.log('hello from DID UPDATE')
 }
 componentWillUnmount(){
   console.log('hello from COMPONENT WILL UNMOUNT')
 }
 
 render(){
   console.log('Hello from the RENDER method');
 return (
   <div className="App">
     <h1>Chuckin' Norris</h1>
     <p>test test</p>


   </div>
  );
 }
}
export default App;