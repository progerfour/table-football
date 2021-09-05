import React, {Component} from 'react';
import { Auth, ListOfParticipants, Match, Admin} from './pages';
import { BrowserRouter, Route, Switch } from "react-router-dom";

class App extends Component {
  render(){
     return (
        <div className="wrapper">
        <BrowserRouter>
          <Switch>
            <Route exact path="/"><Auth/></Route>
            <Route path="/participants"><ListOfParticipants>
              </ListOfParticipants></Route>
            <Route path="/match" > <Match/></Route>
            <Route path="/admin"><Admin></Admin></Route>
          </Switch>
        </BrowserRouter>
        </div>
    );
  }
}

export default App;