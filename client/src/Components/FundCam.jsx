import React, { useEffect } from 'react';
import { TransactionContext } from '../Context/crowdfunding';
import { useState,useContext } from 'react';

export const FundCam = () => {
  const { cards,fundcamp} = useContext(TransactionContext)
  useEffect(() => {
       console.log(cards.current) 
  },[])
  const [amount, setamount] = useState(null)
  return (
    <div>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 py-12 md:py-16 lg:py-20 px-4 md:px-6 max-w-6xl mx-auto">
        <div className="flex flex-col gap-4">
          <img
            alt="Product Image"
            className="aspect-square object-cover border border-gray-200 h-[300x] rounded-lg overflow-hidden dark:border-gray-800"
            height={200} 
            src={cards.current.image}
            width={400} 
          />
        </div>
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
              <h2 className="text-xl font-semibold">{cards.current.title}</h2>

            
            <p className="text-gray-500 dark:text-gray-400">
              {cards.current.discription}
            </p>
          </div>
          <div className="grid gap-4">
            <div>
              <h2 className="text-xl font-semibold">category -{cards.current.category}</h2>
              
              
              <div className="mt-4 flex items-center">
                
                <input className="w-full max-w-md" placeholder="Amount" type="text" onChange={(e) => setamount(e.target.value)}/>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold">{cards.current.require}</h2>
              <div className="mt-2 space-y-2 text-gray-500 dark:text-gray-400">
                
                <div className="flex justify-between">
                  <span>Required money</span>
                  <span>{cards.current.require}Eth</span>
                </div>
                <div className="flex justify-between">
                  <span>Donated money</span>
                  <span>{cards.current.collectedamount}Eth</span>
                </div>
               
              </div>
            </div>
            
            <button size="lg" onClick={() => fundcamp(cards.current.id,amount)}>Donate</button>
          </div>
        </div>
      </section>
     
    
  


    </div>
  )
}

