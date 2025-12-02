'use server';

import { stackServerApp } from '@/stack';
import { neon } from '@neondatabase/serverless';


// export const user = await stackServerApp.getUser();

export async function getUserDetails(userId: string | undefined) {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set');
  }

  if (!userId) {
    return null;
  }

  const sql = neon(process.env.DATABASE_URL!);
  const [user] =
    await sql`SELECT * FROM neon_auth.users_sync WHERE id = ${userId};`;
  return user;
}

// 로그인한 사람에게만 제공하기 
export async function getAllTodos() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set');
  }

  const user = await stackServerApp.getUser();
  const userId = user?.id;

  //로그인한 유저의 아이디랑 넘어온 아이디랑 같은지 검사
  if (!userId) {
    throw new Error('User ID is required to fetch todos');
  }

  const sql = neon(process.env.DATABASE_URL!);
  const todos = await sql`
    SELECT * FROM todos 
    WHERE user_id = ${userId}
    ORDER BY id DESC;`;
  return todos;
}

// // 완료체크
// export async function toggleTodoCompletion(todoId: number, completed: boolean) {
//   if (!process.env.DATABASE_URL) {
//     throw new Error('DATABASE_URL is not set');
//   }

//   const sql = neon(process.env.DATABASE_URL!);
//   const [updatedTodo] = await sql`
//     UPDATE todos
//     SET completed = ${completed}
//     WHERE id = ${todoId}
//     RETURNING *;
//   `;
//   return updatedTodo;
// }

// // 삭제
// export async function deleteTodoById(todoId: number) {
//   if (!process.env.DATABASE_URL) {
//     throw new Error('DATABASE_URL is not set');
//   }

//   const sql = neon(process.env.DATABASE_URL!);
//   await sql`
//     DELETE FROM todos
//     WHERE id = ${todoId};
//   `;
//   return { success: true };
// }