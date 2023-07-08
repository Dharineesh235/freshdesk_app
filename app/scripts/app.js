// import { handleApi } from "./apiManage";
var client;

init();

let postData={}

async function init() {
  client = await app.initialized();
  client.events.on('app.activated', async function() {
    try {
       userName = await client.iparams.get('Git_User_Name');
       postData.userName = userName.Git_User_Name;
       userRepo = await client.iparams.get('Git_Repo_Name');
       postData.userRepo = userRepo.Git_Repo_Name;
       userApiKey = await client.iparams.get('Git_Api_key');
       postData.userApiKey = userApiKey.Git_Api_key;
      console.log(postData.userName, postData.userRepo, postData.userApiKey);
      // success operation
      // "data" is {loggedInUser: {‘available’: “true”, ... }}
    } catch (error) {
      // failure operation
      console.log(error);
    }
});
}
async function handleApi(prop){
  console.log(prop);
  const res = await fetch(`https://api.github.com/repos/${prop.userName}/${prop.userRepo}/issues`,{
      method:'POST',
      headers: {
          'Content-Type': 'application/json',
          "Authorization" : `Bearer ${prop.userApiKey}`,
          "Connection":"keep-alive"
        },body:JSON.stringify({
              "title": prop.subject,
              "body": `${prop.description_text}  (sender_mail : ${prop.sender_email})`,
              "labels": [
                  "bug"
              ]
          })
  })
  const data = await res.json();
  console.log(data);
}

async function handleTicket(){
  const data =await client.data.get('ticket');
  postData.subject = await data.ticket.subject;
  postData.description_text = await data.ticket.description_text;
  postData.type = await data.ticket.type;
  postData.sender_email = await data.ticket.sender_email;
  handleApi(postData);
  console.log(data);
} 

// async function renderText() {
//   const textElement = document.getElementById('apptext');
//   const contactData = await client.data.get('contact');
//   const {
//     contact: { name }
//   } = contactData;

//   textElement.innerHTML = `Ticket is created by ${name}`;
// }

// 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

// async function(){
//     userName = await client.iparams.get('git_User_name');
//     userRepo = await client.iparams.get('git_repoName');
//     console.log(userName,userRepo);
//   }
