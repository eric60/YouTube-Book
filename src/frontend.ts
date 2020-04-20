
$(document).ready(function() {
    let player : any;
    let dialogWidth : number = 800
    let dialogHeight : number = 600;
    let divClone = `<div class="split dialog-Video">
                    <label for="ytUrlInput">Paste your YouTube Video URL: </label>            
                    <input id="ytUrlInput" type="text">
                    <div id="player1"></div>
                    </div>`

    // --------------------- Button functions -------------------------
    $('#submit-book').click(function() {
       alert("Book submitted");
       (<any>$("#dialog-add-video")).dialog("close");
       location.reload()
    })

    $('.dialog-other').hide();
    $('#ytUrlInput').bind("paste", function() {
        handlePaste(insertVideo);
    });

    $('#add-bookmark').click(function() {
        $(`#insert-before-me`).before(`
            <div>
                <label for="dialog-Bookmarks">Add Bookmark hh:mm:ss </label>   
                <input id="time-1" type='time' class="without_ampm" step="1">  
                <textarea id="notes-1" placeholder="Bookmark notes"></textarea>
            </div>
        `);
    })
    

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

    function onYouTubeIframeAPIReady(player : any, divInsert : string, videoId : string) {
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

    // --------------------- Dialog functions ---------------------------

    dialogAddVideo()
    function dialogAddVideo() {
        (<any>$( "#dialog-add-video" )).dialog({ 
            autoOpen: false,
            width: dialogWidth,
            height:dialogHeight,
            resizable: false
        });
    }

  

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
    
    (<any>$(".Label-Body")).accordion({
        header: "> div > h3",
        collapsible: true,
        heightStyle: "content"
    })
    .sortable({
        axis: "y",
        handle: "h3",
        stop: function( event, ui ) {
          // IE doesn't register the blur when sorting
          // so trigger focusout handlers to remove .ui-state-focus
          ui.item.children( "h3" ).triggerHandler( "focusout" );
 
          // Refresh accordion to handle new order
          (<any>$( this )).accordion( "refresh" );
        },
        update: function() {
            save_new_order()
        }
    });

    function save_new_order() {
        let sortedIds = (<any>$( ".Label-Body" )).sortable('toArray');
        console.log("new sortedIds: " + sortedIds)
    }
  
});