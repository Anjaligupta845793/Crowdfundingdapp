// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Crowdfunding{
   
    uint256 public CampaignCount;
   struct  Campaign {
      uint id;
    string Title;
    string Discriptionurl;
    string Imageurl;
    string Category;
    uint RequiredAmount;
    uint CollectAmount;
    address payable Owner;

   }
   event Created(string Title,
    string Discriptionurl,
    string Imageurl,
    string Category,
    uint RequiredAmount,
    uint CollectAmount,
    address indexed Owner,
    uint timestamp);
   mapping(uint => Campaign) public Campaigns;

   function CreateCampaign(string memory _imguri , string memory _discriptionuri ,uint _amount,string memory _title , string memory _category) public {
        CampaignCount++;
        Campaigns[CampaignCount] =  Campaign(CampaignCount,_title,_discriptionuri,_imguri, _category,_amount,0,payable(msg.sender));
        emit Created(_title,_discriptionuri,_imguri, _category,_amount,0,msg.sender,block.timestamp);


   }
   function FundCampaign(uint id) public  payable {
      require(Campaigns[id].CollectAmount <   Campaigns[id].RequiredAmount   , "required amount is collected");
      require(msg.value > 0,"your amount is too low");
      require(Campaigns[id].CollectAmount + msg.value <= Campaigns[id].RequiredAmount);
      
    (bool sent,bytes memory data)=  Campaigns[id].Owner.call{ value: msg.value }("");

    require(sent,"filed to send ether");
     Campaigns[id].CollectAmount += msg.value;

   }
   
}
