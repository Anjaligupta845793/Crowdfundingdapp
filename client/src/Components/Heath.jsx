import React, { useContext,useEffect,useRef,useState } from 'react'
import { TransactionContext } from '../Context/crowdfunding';
import { FundCam } from './FundCam';
import { Loader } from './Loader';

export const Health = () => {
    const {health,healthloader,healthdiscription,cardclick} = useContext(TransactionContext);
    const [show, setshow] = useState(false)
     
   
    useEffect(() => { 
     
    
     
    }, [])
   
    
  return (
   <>
   {show ? <FundCam/> : (
     <div>
    {healthloader ? <Loader/> : (
      <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid gap-6 md:gap-8 px-4 md:px-6 max-w-xl mx-auto lg:max-w-none">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
          <div className="grid gap-1">
            <h2 className="text-2xl font-bold tracking-tight">health campaigns</h2>
            <p className="text-gray-500 dark:text-gray-400">donate our selection of campaign by category.</p>
             
             
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
         {
            
             
             health.current.map((item,index) => (
                <div className="grid gap-4 relative group border-solid border-1 border-gray-400 w-[300px] rounded  ">
            
            <img
              alt="Apparel"
              className="rounded-lg object-cover  h-[200px] aspect-[1/1] group-hover:opacity-50 transition-opacity"
              height="450"
              src={item.image}
              width="400"
            />
            <div className="grid gap-1 px-2  pb-5">
              <h3 className="font-semibold">{item.title}</h3>
             
              
               <p>{ healthdiscription.length && healthdiscription.current[index].discription}</p>
              
              <p className="text-sm leading-none">{item.category}</p>
               <button className='border-1 border-solid border-gray-500 bg-black text-white py-1 rounded px-2' onClick={() => cardclick(item,setshow)}>donate</button>
             
              
            </div>
          </div>
            )) 
            
           
          }  
           
          
        </div>
      </div>
    </section>
    )}
  </div>
   )}
   </>
  )
}

