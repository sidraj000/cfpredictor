const https = require('https');
const express= require('express');
const app=express();
function currtime()
{
  let ts = Date.now();
  let currDate=new Date(ts);
  var unixTimestamp = Math.round(currDate.getTime()/1000);
  return unixTimestamp;
}
function sendmail(mailDetail)
{
  const nodemailer = require('nodemailer'); 
  
  
let mailTransporter = nodemailer.createTransport({ 
    service: 'gmail', 
    auth: { 
        user: 'siddharthraj.civ18@itbhu.ac.in', 
        pass: 'jqiyoyvlmhihkfnp'
    } 
}); 
  
// let mailDetails = { 
//     from: 'siddharthraj.civ18@itbhu.ac.in', 
//     to: 'siddharthraj000@gmail.com', 
//     subject: 'Test mail', 
//     text: 'Node.js testing mail for GeeksforGeeks'
// }; 
let mailDetails=mailDetail;
  
mailTransporter.sendMail(mailDetails, function(err, data) { 
    if(err) { 
        console.log(err.message); 
    } else { 
        console.log('Email sent successfully'); 
    } 
}); 
}
function refreshData()
{
  https.get('https://codeforces.com/api/user.status?handle=sid2104&from=1&count=10', (resp) => {

    let data = ''; 
  
    var unixTimestamp = currtime();
    console.log(unixTimestamp);
  
  
    resp.on('data', (chunk) => {
      data += chunk;
    });
    resp.on('end', () => {
      var jsres=(JSON.parse(data));
      for(i in jsres.result)
      {
       var name=jsres.result[i].problem.name;
    var verdict=jsres.result[i].verdict;
    var seconds=jsres.result[i].creationTimeSeconds;
     date=new Date(seconds*1000);
     //  console.log(name+" "+verdict+" "+date+" ");
     // console.log(seconds);
     if(unixTimestamp-seconds<=35)
     {
       console.log("YES");
      let mailDetail={
        from: 'siddharthraj.civ18@itbhu.ac.in', 
          to: 'siddharthraj000@gmail.con', 
          subject: 'Mail from siddharth', 
          text: name+"  "+verdict};
       sendmail(mailDetail); 
     }
     else
     {
       console.log(unixTimestamp-seconds);
     }
  

  }
    });
   
  
  }
  ).on("error", (err) => {
    console.log("Error: " + err.message);
  });
 setTimeout(refreshData,30*1000);
}
refreshData();




