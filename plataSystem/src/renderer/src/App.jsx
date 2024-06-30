import Routers from './components/Routers'

function App() {
  const ipcHandle = () => window.electron.ipcRenderer.send('ping')

  return (
    <>
      <Routers />
    </>
  )
}

export default App
