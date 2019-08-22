import React, {Component} from 'react';
import {Auth,ListOfPartisipants,Match,Admin} from './pages';
import {BrowserRouter ,Route, Link, Switch} from "react-router-dom";

const mmatch =  {
  "player1":{
    "name":"Лена"
  },
  "player2":{
    "name":"Катя"
  },
  "score":{
    "player1":4,
    "player2":3
  } 
};

class App extends Component {
  render(){
    return (
        <div className="wrapper">
        <BrowserRouter>
          <Switch>
            <Route exact path="/"><Auth></Auth></Route>
            <Route  path="/participants"><ListOfPartisipants list={[
              {name:"Roma",image:"images/1.png"},{name:"Георгий",image:"images/2.png"},{name:"Лена",image:"images/3.jpg"},{name:"Катя",image:"images/4.jpg"}
            ]}>
              </ListOfPartisipants></Route>
            <Route path="/match" component={Match(mmatch)}></Route>
            <Route path="/admin"><Admin></Admin></Route>
          </Switch>
        </BrowserRouter>
        </div>
        
    );
  }
}

export default App;
//[{name:"Roma"},{name:"Георгий"},{name:"Лена"},{name:"Катя"}]