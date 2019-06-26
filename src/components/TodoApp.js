import React, { useReducer, useContext, useEffect, useRef } from 'react';

const Context = React.createContext();

const appReducer = (state, action) => {
	console.log('state', state);
	switch (action.type) {
		case 'RESET': {
			return action.payload;
		}
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
			return state.map((item) => {
				if (item.id === action.payload) {
					return {
						...item,
						completed: !item.completed
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

	const didRun = useRef(false);

	// useEffect(() => {
	// 	const raw = localStorage.getItem('data');
	// 	dispatch({ type: 'RESET', payload: JSON.parse(raw) });
	// }, []);

	useEffect(() => {
		if (!didRun.current) {
			const raw = localStorage.getItem('data');
			dispatch({ type: 'RESET', payload: JSON.parse(raw) });
			didRun.current = true;
		}
	});

	useEffect(
		() => {
			localStorage.setItem('data', JSON.stringify(state));
		},
		[ state ]
	);
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
