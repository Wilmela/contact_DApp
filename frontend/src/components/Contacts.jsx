import { useContext } from "react";
import { ContactsContext } from "../context";

import IMG from  "../assets/images/placeHolder.png"

const Contact = ({ firstName, lastName, phoneNumber, timestamp }) => (

  <div className="primary-color m-4 p-4 w-74 sm:w-64 rounded-md shadow-md hover:bg-[#033553] cursor-pointer">
    <div className="">
      <img src={IMG} alt="photo" className="z-0" />
      <div className="w-full py-2 px-4 z-10 mt-2 bg-[#A92E3E] text-white rounded-full text-center">
        <p></p>
        {timestamp}
      </div>
    </div>
    <div className="mt-2">
      <div className="white-glassmorphism p-6 text-white rounded-md">
        <p>First name: {firstName}</p>
        <p>Last name: {lastName}</p>
        <p>Phone number: {phoneNumber}</p>
      </div>
    </div>
  </div>
);

const Contacts = () => {
  const { availableContacts } = useContext(ContactsContext);

  return (
    <div id="Contacts" className="w-full bg-[#F1F5F8] px-12 pt-6" >
     
      {availableContacts.length == 0 ? (
        <h1 className="text-center text-3xl text-[#A92E3E] font-bold my-2">Please connect a wallet to see contacts</h1>
      ) : (
        <h1 className="text-center text-3xl text-[#A92E3E] font-bold my-2">Available contacts</h1>
      )}

      <div className="w-full flex flex-col sm:flex-row flex-wrap justify-center items-center">
        {availableContacts.reverse().map((contact, i) => (
          <Contact key={i} {...contact} />
        ))}
      </div>
    </div>
  );
};

export default Contacts;
