import React, { useReducer } from 'react';

const appReducer = (state, action) => {
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
		default: {
			return state;
		}
	}
};

export default function TodosApp() {
	const [ state, dispatch ] = useReducer(appReducer, []);
	return (
		<div>
			Todos App
			<button onClick={() => dispatch({ type: 'ADD_TODO' })}>New Todo</button>
			{state.map((item) => <div key={item.id}>{item.id}</div>)}
		</div>
	);
}
