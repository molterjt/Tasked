import React from 'react'
import PropTypes from 'prop-types'
import Task from './Task'
import { MDBRow, MDBCol,} from "mdbreact";

{/******     TaskList Component    *******/}
const TaskList = ({
      tasks, onTaskComplete, onDeleteTask, onAllowEdit,
      onDropTask, setTheTimer, countDown, onToggleSetTimerModal, onToggleTimerSwitch
    }) => (

    <MDBRow>
        { tasks ?
            tasks.map((task, index) => (

                <MDBCol md={"4"} key={index}
                        onDragOver={(e) => {
                            e.preventDefault();
                            console.log('dragging over')
                        }}
                        onDrop={(e) => onDropTask( e, index )}
                >
                    <Task
                        id={task.id}
                        key={index}
                        currentPosition={index}
                        text={task.text}
                        hours={task.hours}
                        minutes={task.minutes}
                        seconds={task.seconds}
                        totalTime={task.totalTime}
                        displayTime={task.displayTime}
                        highlight={task.highlight}
                        showEdit={task.showEdit}
                        showSetTimerModal={task.showSetTimerModal}
                        timerOn={task.timerOn}
                        onClick={() => {
                            console.log('onTaskComplete: ' + task.id + '==' + task.highlight);
                            onTaskComplete(task.id)
                        }}
                        onDel={() => {
                            console.log('onDeleteTask: ' + task.id + '==' );
                            onDeleteTask(task.id)
                        }}
                        allowEdit={() => {
                            console.log('onEditQuote: ' + task.id + '==' );
                            onAllowEdit(task.id)
                        }}
                        toggleSetTimerModal={() => onToggleSetTimerModal(task.id, task.showSetTimerModal)}

                        onTimerSet={ () => {
                            setTheTimer(task.id, task.hours, task.minutes);
                            onToggleSetTimerModal(task.id, task.showSetTimerModal);
                        } }
                        onCountDown={() => countDown(task.id, task.timerOn, task.seconds)}
                        onPauseCountDown={ () => console.log('onPause: ', task.timerObject)}
                        toggleTimer={ () => {
                            console.log('Switching the TimerOn state: ', task.timerOn);
                            onToggleTimerSwitch(task.id, task.timerOn);
                        }}
                    />
                </MDBCol>
        ))
        : 'No Tasks'
        }
    </MDBRow>

);
TaskList.propTypes = {
    tasks: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            highlight: PropTypes.bool,
            showEdit: PropTypes.bool,
            text: PropTypes.string,
            timerOn: PropTypes.bool,
            minutes: PropTypes.number,
            hours: PropTypes.number,
            showSetTimerModal: PropTypes.bool,
        })
    ),
    onTaskComplete: PropTypes.func,
    onDeleteTask: PropTypes.func,
    onAllowEdit: PropTypes.func,
    onDropTask: PropTypes.func,
    onShuffleTasks: PropTypes.func,
    setTheTimer: PropTypes.func,
    countDown: PropTypes.func,
    onToggleSetTimerModal: PropTypes.func,
    onToggleTimerSwitch: PropTypes.func,

};
export default TaskList;