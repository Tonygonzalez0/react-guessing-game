import React, { Component } from 'react';
import './Start.css';

class App extends Component {
  state ={
    gameType: '',
    winningNumber: null,
    userNumber: null,
    userNumberType: '',
    highScore: null,
    submitCount: 0,
  }

  //Make a function that is the same for both but takes different parameters for less code 

  standardHandler =()=>{
    this.resetHandler()
    this.setState({ gameType:'Standard' })
    this.setState({ winningNumber: this.mathFunction(10) })
  }
  expertHandler = ()=>{
    this.resetHandler()
    this.setState({ gameType:'Expert' })
    this.setState({ winningNumber: this.mathFunction(100) })
  }
  mathFunction = (num) => Math.floor(Math.random() * Math.floor(num) + 1)
  numberChange = (e)=>{
    this.setState({ userNumber: parseInt(e.target.value, 10) })
    this.setState({ userNumberType: '' })
   }

   submit = ()=>{
     const newSubmitCount = this.state.submitCount + 1
     this.setState({ submitCount: newSubmitCount })
      if (this.state.userNumber > this.state.winningNumber) {
        this.setState({ userNumberType: 'high' })
      } else if (this.state.userNumber < this.state.winningNumber) {
        this.setState({ userNumberType: 'low' })
      } else if(this.state.userNumber === this.state.winningNumber){
        this.setState({ userNumberType: 'exact' })
        if(this.state.highScore === null || newSubmitCount < this.state.highScore) {
          this.setState({ highScore: newSubmitCount })
        }
        this.setState({ submitCount: 0 })
      }
      else{}
   }

   resetHandler= ()=> {
    this.setState({ gameType: '' })
    this.setState({ winningNumber: null })
    this.setState({ userNumber: null })
    this.setState({ userNumberType: '' })
   }

  render() {
    let message = '';
    if (this.state.userNumberType === 'high') {
      message = 'The value is too high!';
    } else if (this.state.userNumberType === 'low') {
      message = 'The value is too low!';
    } else if (this.state.userNumberType === 'exact') {
      message = 'Congrats!';
    }else{
      message="Enter a Number!"
    }
    return(
        <div>
        <h1 className="header">Start Game</h1>
            <div className="btn__container">
                <button onClick={this.standardHandler}>Standard</button>
                <button onClick={this.expertHandler}>Expert</button>
                <button onClick={this.resetHandler}>Reset</button>
                {this.state.gameType !== '' &&
                  <div className="start--game__container">
                    {this.state.userNumberType !== 'exact' &&
                      <div>
                        <input type= "text" onChange={this.numberChange.bind(this)}/>
                        <input type= "submit" onClick={this.submit}/>
                        {/* <div>Target value {this.state.winningNumber}</div> */}
                      </div>
                    }
                    <div className="start--message__style">{message}</div>
                    {this.state.userNumberType === 'exact' &&
                      <div>
                        <div>High score is: {this.state.highScore}</div>
                      </div>
                    }
                  </div>
                }
            </div>
        </div>
    )
  }
}

export default App;
