$(document).ready(function() {
    let player;
    let dialogWidth = 800
    let dialogHeight = 600;

    $('#addYtBook').click(function() {
       
    })

    $('.dialog-other').hide();
    $('#ytUrlInput').bind("paste", function() {
        handlePaste(insertVideo)
    });

    function handlePaste(callback) {
        let url = navigator.clipboard.readText().then(callback);
    }

    function insertVideo(url) {
        if(!validateUrl(url)) {
            alert("Please enter a valid YouTube Video URL");
        }
        else {
            let videoId = parseYoutubeUrl(url)
            console.log(videoId)
            onYouTubeIframeAPIReady(player, "player1", videoId);
            $('.dialog-other').show();
        }
    }

    function parseYoutubeUrl(url) {
        let regEx = /v=([^&]+)/
        var match = url.match(regEx)
        console.log(match)
        let videoId = match[1];
        return videoId;
    }

    function validateUrl(url) {
        // example v=73Fyj6HZ6R0&t=3s
        // exclude only & character
        if(!url.match(/v=([^&]+)/)) {
            return false;
        }
        return true;
    }

    function onYouTubeIframeAPIReady(player, divInsert, videoId) {
        console.log('trigger youtube player')
        player = new YT.Player(divInsert, {
          width: dialogWidth,
          height: dialogHeight / 2,     
          videoId: videoId,
          events: {
          }
        });
      }

    $( "#dialog-add" ).dialog({ 
        autoOpen: false,
        width: dialogWidth,
        height:dialogHeight,
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

    // ================================ Collapsible methods =================================
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