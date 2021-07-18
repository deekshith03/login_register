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

    $("#passwordtoggle1").on("click",()=>{

        
    
        let passwordfield=document.getElementById("repassword");
    
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
      
    
$("#Registerbtn").on("click",(e)=>{

    e.preventDefault();

    if($("#password").val()===$("#repassword").val())
    {
    $.ajax({
        async: true,
        url: "api/RegisterCheck",
        type: "POST",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"));
        },
        data: {
          username:$("#username").val(),
          email:$("#email").val(),  
          password:$("#password").val(),
          address:$("#address").val()
        },
    
    
        success:function(response)
        {
            
            document.getElementById("errorfield").innerHTML=response.message
            document.getElementById("errorfield").style.display="block"

            setTimeout(()=>{
            document.getElementById("errorfield").innerHTML=""
            document.getElementById("errorfield").style.display="none"
            },3000)
        }
      });
    }

    else
    {
        

        document.getElementById("errorfield").innerHTML="passwords do not match"
        document.getElementById("errorfield").style.display="block"

        setTimeout(()=>{
        document.getElementById("errorfield").innerHTML=""
        document.getElementById("errorfield").style.display="none"
        },3000)
    }


})




})