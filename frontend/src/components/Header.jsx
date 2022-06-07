import {useContext} from 'react';
import {ContactsContext} from '../context';
import Loader from './Loader';

import { shortenAddress } from '../utils/shortenAddress';

const Header = () => {
  const inputStyle = "p-2 mt-2 w-full rounded-md hover:bg-gray-100";
  
  const {currentAccount, connectWallet, handleChange, contacts, addContact, isLoading} = useContext(ContactsContext)

  const submitContact = (e)=>{
    e.preventDefault();
    
    const {firstName, lastName, phoneNumber} = contacts;

    if(!firstName || !lastName || !phoneNumber) return alert('Please fill the form');

    addContact();
  }
  return (
    <div id='Home' className='w-full lg:mt-16 flex justify-center items-center px-8 mt-8'>
      <div className="w-full md:10/12 flex flex-col lg:flex-row justify-center items-center">
      
      <div className='mt-4 sm:mt-8 lg:w-6/12 flex flex-col justify-center items-center'>
        <h1 className='text-white text-5xl mb-6 font-bold sm:text-7xl'>Keep <span className='uppercase text-[#A92E3E]'>contacts</span></h1>
        <p className='text-[#91CCFB] text-2xl font-semibold '>
        Add contact to the blockchain in just a click!
        </p>
      </div>
      
      <div className='w-full lg:w-5/12 sm:mb-4 p-4 mt-12 rounded-md flex flex-col items-center justify-evenly white-glassmorphism'>
          <input type='text' name='firstName' placeholder='Enter first name' onChange={handleChange} className={inputStyle}/>
          <input type='text' name='lastName' placeholder='Enter last name' onChange={handleChange} className={inputStyle}/>
          <input type='number' name='phoneNumber' placeholder='Enter phone number' onChange={handleChange} className={inputStyle}/>
          {!currentAccount && <button className='mt-4 p-2 text-white font-bold rounded-md w-full accent-color' onClick={connectWallet}>Connect Wallet</button>}
         {isLoading ? <Loader/> : <button className='mt-4 p-2 text-white font-bold rounded-md w-full accent-color hover:bg-red-800' onClick={submitContact}>Add Contact</button>}
        
         <h1 className='text-white my-4 text-lg bg-gray-500 p-2 rounded-lg'>{shortenAddress(currentAccount)}</h1>
      </div>
      </div>
    </div>
  )
}

export default Header