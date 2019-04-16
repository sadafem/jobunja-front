import React, { Component } from 'react'

export default class Users extends Component<Props, State>{
    constructor(props: Props) {
        super(props)
        this.state = { users: [{name: 'sadi'}, {name: 'saboli'}]}
    }

    componentDidMount () {
        fetch(new Request('http://api', {method: 'GET'}))
        .then(response => {
            if(response.ok) return response.json();
            return console.error();
        })
        .then(response => {

        })
    }



  render() {
      const{users} = this.state
      const userJsx = users.map(u => {
          return (<div key={u.name}>{u.name}</div>)
      })
    return (
      <div>
          {userJsx}
        hi {this.props.yourName}
      </div>
    )
  }
}
interface Props {
    yourName: String
}

interface State {
    users: User[];
}
interface User {
    name: string
}
