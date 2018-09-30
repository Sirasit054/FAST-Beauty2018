$(function(){
  $('#btnsearch').click(function(){
    var fname = document.getElementById("fnamesearch").value; 
    console.log("fname : " + fname);

    axios.get('http://localhost:3000/beautys/show?beautyname='+ fname)
    .then(function (response) {
      console.log(response.data.length);
      if(response.data.length > 0){
        $('#panel').empty();
        for(i=0; i<response.data.length; i++){
          $('#panel').append(
            '<tr><th scope="row" id="num"><center>'+ response.data[i].beautyname +'</center></th>'+
            '<td id="username">'+ response.data[i].username +'</td>'+
            '<td id="phone">'+ response.data[i].phone +'</td>'+
            '<td id="email">'+ response.data[i].email +'</td>'+
            '<td id="day ">'+ response.data[i].day +'</td>'+
            '<td id="gender">'+ response.data[i].gender +'</td></tr>'
          );
        }
      }else{
        $('#panel').empty();
        $('#panel').append(
          '<tr><th scope="row" id="num"><center>No data</center></th>'+
          '<td id="fname">No data</td>'+
          '<td id="lname">No data</td>'+
          '<td id="email">No data</td>'+
          '<td id="pass">No data</td></tr>'
        );
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  });
  
  
  
});

