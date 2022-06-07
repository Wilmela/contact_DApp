import { createContext, useEffect, useState } from "react";
import { contractABI, contractAddress } from "../utils/constants";
import {ethers} from 'ethers';

const { ethereum } = window;

export const ContactsContext = createContext();

const getEthereumContract =()=>{
    if(!ethereum) return alert('Please install Meta mask ');
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress,contractABI,signer);

    return contract;
}

export const ContactsProvider = ({ children }) => {

    const [currentAccount, setCurrentAccount] = useState('');
    const [contacts, setContacts] = useState({firstName:'', lastName:'', phoneNumber: 0});
    const [contactCount, setContactCount] = useState(window.localStorage.getItem('contactCount'));
    const [availableContacts, setAvailableContacts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    const checkForWallet = async () =>{
        if(!ethereum)return alert('Please install Meta mask');
        const accounts = await ethereum.request({method: 'eth_accounts'});

        try {
            if(accounts){
                setCurrentAccount(accounts[0])
                fetchContacts()
           
            }else{
                console.log('No accounts found')
            }
        } catch (error) {
            console.log(error)
            throw new Error('No ethereum object found')
        }
    }

    const connectWallet = async () => {
       if (!ethereum) return alert("Please install Meta mask");
       const accounts = await ethereum.request({ method: "eth_requestAccounts", });

       try {
         if (accounts) {
           setCurrentAccount(accounts[0]);
         } else {
           console.log("No accounts found");
         }
       } catch (error) {
         console.log(error);
         throw new Error("No ethereum object found");
       }
    };

    const handleChange = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setContacts(prev =>({...prev, [name]: value}))
    }

    const fetchContacts = async ()=>{
        
        try {
            if(ethereum){
                const contract = getEthereumContract();
                const availableContact = await contract.getAllContacts();
                
                const structuredContacts = availableContact.map((contact)=>({
                    firstName: contact.firstName,
                    lastName: contact.lastName,
                    phoneNumber: parseInt(contact.phoneNumber),
                    timestamp: new Date(contact.timestamp.toNumber() * 1000).toLocaleString()
                }))

                setAvailableContacts(structuredContacts);
            
            }else{
                console.log('No ethereum object found')
            }
        } catch (error) {
            console.log(error)
            throw new Error('No ethereum object found!');
        }
    }
    
    const checkIfContractExists = async ()=>{
        try {
            if(ethereum){
                const contract = getEthereumContract();
                const contactCount = await contract.getContactCount();
                
                window.localStorage.setItem('contactCount', contactCount)
                
            }else{
                console.log('No ethereum object found')
            }
        } catch (error) {
            console.log(error);
            throw new Error('No ethereum object found')
        }
    }
   
    const addContact = async ()=>{
        try {
            if(ethereum) {
                const { firstName, lastName, phoneNumber } = contacts;
                const contract = getEthereumContract();

                const contactHash = await contract.addToBlockchain(firstName, lastName, phoneNumber);
                
                console.log(`adding contact with hash ${contactHash.hash}`);
                setIsLoading(true);
                await contactHash.wait(); 
                setIsLoading(false);
                console.log(`successfully add contact with hash ${contactHash.hash}`);

                const contactCount = await contract.getContactCount();
                setContactCount(contactCount.toNumber());

                window.location.reload();

            }else{
                console.log('No ethereum object found')
            }
                
            } catch (error) {
                console.log(error);
                throw new Error('No ethereum object found!')
        }
    }

    useEffect(() => {
      checkForWallet();
      checkIfContractExists()
    }, [contactCount])
    
  return (
    <ContactsContext.Provider value={{currentAccount, connectWallet,handleChange, contacts, addContact, availableContacts, isLoading}}>
      {children}
    </ContactsContext.Provider>
  );
};
