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

document.addEventListener("DOMContentLoaded", function() {
    const usernameDropdown = document.getElementById("usernameDropdown");
    let selectUsernameOption = usernameDropdown.querySelector("option[value='']");
  
    usernameDropdown.addEventListener("click", function() {
      if (selectUsernameOption) {
        selectUsernameOption.remove();
        selectUsernameOption = null; // Set to null so it's only removed once
      }
    });
  });
