// src/actions/todo.ts (getUser 및 getAuthJson 사용)

'use server'; 

import { stackServerApp } from '@/stack';
// 필요한 타입만 임포트합니다.
// import { CurrentServerUser } from 'stackframe//stack-app.d.ts'; // 실제 경로에 맞게 수정 필요

const NESTJS_API_BASE_URL = process.env.NEXT_PUBLIC_NESTJS_API_URL || 'http://localhost:3000';

export async function createTodoAction(formData: FormData) {
  const title = formData.get('title') as string;

  if (!title || title.trim() === '') {
    return { success: false, message: '제목을 입력해주세요.' };
  }

  try {
    // 1. 사용자 객체를 가져옵니다. (CurrentServerUser 타입)
    const user = await stackServerApp.getUser();
    
    if (!user) {
        return { success: false, message: '사용자 세션을 찾을 수 없습니다. (로그인 필요)' };
    }
    
    // 2. 사용자 객체(CurrentServerUser)에 포함된 getAuthJson() 메서드를 사용하여 토큰을 가져옵니다.
    // user는 Auth 타입을 포함하므로 이 메서드가 존재합니다.
    const authJson = await user.getAuthJson();
    const accessToken = authJson.accessToken;

    if (!accessToken) {
        return { success: false, message: 'Access Token을 가져올 수 없습니다.' };
    }
    
    // 3. NestJS 백엔드로 POST 요청을 보냅니다.
    const response = await fetch(`${NESTJS_API_BASE_URL}/todos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 4. Access Token을 Authorization 헤더에 포함하여 보냅니다.
            'Authorization': `Bearer ${accessToken}`, 
        },
        body: JSON.stringify({
            title: title.trim(),
        }),
        cache: 'no-cache',
    });

    if (!response.ok) {
        // ... (에러 처리 로직은 이전과 동일)
        const errorData = await response.json();
        console.error('NestJS API 에러:', response.status, errorData);
        return { 
            success: false, 
            message: `NestJS 서버 에러: ${response.status} - ${errorData.message || '알 수 없는 에러'}`,
        };
    }

    const newTodo = await response.json();
    
    // TODO: revalidatePath를 사용하여 목록 갱신

    return { success: true, todo: newTodo };

  } catch (error) {
    console.error('서버 액션 처리 중 예외 발생:', error);
    return { success: false, message: '네트워크 또는 서버 연결에 실패했습니다.' };
  }
}