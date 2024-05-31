import React, { useEffect ,useState, Children, useRef} from 'react';
import {ethers} from 'ethers';
import axios from 'axios';
export const TransactionContext = React.createContext();
import abi from "../abi/abi.json";
import contract_address from "../abi/address.json";

 export const TransctionProvider = ({children}) =>  {
  const account = useRef(null);
  const [Account, setAccount] = useState(account.current);
  const Campaign = useRef([]);
  const [amount, setamount] = useState(null);
  const [discription, setdiscription] = useState("")
  const [category, setcategory] = useState("");
  const [title, settitle] = useState("")
  const image = useRef("")
  const disurl = useRef("");
  const first = useRef([]);
  const dashboard = useRef([]);
  const [dashbloader, setdashbloader] = useState(true);
 const dashdiscription = useRef([]);
  const [fetchloader, setfetchloader] = useState(true);
  const health = useRef([]);
  const animal = useRef([]);
  const education = useRef([]);
  const [healthloader, sethealthloader] = useState(true)
  const [animalloader, setanimalloader] = useState(true)
  const [eduloader, seteduloader] = useState(true);
  const healdis = useRef([]);
  const anidis = useRef([]);
  const edudis = useRef([]);
  const cards = useRef([]);
  const discard = useRef([]);
  const [cardloader, setcardloader] = useState(true)
  


  const contract = useRef({});
   useEffect(() => {
    
    window.ethereum.on("accountsChanged",Accounthandler)
    console.log(Account)
      return () => {
        window.ethereum.removeListener("accountsChanged",Accounthandler)
      }
   }, [])
    const fetchingdata = async(item,hook) => {
      const response = await fetch(item.Discriptionurl);
      console.log(response)
      
      const d = await response.json();
      console.log(d)
      hook.current.push(d)
      
    
 
    }
    const fetching = async(item,hook) => {
      const response = await fetch(item.discription);
      console.log(response)
      
      const d = await response.json();
      console.log(d)
      hook.current.push(d)
      
    
 
    }

   const Accounthandler = async(accounts) => {
         if (accounts.length > 0 , Account != accounts[0]){
            setAccount(accounts[0]);
            setdashbloader(true)
             const provider = new ethers.providers.Web3Provider(window.ethereum);
             const signers = provider.getSigner();
             const adddress = await signers.getAddress();
            dashboarddata(adddress);

           

         }
         else{
          setAccount(null)
         }
   }
   
    const ConnectWallet = async() => {
      if(window.ethereum){
        
           const provider = new ethers.providers.Web3Provider(window.ethereum);
          await  provider.send("eth_requestAccounts",[])
           const signers = provider.getSigner();
           const adddress = await signers.getAddress();
          account.current = adddress;
           setAccount(account.current)
           
           console.log(Account)
           fetchContract();
           fetchCampaign();
           dashboarddata(adddress);
           animaldata();
           healthdata();
           educationdata();



        
      }else{
        window.alert("install metamask or other providers")
      }
    }
    const fetchContract = async() => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
          
      const signers = provider.getSigner();
      const Contracts = new  ethers.Contract(contract_address.address,abi.abi,signers);
      contract.current = Contracts;
      
    }
    const imagehandler = async(e) => {
      const file = e.target.files[0]
      console.log(file);

      const filedata = new FormData();
      console.log(filedata)
      console.log(discription)
      filedata.append("file",file);
      const response = await axios({
        method:"post",
        url:"https://api.pinata.cloud/pinning/pinFileToIPFS",
        data:filedata,
         headers :{
            pinata_api_key: "2bbe57d01fe1d1503172",
            pinata_secret_api_key: "bde386ad667f4643e976f67ec156351f4b5b777022adbc7c56ae5e4670c404ab",
            "Content-Type":"multipart/form-data",
          }
          
      })
      console.log("fetching url");

      console.log(response);
      const fileurl = "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash;
      console.log(fileurl);
      image.current = fileurl;
      
      
    }
   const discriptionhandler = async(e) => {
    e.preventDefault();
    const jsondata = JSON.stringify({ discription});
      console.log(jsondata)
      console.log("sending")
    const responsedata = await axios({
          method:"POST",
          url:"https://api.pinata.cloud/pinning/pinJSONToIPFS",
          data: jsondata,
          headers :{
            pinata_api_key: "2bbe57d01fe1d1503172",
            pinata_secret_api_key: "bde386ad667f4643e976f67ec156351f4b5b777022adbc7c56ae5e4670c404ab",
            "Content-Type":"application/json",
          }
        })
        
        const dis_data =  "https://gateway.pinata.cloud/ipfs/" + responsedata.data.IpfsHash;
        disurl.current = dis_data ;
         const transaction = await contract.current.CreateCampaign(image.current,disurl.current,amount,title,category);
         transaction.wait();
         window.location.reload();
        
        
   }
   const fundcamp = async(id, amount) => {
    console.log(amount)
          const price = ethers.utils.parseEther(amount)
          console.log(price)
          console.log("fetching...")
          console.log(id)
           await contract.current.FundCampaign(id,price,{gasLimit:300000});

   }
   const card = async(item) => {
         
         console.log(item)
         await fetching(item,discard);

         
          const data = {
                   id:item.id,
                    title:item.title,
                     discription:discard.current[0].discription,
                     image:item.image,
                    category:item.category,
                    require:item.require.toNumber(),
                    collectedamount:item.collectedamount.toNumber(),
                    owner:item.owner
                     }
                     cards.current = data;
                     console.log(cards)
                     setcardloader(false)

   }
                                                                                                                                               
   const fetchCampaign= async() => {
    const count = await contract.current.CampaignCount();
    console.log(count);
    
    let camp = [];
    for(let i =1 ; i <= count; i++){
      
      const item = await contract.current.Campaigns(i);
     await  fetchingdata(item,first)
      
      camp.push({
        id:item.id,
        title:item.Title,
        discription:item.Discriptionurl,
        image:item.Imageurl,
        category:item.Category,
        require:item.RequiredAmount,
        collectedamount:item.CollectAmount,
        owner:item.Owner

      })
      

    }

Campaign.current = camp;
console.log(Campaign)
console.log(first)
setfetchloader(false)
   }
   const dashboarddata = async(accounts) => {
        const count = await contract.current.CampaignCount();
        let list = [];
        console.log("fetching...")
        for(let i = 1 ; i <= count;i++ ){
             const item = await contract.current.Campaigns(i);
           await fetchingdata(item,dashdiscription);
           console.log(item.Owner);
           console.log(accounts);
             if(item.Owner === accounts){
                    list.push({
                   id:item.id,
                    title:item.Title,
                     discription:item.Discriptionurl,
                     image:item.Imageurl,
                    category:item.Category,
                    require:item.RequiredAmount,
                    collectedamount:item.CollectAmount,
                    owner:item.Owner
                     })
             }

        }
        dashboard.current = list;
        console.log(dashboard)
        setdashbloader(false)

   }
   const cardclick = (item,look) => {
         card(item);
         look(true);
         
   }
    const healthdata = async() => {
        const count = await contract.current.CampaignCount();
        let list = [];
        console.log("fetching...")
        for(let i = 1 ; i <= count;i++ ){
             const item = await contract.current.Campaigns(i);
           await fetchingdata(item,healdis);
            console.log(item.Category)
          
             if(item.Category === "health"){
                    list.push({
                   id:item.id,
                    title:item.Title,
                     discription:item.Discriptionurl,
                     image:item.Imageurl,
                    category:item.Category,
                    require:item.RequiredAmount,
                    collectedamount:item.CollectAmount,
                    owner:item.Owner
                     })
             }

        }
        health.current = list;
        console.log(health)
        sethealthloader(false)

   }
   const animaldata = async() => {
        const count = await contract.current.CampaignCount();
        let list = [];
        console.log("fetching...")
        for(let i = 1 ; i <= count;i++ ){
             const item = await contract.current.Campaigns(i);
           await fetchingdata(item,anidis);
           
          
             if(item.Category === "animal"){
                    list.push({
                   id:item.id,
                    title:item.Title,
                     discription:item.Discriptionurl,
                     image:item.Imageurl,
                    category:item.Category,
                    require:item.RequiredAmount,
                    collectedamount:item.CollectAmount,
                    owner:item.Owner
                     })
             }

        }
        animal.current = list;
        console.log(animal)
        setanimalloader(false)

   }
   const educationdata = async() => {
        const count = await contract.current.CampaignCount();
        let list = [];
        console.log("fetching...")
        for(let i = 1 ; i <= count;i++ ){
             const item = await contract.current.Campaigns(i);
           await fetchingdata(item,edudis);
           console.log(item.Category
)
          
             if(item.Category === "education"){
                    list.push({
                    id:item.id,
                    title:item.Title,
                     discription:item.Discriptionurl,
                     image:item.Imageurl,
                    category:item.Category,
                    require:item.RequiredAmount,
                    collectedamount:item.CollectAmount,
                    owner:item.Owner
                     })
             }

        }
        education.current = list;
        console.log(education)
        seteduloader(false)

   }
    return(
       <TransactionContext.Provider  value={{ConnectWallet,Account,setamount,amount,imagehandler,discription,setdiscription,discriptionhandler,setcategory,settitle,Campaign,fetchloader,first,dashboard,dashbloader,dashdiscription,education,health,animal,eduloader,animalloader,healthloader,healdis,anidis,edudis,category,card,cards,cardclick,cardloader,fundcamp}}>
        {children}
    </TransactionContext.Provider>
    )
    
  }
  
export default TransctionProvider;

