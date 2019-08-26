import React, {Component} from 'react';
import {Auth,ListOfPartisipants,Match,Admin} from './pages';
import {BrowserRouter ,Route, Switch} from "react-router-dom";
import { connect } from 'react-redux';

class App extends Component {
  render(){
    const {users} = this.props;
     return (
        <div className="wrapper">
        <BrowserRouter>
          <Switch>
            <Route exact path="/"><Auth></Auth></Route>
            <Route path="/participants"><ListOfPartisipants list={users.items
            }>
              </ListOfPartisipants></Route>
            <Route path="/match" component={Match(mmatch)}></Route>
            <Route path="/admin"><Admin></Admin></Route>
          </Switch>
        </BrowserRouter>
        </div>
        
    );
  }
}

const mapStateToProps = store => {
  console.log(store)
  return {
    users: store.users,
  }
}

export default connect(mapStateToProps)(App)

//export default App;