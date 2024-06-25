import React from 'react'
import { useContext } from 'react';
import { TransactionContext } from '../Context/crowdfunding';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';


export const Home = () => {
    const {ConnectWallet,Account} = useContext(TransactionContext)
  return (
    <div>
        <Navbar/>
      <section className="bg-gray-100 py-20 h-screen ">
        <div className="container flex flex-col items-center text-center gap-6 px-4 md:px-6 lg:flex-row lg:items-start lg:gap-12 mt-[150px] ">
          <div className="space-y-4 text-center lg:text-left">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
             Donate who need it
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
               Donate your money who needs it
            </p>
            {Account ? <p>Address ....{Account}</p> : (<button onClick={ConnectWallet}>connect</button>)}
           
          </div>
          
        </div>
      </section>
    </div>
  )
}

