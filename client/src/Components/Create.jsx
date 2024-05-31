import React, { useContext } from 'react'
import { TransactionContext } from '../Context/crowdfunding';

const Create = () => {
    const {ConnectWallet,Account,setitem,setamount,amount,imagehandler,discription,setdiscription,setcategory,discriptionhandler,settitle,category} = useContext(TransactionContext );
    const submit = (e) => {
      e.preventDefault();
      console.log(item,amount,discription)
    }
    
  return (
    <div className="w-full h-screen">
        
        <div className="container m-auto lg:max-w-[1023px] md:max-w-[767px] ">
              

            <form action=""  className='flex flex-col  mt-[100px] '>
               <h1 className='text-center font-bold text-3xl mt-3'>Add your Campaign</h1>
               title <input type="text" name='title' onChange={(e) => settitle(e.target.value)} className='border-1 rounded border-solid
                  border-black mb-3 py-1 px-2'/>
               discription<textarea  name="" id="" cols="30" rows="5" onChange={(e) => setdiscription(e.target.value)} className='border-1 border-solid
                  border-black mb-3 py-1 px-2 rounded'></textarea>
               image <input type="file"  id="" onChange={imagehandler} className="mb-3" />
              <label htmlFor="">category</label>
              <select name="" id="" onChange={(e) => setcategory(e.target.value)} value={category}>
                <option value=""></option>
                <option value="health">health</option>
                <option value="animal">animal</option>
                <option value="education">education</option>
              </select>
               amount <input type="number" name="amount" id="" onChange={(e) => setamount(e.target.value)} className='border-1 border-solid
                  border-black mb-3 rounded py-1 px-2' />
               <button type="submit" onClick={discriptionhandler} className="bg-black text-white font-bold rounded py-2 w-[400px] mx-auto" >submit</button>

{/*  onChange={(e) => setcategory(e.target.value)} */}
            </form>
        </div>
    </div>
  )
}

export default Create