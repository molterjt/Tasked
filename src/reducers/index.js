import {combineReducers} from 'redux';
import {
    ADD_TASK, REMOVE_TASK, EDIT_TASK,
    HIGH_TASK, ALLOW_EDIT, DRAG_TASK,
    SET_TIMER, TOGGLE_SET_TIMER_MODAL,
    COUNT_DOWN, SELECT_MINUTES, SELECT_HOURS, TOGGLE_TIMER_SWITCH,
} from '../actions';


export const allTasks = (state=[], action) => {
    switch(action.type){
        case ADD_TASK:
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    hours: action.hours,
                    minutes: action.minutes,
                    seconds: action.seconds,
                    totalTime: action.totalTime,
                    displayTime: action.displayTime,
                    timerOn: action.timerOn,
                    highlight: false,
                    showEdit: false,
                    showSetTimerModal: false
                }
            ];
        case REMOVE_TASK:
            return state.filter(task => task.id !== action.id);
        case EDIT_TASK:
            return state.map(task =>
                task.id === action.id
                    ? Object.assign({}, task, {text:action.text, highlight: false, showEdit: false })
                    : task
            );
        case HIGH_TASK:
            return state.map(task =>
                task.id === action.id
                    ? Object.assign({}, task, { highlight: !task.highlight })
                    : task
            );
        case TOGGLE_SET_TIMER_MODAL:
            return state.map(task =>
                task.id === action.id
                    ? Object.assign({}, task, { showSetTimerModal: !task.showSetTimerModal })
                    : task
            );

        case ALLOW_EDIT:
            return state.map(task =>
                task.id === action.id
                    ? Object.assign({}, task, { showEdit: !task.showEdit })
                    : task
            );
        case DRAG_TASK:

            let item = action.ev.dataTransfer.getData("DragTask");
            return buildNewTaskList(state, item, action.dropSpot);


        case SELECT_MINUTES:
            return state.map(task =>
                task.id === action.id
                ? Object.assign( {}, task, {minutes: action.minutes})
                : task
            );

        case SELECT_HOURS:
            return state.map(task =>
                task.id === action.id
                ? Object.assign({}, task, {hours: action.hours})
                : task
            );

        case SET_TIMER:
            return state.map(task =>
                task.id === action.id
                ? Object.assign(
                    {},
                    task,
                    {
                        displayTime: onTimerSet(action.hours, action.minutes),
                        seconds: calculateSeconds(action.hours, action.minutes),
                        hours: 0,
                        minutes: 0,
                    }
                )
                : task
            );
        case TOGGLE_TIMER_SWITCH:
            return state.map(task =>
                task.id === action.id
                ? Object.assign(
                    {},
                    task,
                    {
                        timerOn: !task.timerOn,
                    }
                )
                : task
            );
        case COUNT_DOWN:
            return state.map(task =>
                (task.id === action.id && task.seconds >= 0)
                ? Object.assign(
                    {},
                    task,
                    {
                        timerOn: stopTimer(task.seconds),
                        seconds: countDownSeconds(task.seconds),
                        displayTime: prepareDisplayTime(task.seconds),

                    }
                    )
                : task
            );
        default:
            return state;
    }
}


function countDownSeconds(taskSeconds){
    if(taskSeconds > 0){
        let timeLeft = taskSeconds - 1;
        return timeLeft;
    }
}

function timerBlackout(taskSeconds, taskHighlight){
    if(taskSeconds === 0){
        return !taskHighlight
    }
}

function stopTimer(taskSeconds){
    if(taskSeconds === 0){
        return false;
    }
    return true;
}

function prepareDisplayTime(sec){
    const hours = Math.floor( parseInt(sec) / 3600);
    console.log('hours', hours);
    let remainderMins = sec%3600;
    let mins = Math.floor(remainderMins/60);
    let remainderSecs = remainderMins%60;
    let secs = Math.ceil(remainderSecs);
    if(mins < 10){
        mins = "0"+mins;
    }
    if(secs < 10 && secs > 0){
        secs = "0"+secs;
    }
    if(secs === 0){
        return "0:00:00";
    }
    return `${hours}:${mins}:${secs}`
}

function onTimerSet(hrs, mins){
    let displayMins = mins;
    if(mins < 10){
        displayMins = "0"+mins;
    }
    return `${hrs}:${displayMins}:00`
}

function calculateSeconds(hrs, mins){
    let hoursToMin=0;
    if(hrs > 0){
        hoursToMin = hrs * 60;
    }
    let allMins = parseInt(hoursToMin) + parseInt(mins);
    return (allMins * 60);

}

function buildNewTaskList (array, currentPosition, dropSpot){
    let currentTasks = array.slice();
    let task = array[currentPosition];
    currentTasks.splice(currentPosition, 1);
    return [
        ...currentTasks.slice(0, dropSpot),
        task,
        ...currentTasks.slice(dropSpot)
     ];
}

{/******     Root Reducer supplied to Redux Store    *******/}
export default combineReducers({
    allTasks,
});

    
   


