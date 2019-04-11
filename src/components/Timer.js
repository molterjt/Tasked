import React from 'react';
import PropTypes from 'prop-types';
import { MDBIcon,MDBTooltip,MDBCardTitle,} from "mdbreact";


class Timer extends React.Component{
    constructor(){
        super();
        this.state = {
            hours: 0,
            minutes: 0,
            seconds: 0,
            totalTime: 0,
            displayTime: "0:00:00",
        }
        this.timer = 0;
        this.onStartTimer = this.onStartTimer.bind(this);
        this.countDown = this.countDown.bind(this);
    }

    onTimerSet(hrs, mins){
        let displayMins = mins;
        if(mins < 10){
            displayMins = "0"+mins;
        }
        let hoursToMin=0;
         if(hrs > 0){
             hoursToMin = hrs * 60;
         }
        console.log(hoursToMin);
        let allMins = parseInt(hoursToMin) + parseInt(mins);
        console.log('allmins: ', allMins);
        this.setState({seconds: allMins * 60});
        console.log('seconds: ', allMins * 60);
        this.setState({
            displayTime: `${hrs}:${displayMins}:00`
        })

    }

    onStartTimer(){
        if( this.timer === 0 && this.state.seconds > 0){
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    prepareDisplayTime(sec){
        const hours = Math.floor( parseInt(sec) / 3600);
        console.log('hours', hours);
        let remainderMins = sec%3600;
        let mins = Math.floor(remainderMins/60);
        let reminderSecs = remainderMins%60;
        let secs = Math.ceil(reminderSecs);
        if(mins < 10){
            mins = "0"+mins;
        }
        return `${hours}:${mins}:${secs}`
    }

    countDown(){
        let timeLeft = this.state.seconds - 1;
        this.setState({seconds: timeLeft});
        this.setState({
            displayTime: this.prepareDisplayTime(timeLeft)
        });
        if(this.state.seconds === 0){
            clearInterval(this.timer);
        }
    }

    pauseCountDown(){
        const freezeTime = this.state.displayTime;
        clearInterval(this.timer);
        this.timer = 0;

    }

    render(){
        return(
            <div>
                <MDBCardTitle className={'text-center text-success'}>{this.state.displayTime}</MDBCardTitle>
            <div style={{display:'flex', flexDirection:'row',}}>
                <MDBTooltip style={{width:'50%'}} placement="top" tag="a" component="span" tooltipContent="Hours">
                    <select
                        value={this.state.hours}
                        onChange={(e) => this.setState({hours: parseInt(e.target.value)})}
                    >
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </MDBTooltip>
                <MDBTooltip style={{width:'50%'}} placement="top" tag="a" component="span" tooltipContent="Minutes">
                    <select
                        value={this.state.minutes}
                        onChange={(e) => this.setState({minutes: parseInt(e.target.value)})}
                    >
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        <option value="25">25</option>
                        <option value="30">30</option>
                        <option value="35">35</option>
                        <option value="40">40</option>
                        <option value="45">45</option>
                        <option value="50">50</option>
                        <option value="55">55</option>
                    </select>
                </MDBTooltip>
                <div style={{marginLeft:10, flexDirection: 'flex', display:'flex'}}>
                    <MDBTooltip style={{width:'40%'}} placement="top" tag="a" component="span" tooltipContent="Set Timer">
                        <MDBIcon
                            far icon="clock"
                            onClick={()=>this.onTimerSet(this.state.hours, this.state.minutes)}
                            style={{margin: 5}}
                        />
                    </MDBTooltip>
                    <MDBTooltip style={{width:'40%'}} placement="top" tag="a" component="span" tooltipContent="Start">
                        <MDBIcon
                            far icon="play-circle"
                            onClick={()=>this.onStartTimer()}
                            style={{margin: 5}}
                        />
                    </MDBTooltip>
                    <MDBTooltip style={{width:'40%'}} placement="top" tag="a" component="span" tooltipContent="Pause">
                        <MDBIcon
                            far icon="pause-circle"
                            onClick={()=>this.pauseCountDown()}
                            style={{margin: 5}}
                        />
                    </MDBTooltip>
                </div>

            </div>
            </div>
        );
    }
}

export default Timer;
