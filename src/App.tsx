import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

import 'src/'
import Users from './users/Users';

class App extends React.Component<Props, State> {
  static defaultProps = {title:{}}
  constructor(props: Props) {
    super(props);
    this.state = {
      title: 'sadi'
    };
  }
  render() {  
    return (
      <div>
        <p>{this.state.title}</p>
        <button onClick={this.changeTitle} >click</button>
        <section> <Users yourName={"sadaf"}/> </section>
      </div>
    );
  }
  changeTitle = () => {
    this.setState({title : 'new title'}) 
  }
}

interface Props{
  title: string
}
interface State{
  title: string
}

export default App;