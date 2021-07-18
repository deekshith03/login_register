$(document).ready(() => {

    let totaldatas;

    $.ajax({
        async: true,
        url: "api/senddetails",
        type: "GET",
      }).then((result)=>{
        dataentry(result)
      }
      )

async function dataentry(result){
    totaldatas=result;
    let html=""
    result.forEach((element,index)=>{
        html+=`<td class="edit">${element.username}</td>
        <td class="edit">${element.email}</td>
        <td class="edit">${element.address}</td>
        <td class="edit" style = "display:none" >${element.id}</td>
        <td class="edit-save">
          <button type="button" name="edit" class="edit-member">Edit</button>
          <button type="button" name="save" class="save-member" value=${element.id}>Save</button>
        </td>
        <td><button type="button" name="delete" class="delete-member" value=${element.id}>Delete</button></td>
      </tr>`
    })
    let tbody=document.getElementById("tbody");
    tbody.innerHTML= await html

    calleventlistners()


}

function calleventlistners(){

  $(
    ".section3 .flex-container .member table tbody tr td button[name='delete']"
  ).on("click", function () {
    var abc = $(this);
    let deletevalues=abc;
    $(".section3 .flex-container .member .delete").fadeIn(500);
    $(
      '.section3 .flex-container .member .delete .choice-delete button[name="cancel-delete"]'
    ).on("click", function () {
      $(".section3 .flex-container .member .delete").fadeOut(500);
    });
    $(".section3 .flex-container .member .delete .choice-delete i").on(
      "click",
      function () {
        $(".section3 .flex-container .member .delete").fadeOut(500);
      }
    );
    $(
      '.section3 .flex-container .member .delete .choice-delete button[name="yes-delete"]'
    ).on("click", function () {
        let correctid=($(abc).parent().parent()[0].cells[3].innerHTML)
      $.ajax({
        async: true,
        url: "api/delete",
        type: "POST",
        beforeSend: function (xhr) {
          xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"));
        },
        data: {
            userid:correctid
        },
   
        success:function(response)
        {
            
        }
});

      $(abc).parent().parent().remove();
      $(".section3 .flex-container .member .delete").fadeOut(500);
    });
});
  //edit
  $("button[name=edit]").click(function () {
    $(this).hide();
    var abc = $(this).parent().siblings(".edit");
    $(abc).each(function () {
      var content = $(this).html();
      $(this).html("<textarea>" + content + "</textarea>");
    });
    $(this).parent().find(".save-member").show();
  });

  $("button[name=save]").click(function () {
      let data=[];
      let details={username:"",email:"",address:""}
    $("textarea").each(function () {
      var content = $(this).val(); //.replace(/\n/g,"<br>");
      data.push($(this).val());
    //   $(this).html(content);
      $(this).contents().unwrap();
    });

    details.username=data[0];
    details.email=data[1];
    details.address=data[2];


    $.ajax({
        async: true,
        url: "api/edit",
        type: "POST",
        beforeSend: function (xhr) {
          xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"));
        },
        data: {
            userid:data[3],
            username:data[0],
            email:data[1],
            address:data[2],
        },
   
        success:function(response)
        {

            if(response.message!=="success")
            {
                document.getElementById("errorfield").innerHTML=response.message
                document.getElementById("errorfield").style.display="block"
    
                setTimeout(()=>{
                document.getElementById("errorfield").innerHTML=""
                document.getElementById("errorfield").style.display="none"
                },3000)

            }

            else
            {
                console.log(response);

                window.location.reload()
            }


        }
    });


    $(this).hide();
    $(this).parent().find(".edit-member").show();
  });
}

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

$("#logout").on("click",()=>{

    $.ajax({
        async: true,
        url: "logout",
        type: "POST",
        beforeSend: function (xhr) {
          xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"));
        },
        data: {

        },
   
        success:function(response)
        {

              window.location.replace("/login")

        }
      });

})



});
