const { expect } = require("chai");
const { ethers } = require("hardhat");
const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace");

describe("Crowdfunding",function() {
  let Crowdfunding;
  let crowdfund;
  let firstitem;
  beforeEach(async () => {
    Crowdfunding = await ethers.getContractFactory("Crowdfunding");
    [add1,add2,add3 ,...address] =await ethers.getSigners()
     crowdfund = await Crowdfunding.deploy();
  })
  describe("deployment of crowdfunding", () => {
      it("checking of crowdfunding",async() => {
       expect(await crowdfund.CampaignCount()).to.equal(0);
      })
  });
  describe("creating the first campagain",function(){
    it("making the first cam",async() => {
      await crowdfund.connect(add2).CreateCampaign("imageuri","discriptionuri",40,"meoney","animal");
      firstitem = await crowdfund.Campaigns(1);
      expect( firstitem.id).to.equal(1);
      expect( firstitem.Title).to.equal("meoney");
      expect( firstitem.Discriptionurl).to.equal("discriptionuri");
      expect( firstitem.Imageurl).to.equal("imageuri");
      expect( firstitem.Category).to.equal("animal");
      expect( firstitem.RequiredAmount).to.equal(40);
      expect( firstitem.CollectAmount).to.equal(0);
       expect( firstitem.Owner).to.equal(add2.address);
       await crowdfund.connect(add3).FundCampaign(1,{value:10});
      
      const data = await crowdfund.Campaigns(1);
      expect(data.RequiredAmount).to.equal(40)
      expect(data.CollectAmount).to.equal(10);
      await crowdfund.connect(add3).FundCampaign(1,{value:10});
      
      const data2 = await crowdfund.Campaigns(1);
      expect(data2.RequiredAmount).to.equal(40)
      expect(data2.CollectAmount).to.equal(20);
      


    })
  })
 
  
} 
)
