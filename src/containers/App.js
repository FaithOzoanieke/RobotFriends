import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchfield: '',
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      // Fetches what ever the users have, get response and update the users
      .then((response) => response.json())
      .then((users) => this.setState({ robots: users }));
    // this.setState({ robots: robots });
  }
  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value });
  };

  render() {
    const { robots, searchfield } = this.state;
    const filteredRobots = robots.filter((robot) => {
      return robot.name
        .toLowerCase()
        .includes(searchfield.toLowerCase());
    });
    if (!robots.length) {
      // if the above is zero return loading...
      return <h1>Loading</h1>;
    } else {
      return (
        <div className='tc'>
          <h1 className='f1'>ROBOT FRIENDS</h1>
          <SearchBox searchChange={this.onSearchChange} />
          <Scroll>
            <CardList robots={filteredRobots} />
          </Scroll>
        </div>
      );
    }
  }
}

// const App = () => {
//   return (
//     <div className='tc'>
//       <h1>ROBO FRIENDS</h1>
//       <SearchBox />
//       <CardList robots={robots} />
//     </div>
//   );
// };

export default App;
