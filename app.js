const https = require('https');
const express= require('express');
const app=express();
refreshData();
function currtime()
{
  let ts = Date.now();
  let currDate=new Date(ts);
  var unixTimestamp = Math.round(currDate.getTime()/1000);
  return unixTimestamp;
}
// function sendmail(mailDetail)
// {
//   const nodemailer = require('nodemailer'); 
  
  
// let mailTransporter = nodemailer.createTransport({ 
//     service: 'gmail', 
//     auth: { 
//         user: 'siddharthraj.civ18@itbhu.ac.in', 
//         pass: 'siddhuraj000@'
//     } 
// }); 
  
// // let mailDetails = { 
// //     from: 'siddharthraj.civ18@itbhu.ac.in', 
// //     to: 'siddharthraj000@gmail.com', 
// //     subject: 'Test mail', 
// //     text: 'Node.js testing mail for GeeksforGeeks'
// // }; 
// let mailDetails=mailDetail;
  
// mailTransporter.sendMail(mailDetails, function(err, data) { 
//     if(err) { 
//         console.log('Error Occurs'); 
//     } else { 
//         console.log('Email sent successfully'); 
//     } 
// }); 
// }
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
      // for(i in jsres.result)
      // {
       var name=jsres.result[0].problem.name;
    var verdict=jsres.result[0].verdict;
    var seconds=jsres.result[0].creationTimeSeconds;
     date=new Date(seconds*1000);
       console.log(name+" "+verdict+" "+date+" ");
  let mailDetails={
    from: 'siddharthraj.civ18@itbhu.ac.in', 
      to: 'siddharthraj000@gmail.com', 
      subject: 'Test mail', 
      text: name+"  "+verdict};
    //  var x=jsres.result[i];
   
    //   console.log(x);
      
    });
   // sendmail(mailDetails);
  
  }
  ).on("error", (err) => {
    console.log("Error: " + err.message);
  });
 // setTimeout(refreshData,30*1000);
}
//refreshData();




