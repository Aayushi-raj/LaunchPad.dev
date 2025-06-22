"use client"
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md dark:bg-neutral-800">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800 dark:text-white">Sign In</h2>
        <button
          onClick={() => router.push("/dashboard")}
          className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
        >
          Continue as Guest
        </button>
      </div>
    </div>
  );
}