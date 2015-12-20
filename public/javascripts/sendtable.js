/*Functions to get name and email from a column*/
function getName(columns){
  return columns[0].getElementsByTagName('input')[0].value;
}

function getEmail(columns){
  return columns[1].getElementsByTagName('input')[0].value;
}

/*Convert table to JSON object*/
function tableToJson(){
  var body = document.body;
  //Grab all the rows in the table
  var rows = body.getElementsByTagName('tr');
  var tableJson = [];
  var columnsOfCurrRow, name, email;
  //Start at one to ignore column headers
  for (var i = 1; i < rows.length; i++){
    //For each row grab the name and email and put into JSON object
    columnsOfCurrRow = rows[i].children
    name = getName(columnsOfCurrRow); 
    email = getEmail(columnsOfCurrRow); 
    tableJson.push({"name":name, "email":email});
  }
  return tableJson;
}

/*
*   This function takes the JSON table
*   and posts it to /sendemail
*/
function postTableToServer(){
  var form = {};
  /*Post via ajax*/
  form.method = 'post';
  form.action = '/sendemail';
  /*Convert our table to JSON to send to server*/
  var tableJson = tableToJson();
   
  /*Create the request to send to server*/  
  var xhr = new XMLHttpRequest();
  xhr.open(form.method,form.action,true);
  xhr.setRequestHeader('Content-Type','application/json; charset=UTF-8');

  /*Alert user how the server responds*/
  xhr.onreadystatechange = function(event){
    var serverResponse = event.target
    
    /*If the request went through and the server is done responding then... */
    if (serverResponse.readyState === 4 && serverResponse.status === 200 ){
      /*Alert the user as to what the response was*/
      alert(serverResponse.responseText);
    }
  }

  /*Send the JSON to the server*/
  xhr.send(JSON.stringify(tableJson));
}

/*Make it so that when the link is clicked the emails are sent*/
window.addEventListener("load", function(){
  var sendEmail = document.getElementById('send');
  sendEmail.addEventListener("click",postTableToServer);
})
