'use strict';
// import YouTubeLoader from './YouTubeLoader';
import VideoInserter from './VideoInserter';


declare var jquery: any;
$(document).ready(function() {

    let windowUrl = window.location.href
    const localUrl = `http://localhost:8080`;
    const herokuUrl = 'https://cryptic-basin-95763.herokuapp.com'
    let urlLocalHostIndex = windowUrl.indexOf("localhost")
  
    if (urlLocalHostIndex != -1) {
        var url =  localUrl
    } else {
        var url =  herokuUrl
    }
    console.log('url set to ' + window.location.href)


    let windowWidth : number =  $(window).width(); 
    let windowHeight : number =  $(window).height();
    console.log('windowWidth: ' + windowWidth + ", windowHeight:" + windowHeight)

    let dialogWidth : number = windowWidth * 0.90 // 1200
    let dialogHeight : number = dialogWidth * .6 // 800
    let videoWidth : number = dialogWidth * 0.85 // 1000
    let videoHeight : number = videoWidth * .5 // 500


    // let ytLoader = new YouTubeLoader(TOTAL_VIDEO_CNT, videoWidth, videoHeight);
    let videoInserter = new VideoInserter();
  
    
     // --------------------- TODO: Initial Screen Trigger -----------------
     let TOTAL_VIDEO_CNT : number;
   
     let DIALOG_BOOKMARK_CNT= 1;


     const username = 'productionUser11';
     let labelVideos;
     let videoPlayers : Array<any> = []
     let label1Videos: Array<any>;

    /* 
     *  Need to process all html first, then init yt players, then init video data due to having to load all YT videos 
     *  before the accordion can load. This is why we are duplicating our for loops multiple times.

        1) readAll data
        2) processLabelVideosHtml -> videoInserter insert all html structures looping through
        3) checkYoutubePlayerReader
        4) initYtVideos based on divs inserted
        5) initVideoData onto the divs - title, notes, bookmarks
     */
     readAll(processLabelVideosHtml);

     

     // --------------------

     function processLabelVideosHtml() {
         console.log("--------- Label Videos Array ---------")
         console.log(labelVideos);
      
        label1Videos = labelVideos.videoData[0].videos; // 2 videos
        TOTAL_VIDEO_CNT = label1Videos.length;
        console.log("TOTAL_VIDEO_CNT: " + TOTAL_VIDEO_CNT)

        for (let i = 1; i < TOTAL_VIDEO_CNT + 1; i++) {
            let currVideoUrl = label1Videos[i-1].videoUrl
            if (!currVideoUrl) {
                continue;
            }


            let oldNumBookmarks = label1Videos[i-1].bookmarks.length;
            console.log("----- Inserting labelvideo: " + i + ", Old bookmarks length: " + oldNumBookmarks);
            videoInserter.insertVideoDiv(i, oldNumBookmarks, currVideoUrl);

        }
        checkYoutubePlayerReady()
     }

    function initYtVideos() {
        console.log("In initYtVideos()")
        for (let i = 1; i < TOTAL_VIDEO_CNT + 1; i++) {
            let divInsert = "video-" + i;
            console.log(divInsert)
            
            let currVideoUrl = label1Videos[i-1].videoUrl
            let videoId = parseYoutubeUrl(currVideoUrl)
           
            let lastVideo = false
            if (i == TOTAL_VIDEO_CNT) {
                lastVideo = true;
            }
            onYouTubeIframeAPIReady(null, i ,divInsert, videoId, lastVideo);
        }
        initVideoData();
    }

    function initVideoData() {
        // video-1, video-2
        for (let videoIdx = 1; videoIdx < TOTAL_VIDEO_CNT + 1; videoIdx++) {
            console.log('------initvideodata for video ' + videoIdx)
            let currVideo = label1Videos[videoIdx-1];
            console.log(currVideo);
            
            let videoTitle = currVideo.videoTitle;
            let url = currVideo.videoUrl;
            let notes = currVideo.notes;
            let oldBookmarks = currVideo.bookmarks;
            let oldNumBookmarks = currVideo.bookmarks.length;

            let videoId = `#video-${videoIdx}-`
            $(videoId + "title").text(videoTitle);
            $(videoId + "notes").val(notes);
            insertBookMarkData(videoIdx, oldBookmarks);

            addOldVideoBookmarks(videoIdx, oldNumBookmarks)

            addNewVideoBookmarks(videoIdx, oldNumBookmarks);
          
            addVideoSubmitBtn(videoIdx);
            
            addDeleteButton(videoIdx);
          
        }
    }

    function insertBookMarkData(videoNum : number, oldBookmarks : Array<any>) {
        let len = oldBookmarks.length;
        for (let i = 1; i < len + 1; i++) {
            let bookmarkTimeDiv = `#video-${videoNum}-time-${i}`;
            let bookmarkNotesDiv = `#video-${videoNum}-bm-${i}`;
            let bookmarkObj = oldBookmarks[i - 1]
            let timestamp = bookmarkObj.timestamp;
            let timestampNotes = bookmarkObj.timestampNotes;
            $(bookmarkTimeDiv).val(timestamp);
            $(bookmarkNotesDiv).val(timestampNotes);
        }
    }


     // --------------------- Button trigger functions -------------------------
     $('#dialog-submit-book').click(function() {
        if (!checkDialogInputs()) {
        } 
        else {
            (<any>$("#dialog-add-video")).dialog("close");
            videoCreate();           
        }
     })

     $('#readTestBtn').click(function() {
         alert("Book read");
         videoRead();
     });

  /*    $('#readAllTestBtn').click(function() {
        alert("All books read");
        readAll(processLabelVideos);
    }); */

 
     $('.dialog-other').hide();
     $('#dialog-url').bind("paste", function() {
         handlePaste(insertVideo);
     });

    // @ts-ignore
     $( "#delete-video" ).button({  
        icons: {  
           primary: "ui-icon-trash"  
        },  
        text: false  
     });
     
     /*$( ".videoDeleteButtons" ).click(function() {  
        confirm("Are you sure you want to delete this book?");
        let videoNum = 300;
        let videoDeleteId = `#video-${videoNum}-submit-book`
        $(videoDeleteId).click(function() {
            alert("Deleting book.");
            videoDelete(videoNum);
         });
     }); */

     function addDeleteButton(videoNum : number) { //main screen submit button routing function
        let videoDeleteId = `#video-${videoNum}-delete-book`
        $(videoDeleteId).click(function() {
            alert("Book deleting...");
            videoDelete(videoNum);
            window.location.reload();
         })
    }
 

    // ---------------------  init Video Data  -------------------------
  
  

    function addOldVideoBookmarks(videoNum : number, oldNumBookmarks: number) {
        for (let i = 1; i < oldNumBookmarks + 1; i++) {
            addTimestampBtn(videoNum, i);
        }
        addInitialNewBookmarkDiv(videoNum, oldNumBookmarks + 1);
    }

    function addTimestampBtn(videoNum : number, bookmarkIdx : number) {
        // video-1-time-1
        let timestampDiv = `#video-${videoNum}-time-${bookmarkIdx}`
        let timestampVal = $(timestampDiv).val();
        let timestampBtn = `#video-${videoNum}-link-${bookmarkIdx}`
        console.log('----' + timestampDiv + ': ' + timestampVal);

        let seconds = convertTimeToSeconds(timestampVal);
        console.log('--result seconds: ' + seconds);

        addTimeStamp(videoNum, timestampBtn, seconds)
        
        // @ts-ignore
        $(timestampDiv).change(function() {
            let changedTimestampVal = $(timestampDiv).val();
            let changedSeconds = convertTimeToSeconds(changedTimestampVal);
            console.log("Bookmark val changed: " + changedSeconds);
            addTimeStamp(videoNum, timestampBtn, changedSeconds)
        })
    
    }   

    function addInitialNewBookmarkDiv(videoNum : number, newBookmarkIdx : number) {
        console.log("addInitialNewBookDiv for: " + videoNum);

        let entryDiv = `#video-${videoNum}-new-bm`

        let divAppend = `
            <div class="boxTitle"><b>Add New Bookmarks</b></div>
                <button id="video-${videoNum}-link-${newBookmarkIdx}" class="timestampBtn" >hh:mm:ss</button>  
                <input id="video-${videoNum}-time-${newBookmarkIdx}" type='time' class="without_ampm" value="00:00:00" step="1" required>  
               
                <div>
                <textarea class="bookmark-notes" id="video-${videoNum}-bm-${newBookmarkIdx}" cols="35"></textarea>
                </div>

                <button type="button" id="video-${videoNum}-add-bookmark" class="add-bookmark btn btn-primary">Add New</button>
            <div id="video-${videoNum}-insert-before-me"></div>
         `
         $(entryDiv).append(divAppend);
         addTimestampBtn(videoNum, newBookmarkIdx);
    }
    

    // ------------------ New bookmarks ------------------------
    function addNewVideoBookmarks(videoNum : number,  oldNumBookmarks: number) {
        let add_bookmark_div = `#video-${videoNum}-add-bookmark`
        // for video 1 we have old bookmark 1, start on bookmark 2
       
        let newBookmarkIdx =  oldNumBookmarks + 1;

        $(add_bookmark_div).click(function() {
            addNewBookmarkBtnAction(videoNum, newBookmarkIdx)
        })
    }

    function addNewBookmarkBtnAction(videoNum : number, bookmarkCnt : number) {            
        bookmarkCnt++; // start bookmark 2 -> bookmark 3
        let insertDiv = `#video-${videoNum}-insert-before-me`
        console.log('add video bookmarkCnt: ' + bookmarkCnt)

        addVideoBookmark(insertDiv, bookmarkCnt, videoNum);
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
                </div>  
                <button type="button" id="video-${videoNum}-add-bookmark" class="add-bookmark btn btn-primary">Add New</button>
            </div>
        `);
        addTimestampBtn(videoNum, bookmarkCnt);
        $(addBookmarkBtnDiv).click(function() {
            addNewBookmarkBtnAction(videoNum, bookmarkCnt)
        })
     }


    function addVideoSubmitBtn(videoNum : number) { //main screen submit button routing function
        let videoSubmitId = `#video-${videoNum}-submit-book`
        $(videoSubmitId).click(function() {
            alert("Book updating...");
            videoUpdate(videoNum);
            window.location.reload();
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

    dialogAddBookmarkAction();
    function dialogAddBookmarkAction() {
        $('#dialog-add-bookmark').click(function() {
            let insertDiv = `#dialog-insert-before-me`
            DIALOG_BOOKMARK_CNT++;
            console.log('add dialog bookmarkCnt: ' + DIALOG_BOOKMARK_CNT)
            addDialogBookmark(insertDiv, DIALOG_BOOKMARK_CNT)
           
        })
    }
   
     function addDialogBookmark(divInsert: string, bookmarkCnt : number) {
         let dialogTime = `dialog-time-${bookmarkCnt}`
         let dialogNote = `dialog-bm-${bookmarkCnt}`

         let dialogAddBookmarkBtnDiv = `#dialog-add-bookmark`
         $(dialogAddBookmarkBtnDiv).remove();

        $(divInsert).before(`
            <div>
                <label for="dialog-Bookmarks">hh:mm:ss </label> 
                <input id="${dialogTime}" type='time' class="without_ampm" step="1" value="00:00:00">   
                <div>
                    <textarea id="${dialogNote}" cols="35" placeholder="Bookmark notes"></textarea>
                </div>  
                <button type="button" id="dialog-add-bookmark" class="add-bookmark btn btn-primary">Add New</button>
            </div>
        `);
        dialogAddBookmarkAction();
     }

   
    // --------------------- TODO CRUD functions -------------------------
    async function postData(url : string, data : Object) {
        const resp = await fetch(url,
        {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            body: JSON.stringify(data)
        });
        return resp;
    }

    function videoCreate() {
        (async() => {
            console.log('----- In videoCreate -------')
            let videoUrl : any = $('#dialog-url').val();
            let title : any = getDialogTitle();
            let category = getDialogCategory();
            let label : string = getDialogLabel();
            let notes : any = $('#dialog-Notes').val();
            let bookmarks : Array<Object> = getDialogBookmarks();
         
            const newUrl : string = `${url}/video/${username}/create`
            console.log(newUrl);

            const data = {
                videoObj: {
                    category: category,
                    label: label,
                    title: title,
                    videoUrl: videoUrl,
                    bookmarks: bookmarks,
                    notes: notes
                }
            }
            console.log('Video object sent: ')
            console.log(data);

            const resp = await postData(newUrl, data);
            const j = await resp.json();

            console.log("Here")
            console.log(j);
            if (j.result !== 'Video Found. Not adding.'){
                console.log("Video created. Data: " + JSON.stringify(j));
                window.location.reload();
            } else {
                alert("Book not added. Book with that url already exists.")
            }

        })();
    }


    function videoRead() { //temporary, DB implementation to return proper data
        (async() => {
            console.log("videoRead called");
            let category = "someCategory" //to be deprecated.
            let label = "someLabel" //to be deprecated.
            const newURL : string = url + "/video" + `/${username}` + "/read?category=" + category + "&label=" + label;
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

    function readAll(processLabelVideos) {
        (async() => {
            console.log("readAll called");
            const newURL : string = url + "/video" + `/${username}` + "/readAll";

            console.log("readAll: fetching all videos");
            const resp = await fetch(newURL);
            const j = await resp.json();

            if (j['result'] !== 'error'){
                console.log("Label videos read. Data: " + JSON.stringify(j));
                labelVideos = j;
                processLabelVideos();
            } else {
                console.log("Error; video not read.")
            }
            })();
    }

    function videoUpdate(videoNum) {
        (async () => {

            let htmlVideoUrl = $(`.video-${videoNum}-vid`).attr('id'); //gets URL of the video in question
            console.log("----------- Video Id: " + htmlVideoUrl + " for video number: " + videoNum);

            let category = $(`.Category`).attr('id').substring(9).replace(/-/g, " "); //gets category of the video in question
            let label = $(`.label-btn`).attr('id').substring(6).replace(/-/g, " "); //gets label of the video in question

            let videoTitle = $(`#video-${videoNum}-title`).text();

            let videoURL = htmlVideoUrl;

            console.log("VIDEO TITLE: " + videoTitle);
            console.log("VIDEO URL: " + videoURL);

            const newURL : string = url + "/video" + `/${username}` + "/update?category=" + category + "&label=" + label + '&videoId=' + videoURL;
            let notes : any = $(`#video-${videoNum}-notes`).val();
           let stopAt = 0; //the number to stop inserting bookmarks at
           let i = 1;
           while(true){
               if($(`#video-${videoNum}-bm-${i}`).length > 0){
                   i++;
               }
               else{
                   stopAt = i - 1;
                   break;
               }
            }

           let bookmarks : Array<Object> = getBookmarks(`#video-${videoNum}-time-`, `#video-${videoNum}-bm-`, stopAt);
        
            const data = {
                videoObj: {
                    category: category,
                    label: label,
                    title : videoTitle,
                    videoUrl : videoURL,
                    bookmarks: bookmarks,
                    notes: notes,
                }
            }
            console.log(data);
            const resp = await postData(newURL, data);
            const j = await resp.json();

            if (j['result'] !== 'error'){
                console.log("Video updated. Data: " + JSON.stringify(j));
            } else {
                console.log("Error. video not updated");
            }
            })();
    }
    // video-1-delete-video
    function videoDelete(videoNum) {
        (async() => {

            let videoURL = $(`.video-${videoNum}-vid`).attr('id'); //gets URL of the video in question
            console.log("----------- Video Id: " + videoURL + " for video number: " + videoNum);

            const newURL : string = url + "/video" + `/${username}` + "/delete?videoId=" + videoURL;

            const data = {
                videoObj: {
                    videoUrl : videoURL
                }
            }
            console.log(data);
            const resp = await postData(newURL, data);
            const j = await resp.json();

            if (j['result'] !== 'error'){
                console.log("Video updated. Data: " + JSON.stringify(j));
            } else {
                console.log("Error. video not updated");
            }
            })();
    }


    
    // ------------------- TODO Helper functions for getting data for CRUD  --------------------------
    // CREATE get data from add video dialog
    
    function checkDialogInputs() {
        if (!getDialogCategory() || !getDialogLabel() || !getDialogTitle()) {
            return false;
        } 
        return true;
    }

    function getDialogTitle() {
        let title = $('#dialog-title').val()
        console.log('-- getDialogTitle: ' + title)
        if (!title) {
            alert("Please enter a Title")
            return false;
        }
        return title;
    }

    function getDialogBookmarks() {
        let timestampDiv = `#dialog-time-`
        let timestampNotes = `#dialog-bm-`
        return getBookmarks(timestampDiv, timestampNotes, DIALOG_BOOKMARK_CNT);
    }

    function getDialogCategory() {
        // no spaces in html or urls so replace spaces with dashes
        let category : any = $('#dialog-select-category').find(":selected").text()
        if (category === "Choose Category") {
            alert("Please select a Category. Sorry we are unable to process new categories currently.")
            return false;
            // category = $('#dialog-category-input').val();
        } else {
            return category;
        }
    }

    function getDialogLabel() {
        let label : any = $('#dialog-select-label').find(":selected").text()
        if (label === "Choose Label") {
            // label = $('#dialog-label-input').val();
            alert("Please select a Label. Sorry we are unable to process new labels currently.")
            return false;
        } else {
            return label;
        }
    }

    // general use for both CREATE and UPDATE
    function getBookmarks(timestampHtml : string, timestampNotesHtml: string, bookmarksCnt : number) {
        let bookmarks = [];
        
        for (let i = 0; i < bookmarksCnt; i++) {
            let bookmarkIdx = i + 1;

            let timestampDiv = timestampHtml + bookmarkIdx;
            let timestampNotesDiv = timestampNotesHtml + bookmarkIdx;
            console.log('timestampdiv:' + timestampDiv + "\ntimestampNotesDiv: " + timestampNotesDiv)

            let timestampVal =  $(timestampDiv).val()
            let timestampNotesVal =  $(timestampNotesDiv).val()

            let emptyBookmark = timestampVal == "00:00:00" && timestampNotesVal == ""
            if (!emptyBookmark) {
                bookmarks[i] = {
                    timestamp: timestampVal,
                    timestampNotes: timestampNotesVal
                }
            } else {
                console.log(bookmarkIdx + ") Did not add timestamp.\nTimestampVal: "+ timestampVal + ", timestampNotesVal: " + timestampNotesVal);
            }
        }
        return bookmarks;
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
        if (!url) {
           return null;
        }
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
            setTimeout(checkYoutubePlayerReady, 200)
        }
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