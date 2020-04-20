
$(document).ready(function() {
    const url = `http://localhost:8080/video`; 
    const herokuUrl = 'https://cryptic-basin-95763.herokuapp.com/'

    let player : any;
    let dialogWidth : number = 800
    let dialogHeight : number = 600;

    // ------------------- Helper functions --------------------------
    function getBookmarks() {
        let bookmarks = [];
        for (let i = 1; i < bookmarkCnt + 1; i++) {
            let timestamp =  $(`#time-${i}`).val()
            let timestampNotes =  $(`#notes-${i}`).val()

            if (timestamp) {
                bookmarks[i] = {
                    timestamp: timestamp,
                    timestampNotes: timestampNotes
                }
            }
        }
        return bookmarks;
    }

    function getCategory() {
        // no spaces in html or urls so replace spaces with dashes
        let category : any = $('#select-category').find(":selected").text().replace(" ", "-")
        if (!category) {
            category = $('#dialog-category-input').val();
        }
        return category;
    }

    function getLabel() {
        let label : any = $('#select-label').find(":selected").text().replace(" ", "-")
        if (!label) {
            label = $('#dialog-label-input').val();
        }
        return label;
    }
    // --------------------- CRUD functions -------------------------
    function videoCreate() {
        (async() => {
            console.log('----- In videoCreate -------')

            let urlInput : any = $('#ytUrlInput').val();
            let category = getCategory();
            let label : string = getLabel();
            let bookmarks : Array<Object> = getBookmarks();
            let notes : any = $('#dialog-Notes').val();

            console.log(`urlinput: ${urlInput}, category: ${category}, label: ${label}, notes: ${notes}`)
            console.log(bookmarks);

            const newUrl : string = url + "/eric/" + "/create?category=" + category + "&label=" + label;
            console.log(newUrl);

            const resp = await fetch(newUrl);
            const j = await resp.json();
            console.log(j)

        })();
    }




    function videoRead() {

    }

    function videoUpdate() {

    }

    function videoDelete() {

    }


    
    // --------------------- Button functions -------------------------
    $('#submit-book').click(function() {
       alert("Book submitted");
       (<any>$("#dialog-add-video")).dialog("close");
       videoCreate();
    })

    $('.dialog-other').hide();
    $('#ytUrlInput').bind("paste", function() {
        handlePaste(insertVideo);
    });

    let bookmarkCnt = 1;
    $('#add-bookmark').click(function() {
        bookmarkCnt++;
        console.log('bookmarkCnt: ' + bookmarkCnt)
        $(`#insert-before-me`).before(`
            <div>
                <label for="dialog-Bookmarks">Add Bookmark hh:mm:ss </label>   
                <input id="time-${bookmarkCnt}" type='time' class="without_ampm" step="1">  
                <textarea id="notes-${bookmarkCnt}" placeholder="Bookmark notes"></textarea>
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

    // ================================ Accordion functions =================================
    
    (<any>$(".Label-Body")).accordion({
        header: "> div > h3",
        active: false,
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