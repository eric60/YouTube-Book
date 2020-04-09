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

    function insertYoutubePlayer() {
        
    }

    function onYouTubeIframeAPIReady(divInsert) {
        player = new YT.Player(divInsert, {
          height: '400',
          width: '500',
          videoId: 'M7lc1UVf-VE',
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }

    $( "#dialog-add" ).dialog({ 
        autoOpen: false,
        width: 800,
        height:600,
        resizable: false
    });

    $( "#addVideoBtn" ).click(function() {
        $( "#dialog-add" ).dialog( "open" );
    });

    $( "#dialog-edit" ).dialog({ 
        autoOpen: false,
        width: 800,
        height:600,
        resizable: false
    });

    $( "#image-icon" ).click(function() {
        $( "#dialog-edit" ).dialog( "open" );
    });

    function validateUrl(url) {
        // example v=73Fyj6HZ6R0&t=3s
        // exclude only & character
        if(!url.match(/v=([^&]+)/)) {
            return false;
        }
        return true;
    }
    $(".collapsibleBtn catBtn").accordion({
        collapsible: true
    });

    
    $(".collapsibleCategoryBox").accordion({
        collapsible: true
    });

    $(".collapsibleBtn labelBtn").accordion({
        collapsible: true
    });

    $(".panel-panel-primary-education").accordion({
        collapsible: true
    });

    

});