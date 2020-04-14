
$(document).ready(function() {
    let player : any;
    let dialogWidth : number = 800
    let dialogHeight : number = 600;

    $('#addYtBook').click(function() {
       
    })

    $('.dialog-other').hide();
    $('#ytUrlInput').bind("paste", function() {
        handlePaste(insertVideo)
    });

    function handlePaste(callback) {
        let url = navigator.clipboard.readText().then(callback);
    }

    function insertVideo(url : string) {
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

    function parseYoutubeUrl(url : string) {
        let regEx = /v=([^&]+)/
        var match = url.match(regEx)
        console.log(match)
        let videoId = match[1];
        return videoId;
    }

    function validateUrl(url : string) {
        // example v=73Fyj6HZ6R0&t=3s
        // exclude only & character
        if(!url.match(/v=([^&]+)/)) {
            return false;
        }
        return true;
    }

    function onYouTubeIframeAPIReady(player, divInsert : string, videoId : string) {
        console.log('trigger youtube player')
        // @ts-ignore
        player = new YT.Player(divInsert, {
          width: dialogWidth,
          height: dialogHeight / 2,     
          videoId: videoId,
          events: {
          }
        });
      }

    (<any>$( "#dialog-add-video" )).dialog({ 
        autoOpen: false,
        width: dialogWidth,
        height:dialogHeight,
        resizable: false
    });

    $( "#addVideoBtn" ).click(function() {
        (<any>$( "#dialog-add-video" )).dialog( "open" );
    });

    (<any>$( "#dialog-edit-order" )).dialog({ 
        autoOpen: false,
        width: 800,
        height:600,
        resizable: false
    });

    $( "#image-icon" ).click(function() {
        (<any>$( "#dialog-edit-order" )).dialog( "open" );
    });

    // ================================ Collapsible methods =================================

    
    (<any>$(".collapsible-category")).accordion({
        collapsible: true
    });

    (<any>$(".collapsible-label")).accordion({
        collapsible: true
    });

    (<any>$(".panel-panel-primary-education")).accordion({
        collapsible: true
    });

    

});