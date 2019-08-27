import React, {Component} from 'react';
import {Auth,ListOfPartisipants,Match,Admin} from './pages';
import {BrowserRouter ,Route, Switch} from "react-router-dom";

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
    const {users} = this.props;
     return (
        <div className="wrapper">
        <BrowserRouter>
          <Switch>
            <Route exact path="/"><Auth></Auth></Route>
            <Route path="/participants"><ListOfPartisipants >
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