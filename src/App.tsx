import './App.css'
import { BrowserRouter } from 'react-router-dom'
import RoutesApp from './router'
import 'react-multi-carousel/lib/styles.css';

function App() {

  return (
    <div className='bg-neutral-100'>
      <BrowserRouter>
        <RoutesApp>
        </RoutesApp>
      </BrowserRouter>
    </div>
  )
}

export default App
