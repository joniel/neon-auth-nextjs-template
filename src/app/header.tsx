import { getUserDetails } from '@/app/actions';
import { stackServerApp } from '@/stack';
import Link from 'next/link';
import Image from 'next/image';

export async function Header() {
  const user = await stackServerApp.getUser();
  const app = stackServerApp.urls;
  const userProfile = await getUserDetails(user?.id);

  return (
    <header className="w-full flex justify-between items-center px-6 py-4 z-10">
      <div className="font-medium text-[15px] tracking-tight">
        {/* 네온 이용 가능성 테스팅 */}
        
      </div>
      {user ? (
        <div className="flex items-center gap-4">
          <span className='inline-flex h-8 items-end flex-col'>
            {userProfile?.name && <span className="text-[14px] text-gray-600 dark:text-gray-300">
              {`Hello, ${userProfile?.name.split(' ')[0]}`}
            </span>}
            <Link
              href={app.signOut}
              className="btn btn-ghost btn-sm text-[13px] font-medium"
            >
              Sign Out
            </Link>
          </span>
          {
            userProfile?.raw_json.profile_image_url &&
            <Image
              src={userProfile?.raw_json.profile_image_url}
              alt="User avatar"
              width={32}
              height={32}
              className="rounded-full"
            />
          }
{/* 
          <pre>
            {JSON.stringify(user, null, 2)}
          </pre>

          <pre>
            {JSON.stringify(userProfile, null, 2)}
          </pre> */}

        </div>
      ) : (
        <div className="flex items-center gap-3">
          <Link
            href={app.signIn}
            className="btn btn-outline btn-sm text-[13px] font-medium"
          >
            Log In
          </Link>
          <Link
            href={app.signUp}
            className="btn btn-primary btn-sm text-[13px] font-medium"
          >
            Sign Up
          </Link>
        </div>
      )}
    </header>
  );
}
