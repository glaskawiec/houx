# ✨Houx
Litleweight React plugin which implements flux architecture using the built-in React API.  
It connects React.Context with useReducer() from React Hooks to provide global reducers.

## :pencil: Prerequisites
*  [NPM](https://www.npmjs.com/) installed
*  [React 16.8.1](https://reactjs.org) or higher installed

## :hammer: Installation
Open you fav terminal in project root and type:
```
npm install --save houx
```

## ✍ Example project
```
https://github.com/glaskawiec/houxTasks
```

## ✌ Usage
Create your actions and reducers:
```
export const TASKS_ADD = 'TASKS_ADD';
export const TASKS_REMOVE = 'TASKS_REMOVE';
export const TASKS_COMPLETE = 'TASKS_COMPLETE';

export const initialState = {
    tasks: [],
    nextId: 0
}

const tasksReducer = (state = initialState, action) => {
    switch (action && action.type) {
        case TASKS_ADD:
            const newTodo = {
                ...action.task,
                id: state.nextId
            }
            ++state.nextId;
            return {
                ...state,
                tasks: [...state.tasks, newTodo]
            }
        case TASKS_REMOVE:
            --state.nextId;
            return {
                ...state,
                tasks: state.tasks.filter((task) => task.id !== action.id)
            }
            case TASKS_COMPLETE:
            return {
                ...state,
                tasks: state.tasks.filter((task) => task.id !== action.id)
            }
        default: return state;
    }
}

export default tasksReducer;
```

Use Provider and pass reducers to enable access to global state from any app component:
```
import React from 'react';
import { Provider, createStoreWithReducers } from 'houx';

const reducers = {
    tasks: tasksReducer
}

export default function App() {
  const store = createStoreWithReducers(reducers);
  return (
    <Provider store={store}>
        <AppContent/>
    </Provider>
  )
}

```
Access dispatch and global state using useHoux hook:
```
import React from 'react';
import { useHoux } from 'houx';
import { removeTask } from '../../../flux/actions/tasksActions';

export default function RemoveButton(props) {
    const [state, dispatch] = useHoux();

    const onClick = () => {
        dispatch(removeTask(props.itemId));
    }

    return (
        <span
            className="cursor-pointer"
            style={{ marginLeft: '0.5em' }}
            onClick={onClick}
            role="img"
            aria-label="cross">❌</span>
    )
}
```

---
##### glaskawiec © 2019 - MIT license
