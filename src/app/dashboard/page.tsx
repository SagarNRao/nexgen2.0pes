// cognitium/src/app/dashboard/page.tsx
'use client'

import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useSession } from '@/providers/SessionProvider'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function Dashboard() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const { username } = useSession()

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) console.error('Error signing out:', error)
    else router.push('/')
  }

  if (!username) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full border-b border-gray-800 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Welcome, {username}</h1>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 rounded-md text-sm text-gray-300 hover:text-white border border-gray-700 hover:border-gray-600 transition-all duration-200"
          >
            Sign out
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="max-w-2xl w-full space-y-8 text-center">
          <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            What do you want to learn today?
          </h2>
          
          {/* Chat input */}
          <div className="w-full mt-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Type your learning goals here..."
                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white transition-all duration-200"
              />
              <button 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-blue-400 transition-all duration-200 hover:scale-110"
                aria-label="Send message"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Topic pills */}
          <div className="flex gap-2 mt-8 justify-center items-center overflow-x-auto no-scrollbar py-2">
            <button className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-full hover:border-blue-500 hover:bg-gray-800 transition-all duration-200 hover:scale-105">
              <span className="text-sm font-medium text-gray-300">Arrays</span>
            </button>
            <button className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-full hover:border-green-500 hover:bg-gray-800 transition-all duration-200 hover:scale-105">
              <span className="text-sm font-medium text-gray-300">Strings</span>
            </button>
            <button className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-full hover:border-purple-500 hover:bg-gray-800 transition-all duration-200 hover:scale-105">
              <span className="text-sm font-medium text-gray-300">Binary Search</span>
            </button>
            <button className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-full hover:border-yellow-500 hover:bg-gray-800 transition-all duration-200 hover:scale-105">
              <span className="text-sm font-medium text-gray-300">Linked Lists</span>
            </button>
            <button className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-full hover:border-red-500 hover:bg-gray-800 transition-all duration-200 hover:scale-105">
              <span className="text-sm font-medium text-gray-300">Recursion</span>
            </button>
            <button className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-full hover:border-pink-500 hover:bg-gray-800 transition-all duration-200 hover:scale-105">
              <span className="text-sm font-medium text-gray-300">Trees</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
