const express=require('express');
const router=express.Router();

const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1158187",
  key: "76569064e8611e4d0e92",
  secret: "c62008646ea494ccda55",
  cluster: "mt1",
  useTLS: true
});


router.get('/',(req,res) =>{
    res.send('POLL');
});

router.post('/',(req,res) =>{

    pusher.trigger("os-poll", "os-vote", {
        points:1,
        os:req.body.os
      });

      return res.json({success:true,message:"Nikl laude hogya tera"});


});

module.exports=router;