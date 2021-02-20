import React from "react";

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      started: false,
      paused: false,
      timer: 0,
    };
    this.handleStartTimer = this.handleStartTimer.bind(this);
    this.handlePauseTimer = this.handlePauseTimer.bind(this);
    this.handleResetTimer = this.handleResetTimer.bind(this);
    this.decrement = this.decrement.bind(this);
    this.formatTime = this.formatTime.bind(this);
    
  }
  handleStartTimer() {
    console.log("Starting timer.");
    if (this.state.time === 0) {
      this.setState({ time: 5, started: true });
      clearInterval(this.timer);
      this.timer = setInterval(this.decrement, 1000);
    } else if (this.state.paused) {
      this.setState({ paused: false });
    }

    // if(this.state.time)
  }
  handlePauseTimer() {
    this.setState({ paused: true });
  }

  handleResetTimer(){
    clearInterval(this.timer);
    this.setState({time: 0, started: false, paused: false});
  }
  decrement() {
    if (this.state.time > 0 && !this.state.paused) {
      this.setState({ time: this.state.time - 1 });
    } else if (this.state.time === 0 && this.state.started) {
      this.setState({ started: false, paused: false });
      alert('TIMES UP')
    }
  }
  formatTime(seconds) {
    const date = new Date(null);
    date.setSeconds(seconds);
    return date.toISOString().substr(11, 8);
  }

  render() {
    return (
      <div>
        <h3> Time Remaining</h3>
        <p>{this.formatTime(this.state.time)}</p>
        <button
          onClick={this.handleStartTimer}
          disabled={this.state.started && !this.state.paused}
        >
          {this.state.started ? "Resume" : "Start Timer"}
        </button>
        <button
          onClick={this.handlePauseTimer}
          disabled={this.state.paused || !this.state.started}
        >
          Pause
        </button>
        <button onClick={this.handleResetTimer}>Reset</button>
      </div>
    );
  }
}
export default Counter;
