import React from 'react'
import {connect} from 'react-redux'
import {addTask} from '../actions'
import { MDBIcon, MDBRow, MDBBtn} from "mdbreact";


/******     Add Task Controller     *******/
const AddTask = ({dispatch}) => {
    let input;
    return (
        <MDBRow style={{flex:1, justifyContent:'center', alignContent:'center'}}>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    if (!input.value.trim()) {
                        return
                    }
                    {/******     connected to Redux action addTask(taskTitle)    *******/}
                    dispatch(addTask(input.value));
                    input.value = ''
                }}
            >
                <input
                    placeholder={'Add Task'}
                    style={{padding:2}}
                    ref={node => (input = node)} />
                <MDBBtn size={'sm'} type="submit">
                    <MDBIcon
                        color="indigo"
                        className="mb-1"
                        icon="plus-square"
                        size="lg"
                    />
                </MDBBtn>
            </form>
        </MDBRow>
    )
}
export default connect()(AddTask);