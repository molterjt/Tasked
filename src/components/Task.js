import React from 'react';
import EditTask from '../containers/EditTask';
import SelectTimerInputs from '../containers/SelectTimerInputs';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {
    MDBIcon, MDBModal, MDBModalHeader, MDBModalBody, MDBBtn,
    MDBCard, MDBCardHeader, MDBCardTitle, MDBCardFooter,MDBTooltip,
} from "mdbreact";


class Task extends React.Component {
    constructor(props){
        super(props);

        this.timerObject = 0;
        this.onStartTimer = this.onStartTimer.bind(this);
        this.pauseCountDown = this.pauseCountDown.bind(this);
    }
    onStartTimer(){
        if(this.timerObject === 0 && this.props.seconds > 0 && this.props.displayTime !== "0:00:00"){
            this.props.toggleTimer();
            {/******     interval set to 1 seconds on the onCountDown function    *******/}
            this.timerObject = setInterval(this.props.onCountDown, 1000);
        }
        else this.pauseCountDown();

    }
    pauseCountDown(){
        this.props.toggleTimer();
        clearInterval(this.timerObject);
        this.timerObject = 0;
    }
    render(){
        const {
            text, id, hours, minutes, seconds, totalTime, displayTime, showSetTimerModal, toggleSetTimerModal,
            showEdit,  onClick, highlight, onDel, allowEdit,  timerOn, currentPosition, onCountDown,
            onSelectTimerHours, onSelectTimerMinutes, onTimerSet, onStartTimer, onPauseCountDown,
        } = this.props;

        return(
            /******     Draggable Task Card     *******/
            <MDBCard
                draggable
                onDragStart={(ev) => {
                    console.log('Dragging: ', text);
                    clearInterval(this.timerObject)
                    ev.dataTransfer.setData("DragTask", currentPosition);
                }}
                md={"4"}
                border={"success"}
                style={{
                    height: 'auto',
                    textDecoration: highlight ? 'line-through' : 'none',
                    textDecorationColor: 'red',
                    margin: 5,
                    backgroundColor: highlight ? 'rgba(0,0,0,.7)' : 'transparent',
                    opacity: highlight ? '0.4' : null
                }}
            >
                <MDBCardHeader>
                    <div>
                        <MDBCardTitle className={'text-center text-success'}>
                            {/******     Timer Display     *******/}
                            <strong>{displayTime}</strong>
                        </MDBCardTitle>
                        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly', marginTop: 5}}>
                            {/******     Timer Inputs Modal     *******/}
                            <MDBModal isOpen={showSetTimerModal} toggle={toggleSetTimerModal} size="sm">
                                <MDBModalHeader>Set Task Timer</MDBModalHeader>
                                <MDBModalBody style={{display: 'flex', flexDirection: 'row'}}>
                                    {/******     Select Timer Inputs Container    *******/}
                                    <SelectTimerInputs id={id} hours={hours} minutes={minutes}/>
                                    <MDBBtn color="light-green" size="sm" onClick={onTimerSet}>Set</MDBBtn>
                                </MDBModalBody>
                                    <MDBBtn outline color="info" size="sm" onClick={toggleSetTimerModal}>Exit</MDBBtn>
                            </MDBModal>
                            {/******     Timer Controls     *******/}
                                <MDBTooltip style={{width:'40%'}} placement="top" tag="a" component="span" tooltipContent="Set Timer">
                                    <MDBIcon
                                        onClick={toggleSetTimerModal}
                                        color="mdb-color"
                                        far icon="clock"
                                        size={'lg'}
                                    />
                                </MDBTooltip>
                                <MDBTooltip style={{width:'40%'}} placement="top" tag="a" component="span" tooltipContent="Start">
                                    <MDBIcon
                                        far icon="play-circle"
                                        size={'lg'}
                                        onClick={() => this.onStartTimer() }
                                        color="mdb-color"
                                    />
                                </MDBTooltip>
                                <MDBTooltip style={{width:'40%'}} placement="top" tag="a" component="span" tooltipContent="Pause">
                                    <MDBIcon
                                        onClick={() => {
                                            this.pauseCountDown();
                                        }}
                                        color="mdb-color"
                                        far icon="pause-circle"
                                        size={'lg'}
                                    />
                                </MDBTooltip>
                        </div>
                    </div>
                </MDBCardHeader>
                {/******     Task Title     *******/}
                <MDBCardTitle className="text-center text-dark mt-2" style={{backgroundColor: 'rgba(250,250,250,.3)', textAlign:'center'}}>
                    {text}
                </MDBCardTitle>
                {/******     Task Controls   *******/}
                <MDBCardFooter
                    style={{textAlign:'center', alignSelf:'center', justifyContent: 'center', alignContent:'center'}}
                >
                    <MDBBtn
                        onClick={() => {
                            clearInterval(this.timerObject);
                            onClick();
                        }}
                        color="deep-purple"
                        size={"sm"}
                    >
                        <MDBIcon far icon="check-circle" size={'lg'} />
                    </MDBBtn>
                    <MDBBtn
                        onClick={ () => {
                            clearInterval(this.timerObject);
                            onDel()
                        }}
                        color="unique"
                        size={"sm"}
                    >
                        <MDBIcon far icon="trash-alt" size={'lg'}/>
                    </MDBBtn>
                    <MDBBtn
                        onClick={() => {
                            clearInterval(this.timerObject);
                            allowEdit();
                        }}
                        color="light-green"
                        size={"sm"}
                    >
                        <MDBIcon
                            className="mb-1"
                            icon="pencil-alt"
                            size={'lg'}
                        />
                    </MDBBtn>
                </MDBCardFooter>
                {/******     Edit Task Container    *******/}
                {showEdit ? <EditTask id={id}/> : null}
            </MDBCard>
        )
    }
}
Task.propTypes = {
    id: PropTypes.number,
    text: PropTypes.string,
    hours: PropTypes.number,
    minutes: PropTypes.number,
    seconds: PropTypes.number,
    totalTime: PropTypes.string,
    displayTime: PropTypes.string,
    highlight: PropTypes.bool,
    showEdit: PropTypes.bool,
    showSetTimerModal: PropTypes.bool,
    toggleSetTimerModal: PropTypes.func,
    onClick: PropTypes.func,
    onDel: PropTypes.func,
    allowEdit: PropTypes.func,
    timerOn: PropTypes.bool,
    currentPosition: PropTypes.number,
    onTimerSet: PropTypes.func,
    onStartTimer: PropTypes.func,
    onPauseCountDown: PropTypes.func,
    onCountDown: PropTypes.func,
    toggleTimer: PropTypes.func,
};

export default connect()(Task);