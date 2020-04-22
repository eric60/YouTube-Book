
declare var jquery: any;
$(document).ready(function() {
    const localUrl = `http://localhost:8080`;
    const herokuUrl = 'https://cryptic-basin-95763.herokuapp.com'
    const url =  localUrl

    let dialogWidth : number = 1200
    let dialogHeight : number = 800
    let videoWidth = 1000
    let videoHeight = 800 / 1.5

    let totalVideoCnt : number = 3;

    
     // --------------------- Button trigger functions -------------------------
     $('#dialog-submit-book').click(function() {
        alert("Book submitted");
        (<any>$("#dialog-add-video")).dialog("close");
        videoCreate();
     })

     $('#readTestBtn').click(function() {
         alert("Book read");
         videoRead();
     });
 
     $('.dialog-other').hide();
     $('#ytUrlInput').bind("paste", function() {
         handlePaste(insertVideo);
     });

    // @ts-ignore
     $( "#delete-video" ).button({  
        icons: {  
           primary: "ui-icon-trash"  
        },  
        text: false  
     });  
 

    // --------------------- Video add bookmarks TODO -------------------------
  
    let oldBookmarksCnt = 1;
    
    let videoBookmarkCnts : Array<number>= [];


    function initVideoData() {
        // video-1, video-2
        for (let i = 1; i < totalVideoCnt + 1; i++) {
            console.log('------initvideodata for video ' + i)
            addOldTimestampBtns(i);
            addOldVideoBookmarks(i)

            addNewVideoBookmarks(i);
          
            addVideoSubmitBtns(i);
          
       
        }

    }

    function addOldVideoBookmarks(videoNum : number) {

    }

    function addNewVideoBookmarks(videoNum : number) {
        let add_bookmark_div = `#video-${videoNum}-add-bookmark`
        videoBookmarkCnts[videoNum] = oldBookmarksCnt + 1; // 1 old bm, start on video-1-time-2 new
        let bookmarkCnt = videoBookmarkCnts[videoNum];

        $(add_bookmark_div).click(function() {
            addBookmarkBtnAction(videoNum, bookmarkCnt)
        })
    }

    function addBookmarkBtnAction(videoNum : number, bookmarkCnt : number) {
        addNewTimeStamp(videoNum, bookmarkCnt);
            
        bookmarkCnt++; // start bookmark 2 -> bookmark 3
        let insertDiv = `#video-${videoNum}-insert-before-me`
        console.log('add video bookmarkCnt: ' + bookmarkCnt)

        addVideoBookmark(insertDiv, bookmarkCnt, videoNum);
    }

    function addNewTimeStamp(videoNum : number, bookmarkCnt: number) {
        let timestampDiv = `#video-${videoNum}-time-${bookmarkCnt}`
        let timestampVal = $(timestampDiv).val();
        console.log('trigger addNewTimeStamp: ' + timestampVal + ', for : ' + timestampDiv)

        let timestampBtn = `#video-${videoNum}-link-${bookmarkCnt}`
        let seconds = convertTimeToSeconds(timestampVal);

        addTimeStamp(videoNum, timestampBtn, seconds);
    }

     function addVideoBookmark(divInsert: string, bookmarkCnt : number, videoNum : number) {
         let bmTime = `video-${videoNum}-time-${bookmarkCnt}`
         let bmNote = `video-${videoNum}-bm-${bookmarkCnt}`
         let timestampBtn = `<button id="video-${videoNum}-link-${bookmarkCnt}" 
                        class="timestampBtn">hh:mm:ss</button>`

        let addBookmarkBtnDiv = `#video-${videoNum}-add-bookmark`
        $(addBookmarkBtnDiv).remove();
        $(divInsert).before(`
            <div>
                ${timestampBtn}
                <input id="${bmTime}" type='time' class="without_ampm" step="1" value="00:00:00">   
                <div>
                    <textarea id="${bmNote}" cols="35" placeholder="Bookmark notes"></textarea>
                    <button type="button" id="video-1-add-bookmark" class="add-bookmark btn btn-primary">Add</button>
                </div>  
            </div>
        `);
        $(addBookmarkBtnDiv).click(function() {
            addBookmarkBtnAction(videoNum, bookmarkCnt)
        })
     }

     function addOldTimestampBtns(videoNum : number) {
         // video-1-time-1
         for (let i = 1; i < oldBookmarksCnt + 1; i++) {
            let timestampDiv = `#video-${videoNum}-time-${i}`
            let timestampVal = $(timestampDiv).val();
            let timestampBtn = `#video-${videoNum}-link-${i}`
            console.log('----' + timestampDiv + ': ' + timestampVal);

            let seconds = convertTimeToSeconds(timestampVal);
            console.log('--result seconds: ' + seconds);
            addTimeStamp(videoNum, timestampBtn, seconds)

         }
    }   

    function addVideoSubmitBtns(videoNum : number) {
        let videoSubmitId = `#video-${videoNum}-submit-book`
        $(videoSubmitId).click(function() {
            alert("Book submitted");
         })
    }

    // ------- helper functions for Video add bookmark ---------
    function convertTimeToSeconds(input : any) {
        let hours = parseInt(input.substring(0,2))
        if (hours == 12) {
            hours = 0;
        }
        let minutes = parseInt(input.substring(3,5))
        let seconds = parseInt(input.substring(6,8))
        if (!seconds) {
            seconds = 0;
        }
        console.log(hours + ',' + minutes + ',' + seconds);
        seconds += (minutes * 60) + (hours * 3600);
        console.log('seconds: ' + seconds);
        return seconds;

    }


     // --------------------------- Dialog add bookmarks ----------------------

     let bookmarkCnt = 1;
     $('#dialog-add-bookmark').click(function() {
         let insertDiv = `#dialog-insert-before-me`
         bookmarkCnt++;
         console.log('add dialog bookmarkCnt: ' + bookmarkCnt)
         addDialogBookmark(insertDiv, bookmarkCnt)
        
     })

     function addDialogBookmark(divInsert: string, bookmarkCnt : number) {
         let dialogTime = `dialog-time-${bookmarkCnt}`
         let dialogNote = `dialog-bm-${bookmarkCnt}`
        $(divInsert).before(`
            <div>
                <label for="dialog-Bookmarks">hh:mm:ss </label> 
                <input id="${dialogTime}" type='time' class="without_ampm" step="1">   
                <div>
                    <textarea id="${dialogNote}" cols="35" placeholder="Bookmark notes"></textarea>
                </div>  
            </div>
        `);
     }

   
    // --------------------- TODO CRUD functions -------------------------
    function videoCreate() {
        (async() => {
            console.log('----- In videoCreate -------')

            let videoUrl : any = $('#ytUrlInput').val();
            let category = getCategory();
            let label : string = getLabel();
            let bookmarks : Array<Object> = getDialogBookmarks();

            let notes : any = $('#dialog-Notes').val();

            console.log(`urlinput: ${videoUrl}, category: ${category}, label: ${label}, notes: ${notes}`)
            console.log(bookmarks);

            const newUrl : string = url + "/video" + "/eric" + "/create?category=" + category + "&label=" + label;
            console.log(newUrl);

            const resp = await fetch(newUrl);
            const j = await resp.json();

            if (j['result'] !== 'error'){
                console.log("Video created. Data: " + JSON.stringify(j));
                document.getElementById("outputText").innerHTML = "Success; video created. Data: " + JSON.stringify(j); 
            } else {
                document.getElementById("outputText").innerHTML = "Error; video not created."
            }

        })();
    }




    function videoRead() { //temporary, DB implementation to return proper data
        (async() => {
            console.log("videoRead called");
            let category = "someCategory" //to be deprecated.
            let label = "someLabel" //to be deprecated.
            const newURL : string = url + "/video" + "/eric" + "/read?category=" + category + "&label=" + label;
            console.log("videoRead: fetching " + newURL);
            const resp = await fetch(newURL);
            const j = await resp.json();
            if (j['result'] !== 'error'){
                console.log("Video read. Data: " + JSON.stringify(j));
                document.getElementById("outputText").innerHTML = "Success; video read. Data: " + JSON.stringify(j); 
            } else {
                document.getElementById("outputText").innerHTML = "Error; video not read."
            }
            })();
    }

    function videoUpdate() {

    }

    function videoDelete() {

    }


    
    // ------------------- TODO Helper functions for getting data for CRUD  --------------------------
    // CREATE
    function getDialogBookmarks() {
        let timestampDiv = `dialog-time-`
        let bmNotes = `dialog-bm-`
        return getBookmarks(timestampDiv, bmNotes)

    }

    function getDialogCategory() {

    }

    function getDialogLabel() {

    }

    // UPDATE - get data from main screen


    function getBookmarks(timestamp : string, bmNotes: string) {
        let bookmarks = [];
        
        for (let i = 1; i < bookmarkCnt + 1; i++) {
            timestamp += `${i}`
            bmNotes += `${i}`
            let timestampVal =  $(timestamp).val()
            let bmNotesVal =  $(bmNotes).val()

            if (timestamp) {
                bookmarks[i] = {
                    timestamp: timestampVal,
                    timestampNotes: bmNotesVal
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

    function getCategoryMainPage() { //gets category for current video
        let category : any = $('#Category-Coding').text().replace(" ", "-");
        if (!category) {
            category = "err";
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
    
    // ---------------------  Add-video dialog functions  -------------------------------------------
    function handlePaste(callback) {
        let url = navigator.clipboard.readText().then(callback);
    }

    let addPlayer : any;
    function insertVideo(url : string) {
        if(!validateUrl(url)) {
            alert("Please enter a valid YouTube Video URL");
        }
        else {
            let videoId = parseYoutubeUrl(url)
            console.log(videoId)
            onYouTubeIframeAPIReady(addPlayer, 0, "player1", videoId, false);
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
    // ------------------------- YouTube player functions -------------------------
    // Yt iframe API not synchronous, need to wait until ready
    function checkYoutubePlayerReady() {
        // @ts-ignore
        if (typeof YT !== "undefined" && (YT && YT.Player)) {
            initYtVideos();
        } else {
            setTimeout(checkYoutubePlayerReady, 100)
        }
    }

    
    let videoPlayers : Array<any> = []
    let videoId = "XlvsJLer_No"

    function initYtVideos() {
        for (let i = 1; i < totalVideoCnt + 1; i++) {
            let divInsert = "video-" + i;
            console.log(divInsert)
            
            let lastVideo = false
            if (i == totalVideoCnt) {
                lastVideo = true;
            }
            onYouTubeIframeAPIReady(null, i ,divInsert, videoId, lastVideo);
        }
        initVideoData();
    }


    // 3. This function creates an <iframe> (and YouTube player) after the API code downloads.
    function onYouTubeIframeAPIReady(player : any, videoPlayerIdx: number, divInsert : string, videoId : string, lastVideo : boolean) {
        console.log('trigger youtube player')
 
        if (player == null) {
              // @ts-ignore
            videoPlayers[videoPlayerIdx] = new YT.Player(divInsert, {
                width: videoWidth,
                height: videoHeight,
                videoId: videoId,
                events: {
                    'onReady': onPlayerReady(event, lastVideo)
                },
            });
            console.log(  videoPlayers[videoPlayerIdx])
        } else {
            // @ts-ignore
            player = new YT.Player(divInsert, {
                width: videoWidth,
                height: videoHeight,
                videoId: videoId,
                events: {
                    'onReady': onPlayerReady(event, lastVideo)
                },
            });
        }
      
    }

      // wait until last youtube iframe on page loads until initAccordion
      // accordion will break if it needs to load something after initializing
      function onPlayerReady(event, lastVideo : boolean) {
        if (lastVideo) {
            console.log('trigger lastVideo onPlayerReady. Now can call accordion')
            initAccordion();
        }
      }

      function addTimeStamp(videoNum : number, timestampBtn : string, time : number) {
          // convert time to seconds
          $(timestampBtn).click(function() {
            videoPlayers[videoNum].seekTo(time, true);
          })
      }

    // --------------------- Dialog functions ---------------------------
    dialogAddVideo()
    function dialogAddVideo() {
        (<any>$( "#dialog-add-video" )).dialog({ 
            autoOpen: false,
            width: dialogWidth,
            height:dialogHeight,
            resizable: true
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

    // --------------------- Accordion functions ---------------------
    // On page load trigger 
    checkYoutubePlayerReady()

    function initAccordion() {
        console.log('trigger initAccordion');
        console.log('---- Video players ---');
        console.log(videoPlayers);

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
      
    }
   
});