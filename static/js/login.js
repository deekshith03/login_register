$(document).ready(() => {


$("#passwordtoggle").on("click",()=>{

    let passwordfield=document.getElementById("password");

    if(passwordfield.type==="password")
    {
        passwordfield.type="text";

    }
    else
    {
        passwordfield.type="password";
    }

})


const getCookie = name => {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
};



$("#loginbtn").on("click",(e)=>{

  e.preventDefault();


    $.ajax({
        async: true,
        url: "api/logincheck",
        type: "POST",
        beforeSend: function (xhr) {
          xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"));
        },
        data: {
          email:$("#email").val(),  
          password:$("#password").val()
        },
   
        success:function(response)
        {
            if(response.jwt)
            {
              window.location.replace("/")
            }
            else{
              document.getElementById("errorfield").innerHTML=response.message
              document.getElementById("errorfield").style.display="block"

              setTimeout(()=>{
              document.getElementById("errorfield").innerHTML=""
              document.getElementById("errorfield").style.display="none"
              },1000)
            }
        }
      });


})




})