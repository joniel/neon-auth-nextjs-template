// src/components/TodoForm.tsx

'use client'; 

import { createTodoAction } from '@/actions/todo'; // 👈 서버 액션을 임포트
import { useRef } from 'react';
import { useFormStatus } from 'react-dom'; // 👈 제출 상태를 확인하기 위해 필요 (권장)

// 제출 버튼 컴포넌트 (선택 사항: useFormStatus 사용 예시)
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} style={{ padding: '8px 15px' }} className='btn btn-primary'>
      {pending ? '저장 중...' : '저장'}
    </button>
  );
}

export function TodoForm() {
  const formRef = useRef<HTMLFormElement>(null);

  // 폼이 제출된 후 실행될 함수
  const handleSuccess = async (formData: FormData) => {
    // 폼 데이터를 서버 액션으로 전달하고 결과를 받습니다.
    const result = await createTodoAction(formData);

    if (result.success) {
      console.log('Todo 저장 성공:', result.todo);
      formRef.current?.reset(); // 폼 초기화
      // 사용자에게 성공 메시지 표시
    } else {
      alert(`저장 실패: ${result.message}`);
    }
  };


  return (
    // 'action'에 서버 액션 함수를 직접 전달합니다.
    <form ref={formRef} action={handleSuccess} style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
      <input
        type="text"
        name="title" // 👈 서버 액션이 데이터를 받을 수 있도록 name 속성 지정
        placeholder="새로운 할 일을 입력하세요..."
        style={{ padding: '8px', flexGrow: 1 }}
        className='input input-primary w-full max-w-xs'
      />
      <SubmitButton />
    </form>
  );
}