import React from 'react';
import {connect} from 'react-redux';
import {selectHours, selectMinutes} from '../actions';
import {MDBTooltip} from 'mdbreact';


{/******     SelectTimerInputs Container    *******/}
const SelectTimerInputs = ({dispatch, id, hours, minutes}) => {
    {/******     connected to Redux actions selectHours(hours) & selectMinutes(minutes)    *******/}
    return(
        <div style={{display:'flex', flexDirection:'row',}}>
            <MDBTooltip style={{width:'50%', margin:10}} placement="top" tag="a" component="span" tooltipContent="Hours">
                <select
                    style={{margin:10}}
                    defaultValue={hours}
                    onChange={(e) => {
                        dispatch(selectHours(parseInt(e.target.value), id));
                    }}
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
            <MDBTooltip style={{width:'50%', margin:10}} placement="top" tag="a" component="span" tooltipContent="Minutes">
                <select
                    style={{margin:10}}
                    defaultValue={minutes}
                    onChange={(e) => {
                        dispatch(selectMinutes(parseInt(e.target.value), id));
                    }}
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
        </div>

    )

};
export default connect()(SelectTimerInputs);