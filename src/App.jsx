import { useState } from 'react'
import './App.css'

import Timer from './components/Timer'
import Settings from './components/Settings'
import SettingsContext from './components/context/SettingsContext';

function App() {
  const [showSettings, setShowSettings] = useState(true);

  return (
    <main>
      <SettingsContext.Provider value={{
        workMinutes: 45,
        breakMinutes: 15,
      }}>
        {showSettings ? <Settings /> : <Timer />}
      </SettingsContext.Provider>
    </main>
  )
}

export default App
