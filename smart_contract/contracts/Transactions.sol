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

   function CreateCampaign(string memory _imguri , string memory _discriptionuri ,uint _amount,string memory _title ,string memory _category) public {
        CampaignCount++;
        Campaigns[CampaignCount] =  Campaign(CampaignCount,_title,_discriptionuri,_imguri, _category,_amount,0,payable(msg.sender));
        emit Created(_title,_discriptionuri,_imguri, _category,_amount,0,msg.sender,block.timestamp);


   }
   function FundCampaign(uint _id , uint _amount) public  payable {
      require(Campaigns[_id].CollectAmount <  Campaigns[_id].RequiredAmount,"required amount is collected");
      require(_amount > 0,"your amount is too low");
     Campaigns[_id].Owner.transfer(_amount);
     Campaigns[_id].CollectAmount += _amount;

   }
}
