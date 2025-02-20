import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

/**
 * State declaration for <App />
 */
interface IState {
  data: ServerRespond[],
  /**
   * interface is now requiring entities to have both these values. whenever type Istate is used,
   * the application knows it should have Data and ShowGraph as properties in order to be valid.
   */
  showGraph: boolean,
}

/**
 * The parent element of the react app.
 * It renders title, button and Graph react element.
 */
class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      // data saves the server responds.
      // We use this state to parse data down to the child element (Graph) as element property
      data: [],
      //Defining initial state of Graph as hidden. Only want it visible when user clicks "Start Streaming Data".
      showGraph: false,
    };
  }

  /**
   * Render Graph react component with state.data parse as property data
   */
  renderGraph() {
    //Added a condition to render graph when the application state's showGraph property is "True"
    if(this.state.showGraph){
      return (<Graph data={this.state.data}/>)
    }
  }

  /**
   * Get new data from server and update the state with the new data
   */
  getDataFromServer() {
    // instance variable x which is going to be our counter which begins at 0
    let x = 0; 
    //declaring an interval which will execute this code snippet with fixed time delays between each call.
    const interval =setInterval(() =>{
      DataStreamer.getData((serverResponds: ServerRespond[]) => {
      // Update the state by creating a new array of data that consists of
      // Previous data in the state and the new data from server
      this.setState({ 
        data: serverResponds,
        showGraph: true, 
      });
    });
    //increment of our counter 
    x++;
    //checking to see if our counter exceeds 1000. if so clear the interval.
    if (x>1000) {
      clearInterval(interval);
    }
  }, 100); // delay of 100 
}

  /**
   * Render the App react component
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank & Merge Co Task 2
        </header>
        <div className="App-content">
          <button className="btn btn-primary Stream-button"
            // when button is click, our react app tries to request
            // new data from the server.
            // As part of your task, update the getDataFromServer() function
            // to keep requesting the data every 100ms until the app is closed
            // or the server does not return anymore data.
            onClick={() => {this.getDataFromServer()}}>
            Start Streaming Data
          </button>
          <div className="Graph">
            {this.renderGraph()}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
