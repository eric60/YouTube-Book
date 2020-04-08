$(document).ready(function() {
    $('#addYtBook').click(function() {
        let url = $('#ytUrlInput').val();
        if(!validateUrl(url)) {
            alert("Please enter a valid Url");
        }
        else {
            alert("valid url: " + url)
        }
    })

    $("#accordion").accordion();

    function validateUrl(url) {
        // example v=73Fyj6HZ6R0&t=3s
        // exclude only & character
        if(!url.match(/v=([^&]+)/)) {
            return false;
        }
        return true;
    }

})