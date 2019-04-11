export const ADD_TASK = "ADD_TASK";
export const REMOVE_TASK = "REMOVE_TASK";
export const EDIT_TASK = "EDIT_TASK";
export const HIGH_TASK = "HIGH_TASK";
export const ALLOW_EDIT = "ALLOW_EDIT";
export const DRAG_TASK = "DRAG_TASK";
export const PAUSE_TIMER = "PAUSE_TIMER";
export const START_TIMER = "START_TIMER";
export const SET_TIMER = "SET_TIMER";
export const TOGGLE_SET_TIMER_MODAL = "TOGGLE_SET_TIMER_MODAL";
export const SELECT_HOURS = "SELECT_HOURS";
export const SELECT_MINUTES = "SELECT_MINUTES";
export const COUNT_DOWN = "COUNT_DOWN";
export const TOGGLE_TIMER_SWITCH = "TOGGLE_TIMER_SWITCH";


export const onToggleTimerSwitch = (id, timerOn) => ({
    type: TOGGLE_TIMER_SWITCH,
    id,
    timerOn
});

export function countDown(id, timerOn, seconds){
    if(seconds > 0) {
        return {
        type: COUNT_DOWN,
        id,
        timerOn,
        seconds
        }
    }
};

export const setTimer = (id, hours, minutes) => ({
    type: SET_TIMER,
    id,
    hours,
    minutes,

});

export const onToggleSetTimerModal = (id, showSetTimerModal) => ({
    type: TOGGLE_SET_TIMER_MODAL,
    id,
    showSetTimerModal
});

export const pauseTimer = (timerOn) => ({
    type: PAUSE_TIMER,
    timerOn
});


export const selectHours = (hours, id) => ({
    type: SELECT_HOURS,
    hours,
    id
});
export const selectMinutes = (minutes, id) => ({
    type: SELECT_MINUTES,
    minutes,
    id
});



let TaskEntry = 0;

export const addTask = (text) => ({
    type: ADD_TASK,
    id: TaskEntry++,
    text,
    hours:0,
    minutes:0,
    seconds:0,
    totalTime:'',
    displayTime: "0:00:00",
    timerOn: false,
});

export function removeTask(id) {
    return {
        type: REMOVE_TASK,
        id
    }
}

export function editTask(id, text) {
    return {
        type: EDIT_TASK,
        id,
        text
    }
}

export const highTask = (id) => ({
    type: HIGH_TASK,
    id
});

export const allowEdit = (id) => ({
    type: ALLOW_EDIT,
    id
});

export const onDropTask = (ev, dropSpot) => ({
    type: DRAG_TASK,
    ev,
    dropSpot
});

