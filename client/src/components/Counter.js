import React from "react";
import '../App.scss';
import './Counter.scss';
import AlarmMP3 from './alarm_clock.mp3'
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
      this.setState({ time: 25 * 60, started: true });
      clearInterval(this.timer);
      this.timer = setInterval(this.decrement, 1000);
    } else if (this.state.paused) {
      this.setState({ paused: false });
    }

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
      
      const AlarmRing = new Audio(AlarmMP3);
      AlarmRing.play();
      // alert('Time to take a break!');
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
        <div id="time-display">
        <h3> Time Remaining</h3>
        <p>{this.formatTime(this.state.time)}</p></div>
        
        <div id="buttons-container">
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
        </div>
        
        <button onClick={this.handleResetTimer}>Reset</button>
      </div>
    );
  }
}
export default Counter;
