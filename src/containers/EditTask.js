import React from 'react'
import {connect} from 'react-redux'
import {editTask} from '../actions'
import { MDBIcon, MDBBtn, MDBFormInline, MDBCardFooter,} from "mdbreact";

/******     Edit Task Controller     *******/
const EditTask = ({dispatch, id}) => {
    let input;
    return (
        <MDBCardFooter>
            <MDBFormInline

                onSubmit={e => {
                    e.preventDefault()
                    if (!input.value.trim()) {
                        return
                    }
                    {/******     connected to Redux action editTask(taskId, newtaskTitle)    *******/}
                    dispatch(editTask(id, input.value))
                    input.value = ''
                }}
            >
                <input  placeholder={'Edit Entry'} ref={node => (input = node)} />
                <MDBBtn  color="light-green" size={"sm"} type="submit">
                    <MDBIcon
                        className="mb-1"
                        icon="paper-plane"
                    />
                </MDBBtn>
            </MDBFormInline>
        </MDBCardFooter>
    )
}
export default connect()(EditTask);
