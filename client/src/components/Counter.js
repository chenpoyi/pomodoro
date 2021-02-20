import React from "react";

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      started: false,
      paused: false
    };
    this.handleStartTimer = this.handleStartTimer.bind(this);
    this.decrement = this.decrement.bind(this);
  }
  handleStartTimer(){
    console.log('Starting timer.');
    this.setState({time: 5,started: true});
    setInterval(this.decrement, 1000);
    // if(this.state.time)
  }

  decrement(){
    if(this.state.time > 0 && !this.state.paused){
      this.setState({time: this.state.time - 1});
    } else {
      this.setState({started: false, paused: false})
    }
  }

  pause(){
    this.setState({paused: true})
  }
  render() {
    return (<div>
      <h2>Counter</h2>
      <h3> Time Remaining</h3>
      <p>{this.state.time}</p>
      <button onClick={this.handleStartTimer} disabled={this.state.started}>Start Timer</button>
      <button onClick={this.paused} disabled={this.state.paused || !this.state.started}>Pause</button>
    </div>);
  }
}
export default Counter;
