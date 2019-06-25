import React, { useReducer, useContext } from 'react';

const Context = React.createContext();

const appReducer = (state, action) => {
	console.log('state', state);
	switch (action.type) {
		case 'ADD_TODO': {
			return [
				...state,
				{
					id: Date.now(),
					text: '',
					completed: false
				}
			];
		}
		case 'DELETE_TODO': {
			return state.filter((item) => item.id !== action.payload);
		}
		case 'COMPLETED': {
			state.map((item) => {
				if (item.id === action.payload) {
					return {
						...item,
						completed: item.completed
					};
				}
				return item;
			});
		}
		default: {
			return state;
		}
	}
};

export default function TodosApp() {
	const [ state, dispatch ] = useReducer(appReducer, []);
	return (
		<Context.Provider value={dispatch}>
			<h1>Todos App</h1>
			<button onClick={() => dispatch({ type: 'ADD_TODO' })}>New Todo</button>
			<TodoList items={state} />
		</Context.Provider>
	);
}

function TodoList({ items }) {
	return items.map((item) => <TodoItem key={item.id} {...item} />);
}

function TodoItem({ id, text, completed }) {
	const dispatch = useContext(Context);
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'space-between'
			}}
		>
			<input type="checkbox" checked={completed} onChange={() => dispatch({ type: 'COMPLETED', payload: id })} />
			<input type="text" defaultValue={text} />
			<button onClick={() => dispatch({ type: 'DELETE_TODO', payload: id })}>Delete</button>
		</div>
	);
}
