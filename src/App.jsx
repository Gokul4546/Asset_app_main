import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <div className="flex justify-center items-center space-x-8 mb-8">
            <a 
              href="https://vitejs.dev" 
              target="_blank"
              className="block p-4 rounded-lg hover:bg-white/10 transition-colors duration-300 group"
            >
              <img 
                src={viteLogo} 
                className="h-16 w-16 mx-auto group-hover:scale-110 transition-transform duration-300" 
                alt="Vite logo" 
              />
            </a>
            <a 
              href="https://react.dev" 
              target="_blank"
              className="block p-4 rounded-lg hover:bg-white/10 transition-colors duration-300 group"
            >
              <img 
                src={reactLogo} 
                className="h-16 w-16 mx-auto group-hover:scale-110 transition-transform duration-300 animate-spin" 
                alt="React logo" 
                style={{ animationDuration: '20s' }}
              />
            </a>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8">
            Vite + React
          </h1>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-md mx-auto mb-8">
            <button 
              onClick={() => setCount((count) => count + 1)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 transform hover:scale-105 active:scale-95"
            >
              count is {count}
            </button>
            <p className="text-gray-600 dark:text-gray-300 mt-4">
              Edit <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">src/App.jsx</code> and save to test HMR
            </p>
          </div>
          
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Click on the Vite and React logos to learn more
          </p>
        </div>
      </div>
    </div>
  )
}

export default App