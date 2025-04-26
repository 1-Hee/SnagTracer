import { useState } from "react";

const App = () => {
  const [isSideOpen, setIsSideOpen] = useState(true);

  return(
    <div className="flex flex-col h-screen">
      {/* top bar */}
      <header className="h-14 bg-blue-600 text-white flex items-center px-4">
        <button
          onClick={()=>{setIsSideOpen(!isSideOpen)}}
          className="mr-4 text-xl"
        >
          ☰         
        </button>
        <h1 className="text-lg font-bold">Dashbaord</h1>
      </header>
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`transition-all duration-300 bg-gray-800 text-white ${isSideOpen ? 'w-64' : 'w-0'} overflow-hidden`}
        >
          <div className="p-4">
            <ul>
              <li className="mb-2">item1</li>
              <li className="mb-2">item2</li>
              <li className="mb-2">item3</li>
            </ul>
          </div>
        </aside>
        {/* Main Content */}
        <main className="flex-1 bg-gray-50 p-6 overflow-auto">
          <h2 className="text-2xl font-semibold mb-4">This is Test</h2>
          <p>This is  Test2</p>
        </main>
      </div>
    </div>
  )
}

export default App;