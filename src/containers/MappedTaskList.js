import { connect } from 'react-redux'
import {
    highTask, removeTask, allowEdit, onDropTask, onToggleSetTimerModal,
    setTimer, countDown,onToggleTimerSwitch,
} from '../actions'
import TaskList from '../components/TaskList'

const mapStateToProps = (state) => ({
        tasks: state.allTasks
    });

const mapDispatchToProps = dispatch => ({
    onTaskComplete: id => {
            dispatch(highTask(id))
    },
    onDeleteTask: id => {
        dispatch(removeTask(id))
    },
    onAllowEdit: id => {
        dispatch(allowEdit(id))
    },
    onDropTask: (e, dropSpot) => {
        dispatch(onDropTask(e, dropSpot))
    },
    setTheTimer: (id, hours, minutes) => {
        dispatch(setTimer(id, hours, minutes))
    },
    countDown: (id, timerOn, seconds) => {
        dispatch(countDown(id, timerOn ,seconds))
    },
    onToggleSetTimerModal: (id, showSetTimerModal) => {
        dispatch(onToggleSetTimerModal(id, showSetTimerModal))
    },
    onToggleTimerSwitch: (id, timerOn) => {
        dispatch(onToggleTimerSwitch(id, timerOn))
    },
});
{/******     state and props mapped to TaskList Component    *******/}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskList);