'use client';
import { getAllTodos } from '@/app/actions';
import { stackServerApp } from '@/stack';
import { get } from 'http';
import React, { useEffect } from 'react'

export default function List({ todos, userData }: {
    todos: Array<{ id: number; title: string; completed: boolean }>; 
    userData: { id: string; displayName: string | null; primaryEmail: string | null } | null;
}) {

    // const [todos, setTodos] = React.useState<Array<{ id: number; title: string; completed: boolean }>>([]);
    // useEffect(() => {


    //     const getAllTodosT = async () => {
    //         getAllTodos().then((data: any) => {
    //             console.log('Todos fetched with user ID:', data);
    //             setTodos(data);
    //         });
    //     };

    //     getAllTodosT();

    // }, []);

    return (
        <div>List


            {todos.length > 0 && todos.map((todo: { id: number; title: string; completed: boolean }) => (
                <div key={todo.id} className="flex items-center gap-4">
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        readOnly
                        className="checkbox checkbox-primary"
                    />
                    <span className={todo.completed ? 'line-through text-gray-500' : ''}>
                        {todo.title}
                    </span>
                </div>
            ))}

        </div>
    )
}
