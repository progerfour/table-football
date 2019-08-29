import React, {Component} from 'react';
import {Auth,ListOfPartisipants,Match,Admin} from './pages';
import {BrowserRouter ,Route, Switch} from "react-router-dom";

class App extends Component {
  render(){
     return (
        <div className="wrapper">
        <BrowserRouter>
          <Switch>
            <Route exact path="/"><Auth></Auth></Route>
            <Route path="/participants"><ListOfPartisipants >
              </ListOfPartisipants></Route>
            <Route path="/match" component={Match}></Route>
            <Route path="/admin"><Admin></Admin></Route>
          </Switch>
        </BrowserRouter>
        </div>
    );
  }
}

export default App;