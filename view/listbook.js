axios.get('http://localhost:3000/booking')
  .then(function (response) {
    console.log(response.data.length);
    for(i=0; i<response.data.length; i++){
      $('#panel').append(
        '<tr><th scope="row" id="num"><center>'+ response.data[i].beautyname +'</center></th>'+
        '<td id="fname">'+ response.data[i].beautytel +'</td>'+
        '<td id="lname">'+ response.data[i].cusname +'</td>'+
        '<td id="email">'+ response.data[i].custel +'</td>'+
        '<td id="pass">'+ response.data[i].type +'</td>'+
        '<td id="status">'+ response.data[i].wait +'</td></tr>'
      );
    }
  })
  .catch(function (error) {
    console.log(error);
  });
