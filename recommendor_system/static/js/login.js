const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");
signupBtn.onclick = (()=>{
  loginForm.style.marginLeft = "-50%";
  loginText.style.marginLeft = "-50%";
});
loginBtn.onclick = (()=>{
  loginForm.style.marginLeft = "0%";
  loginText.style.marginLeft = "0%";
});
signupLink.onclick = (()=>{
  signupBtn.click();
  return false;
});
let user;

document.addEventListener("DOMContentLoaded", function() {
   const usernameDropdown = document.getElementById("usernameDropdown");

   usernameDropdown.addEventListener("change", function(event) {
      user = event.target.value; // Store the selected value in the 'user' variable
      console.log("Selected user:", user);
   });
});


  function fun() {
    // console.log(user);
    var formData = new FormData();
    formData.append('q', user);
    
  
    $.ajax({
      url: "/send_user", // Replace with your Flask backend endpoint
      type: 'POST',
      data: formData,
      contentType: false,
      processData: false,
      success: function(response) {
        var adminLink = document.getElementById("sample");
        adminLink.click();
        // var res=response;
        // document.getElementById("xyz").innerText=response;
          // Handle the response from the backend if needed
          // console.log(response);
      },
      error: function(error) {
          // Handle any errors that occurred during the AJAX request
          console.error(error);
      }
    });
   
  }

  function fun1() {
    // console.log(user);
    var formData = new FormData();
    formData.append('q', "hello");
    
  
    $.ajax({
      url: "/send_user", // Replace with your Flask backend endpoint
      type: 'POST',
      data: formData,
      contentType: false,
      processData: false,
      success: function(response) {
        var adminLink = document.getElementById("sample");
        adminLink.click();
        // var res=response;
        // document.getElementById("xyz").innerText=response;
          // Handle the response from the backend if needed
          // console.log(response);
      },
      error: function(error) {
          // Handle any errors that occurred during the AJAX request
          console.error(error);
      }
    });
   
  }


