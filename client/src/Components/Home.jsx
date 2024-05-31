import React from 'react'
import { useContext } from 'react';
import { TransactionContext } from '../Context/crowdfunding';
import { Link } from 'react-router-dom';


export const Home = () => {
    const {ConnectWallet,Account} = useContext(TransactionContext)
  return (
    <div>
         <header className="sticky top-0 z-50 bg-white shadow-sm dark:bg-gray-950 dark:text-gray-50">
        <div className="container flex h-16 items-center justify-between text-black px-4 md:px-6">
          <Link className="flex items-center gap-2" href="#">
            <h1>Do</h1>
            <span className="font-bold">nate</span>
          </Link>
          <nav className="hidden space-x-4 sm:flex">
            <Link className="hover:underline "to="/Campaign">
             All Campagain
            </Link>
            <Link className="hover:underline" to="/Create">
              Create
            </Link>
            <Link className="hover:underline" to="/Dashboard">
              Dashboard
            </Link>
            
          </nav>
          <button variant="primary" className='border-1 border-solid border-gray-500 bg-black text-white py-1 rounded px-2' onClick={ConnectWallet}>Connect Wallet</button>
        </div>
      </header>
      <section className="bg-gray-100 py-20 h-screen ">
        <div className="container flex flex-col items-center text-center gap-6 px-4 md:px-6 lg:flex-row lg:items-start lg:gap-12 mt-[150px] ">
          <div className="space-y-4 text-center lg:text-left">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
             Donate who need it
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
               Donate your money who needs it
            </p>
            <p>Address ....{Account}</p>
           
          </div>
          
        </div>
      </section>
    </div>
  )
}

