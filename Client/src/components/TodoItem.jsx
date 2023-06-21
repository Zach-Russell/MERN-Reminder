import React, { useCallback, useState, useEffect, useContext } from 'react';
import { useQueryClient, useMutation, QueryClient } from 'react-query';
import updateTodoRequest from '../api/updateTodoRequest';
import deleteTodoRequest from '../api/deleteTodoRequest';
import { debounce } from 'lodash';
import { TokenContext } from '../App';

export const TodoItem = ({todo}) => {

    const [text, setText] = useState(todo.text);
    const [token] = useContext(TokenContext);

    const queryClient = useQueryClient();


    const {mutate: updateTodo} = useMutation(
        (updatedTodo) => updateTodoRequest(updatedTodo, token),

        {
        onSettled: () => {
            queryClient.invalidateQueries('todos');
        },
        }
    );


    const {mutate: deleteTodo} = useMutation(
        (updatedTodo) => deleteTodoRequest(updatedTodo, token),

        {
        onSettled: () => {
            queryClient.invalidateQueries('todos');
        },
        }
    );



    const debouncedUpdateTodo = useCallback(debounce(updateTodo, 600), [updateTodo]);

    useEffect(() => {
        if (text != todo.text){
            debouncedUpdateTodo({
                ...todo,
                text,
            });
        }
    }, [text]);



    // const updateText = (e) => {
    //     const newText = e.target.value;

    // }

    return (
        <div
          style={{
            marginBottom: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <input
            className="my__checkbox"
            checked={todo.completed}
            type="checkbox"
            style={{
              marginRight: '5px',
              height: '34px',
              width: '34px',
            }}
            onChange={() =>
              updateTodo({
                ...todo,
                completed: !todo.completed,
              })
            }
          />
    
          <input
            style={{
              padding: '8px',
              marginRight: '6px',
            }}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
    
          <button
            style={{
              padding: '5px',
              height: '35px',
              outline: 'none',
              border: 'none',
              color: 'white',
              backgroundColor: '#cc5a5a',
            }}
            onClick={() => deleteTodo(todo)}
          >
            Delete
          </button>
        </div>
      );
    };