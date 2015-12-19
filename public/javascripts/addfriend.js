window.addEventListener("load",function(){
  var addFriendButton = document.getElementById('addrow'); //button to add new row 
  var tableBody = document.getElementsByTagName('tbody')[0];  //body of the table

  //When the button is clicked add new row to the table
  addFriendButton.addEventListener("click",function(){
    var newRow = document.createElement('tr'); //new row to be appended to table
    newRow.innerHTML='<td> <input type="text" name="name"> </td>' + 
    '<td> <input type="email" name="email"> </td>';

    tableBody.appendChild(newRow);
  });
});
