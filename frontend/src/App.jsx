import React from 'react'
import { Navbar, Header, Contacts, Footer } from './components'

const App = () => {
  return (
    <>
      <div className='w-full min-h-screen primary-color'>
        <Navbar/>
        <Header/>
      </div>
      <Contacts/>
      <Footer/>
    </>
  )
}

export default App