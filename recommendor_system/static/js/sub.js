
function fun(value) {
    var formData = new FormData();
  formData.append('q', value);

    $.ajax({
        url: "/get_main", // Replace with your Flask backend endpoint
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function(response) {
          // var res=response;
        //   document.getElementById("xyz").innerText=response;
            // Handle the response from the backend if needed
            // console.log(response);
        },
        error: function(error) {
            // Handle any errors that occurred during the AJAX request
            console.error(error);
        }
    });
}
