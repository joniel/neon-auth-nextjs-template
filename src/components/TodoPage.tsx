// TodoPage.tsx (클라이언트 컴포넌트)
'use client';
import { useState } from 'react';
import TodoForm from './TodoForm';
import List from './List';

export function TodoPage({ initialTodos, userData }: {
    initialTodos: any[]; 
    userData: { id: string; displayName: string | null; primaryEmail: string | null } | null;
}) {
    const [todos, setTodos] = useState(initialTodos);
    // handleAdd 등 상태 관리

    const handleAdd = (newTodo:{ id: number; title: string; completed: boolean }) => {
        setTodos([newTodo, ...todos]);
    };

    return (
        <>
            <TodoForm onAdd={handleAdd} userData={userData} />
            <List todos={todos} userData={userData} />
        </>
    );
}