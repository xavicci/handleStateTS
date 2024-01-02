import { UseState } from './UseState.tsx'
import { ClassState } from './ClassState.tsx'
import './App.css'

export function App() {

  return (
    <>
      <div className='App'>
        <UseState name='UseState' />
        <ClassState name='ClassState' />
      </div>

    </>
  )
}