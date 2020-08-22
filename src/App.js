import React, { Component } from 'react';
import './App.css'

class App extends Component{
    constructor(){
        super()
        const tasks = []
        for(let i=0;i<4;i++){
            tasks.push({task : i + 1, isComplete: false, time : null, timeTaken : null })
        }
        this.state = {
            isRunning : false,
            timer : 0,
            tasks : tasks,
            lastCompletionTime : 0
        }
    }

    switchTimer(){
        if(this.state.isRunning){
            //stop it
            clearInterval(this.state.intervalId)
            this.setState({ isRunning : false })
        }else{
            //start it
            const interval = setInterval(() => this.updateTimer(), 1000)
            this.setState({ intervalId : interval, isRunning : true })
        }
    }

    updateTimer(){
        this.setState({ timer : this.state.timer + 1 })
    }

    resetTimer(){
        this.setState({ timer : 0 })
    }

    formatTime(timer){
        const seconds = timer%60
        const minutes = Math.floor(timer/60)
        const hours = Math.floor(minutes/60)
        return ` ${hours} : ${minutes%60} : ${seconds} `
    }

    getRowEntry(row){
        return (
            <tr>
                <td>{row.task}</td>
                <td>{row.isComplete ? 'DONE' : <button onClick={() => this.markAsDone(row.task)}>done</button>}</td>
                <td>{row.isComplete ? this.formatTime(row.time) : null }</td>
                <td>{row.isComplete ? this.formatTime(row.timeTaken) : null}</td>
            </tr>
        )
    }

    markAsDone(index){
        const newTasks = this.state.tasks
        newTasks[index - 1].isComplete = true
        newTasks[index - 1].time = this.state.timer
        newTasks[index - 1].timeTaken = this.state.timer - this.state.lastCompletionTime
        this.setState({ tasks : newTasks, lastCompletionTime : this.state.timer })
    }

    render(){
        const headers = ['Task No', 'IsComplete', 'Time', 'Time Taken']
    return (
        <div>
            <p>{this.formatTime(this.state.timer)}</p>
            <button onClick={() => this.switchTimer()}>{this.state.isRunning ? 'STOP' : 'START' }</button>
            <button onClick={() => this.resetTimer()}>RESET</button>
            <table>
                <tr>
                {headers.map(header => <th>{header}</th>)}
                </tr>
                { this.state.tasks.map((row) => this.getRowEntry(row))}
             </table>
        </div>
        )
    }
}


export default App;