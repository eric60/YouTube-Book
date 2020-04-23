export default class YouTubeLoader {
    videoPlayers : Array<any> = []
    videoId = "XlvsJLer_No"
    TOTAL_VIDEO_CNT;
    videoWidth;
    videoHeight;

    constructor(TOTAL_VIDEO_CNT : number, videoWidth : number, videoHeight : number) {
        console.log("new test 123")
        this.TOTAL_VIDEO_CNT = TOTAL_VIDEO_CNT;
        this.videoWidth = videoWidth;
        this.videoHeight = videoHeight;
        // this.checkYoutubePlayerReady();
    }

     // Yt iframe API not synchronous, need to wait until ready
    checkYoutubePlayerReady() {
        // @ts-ignore
        if (typeof YT !== "undefined" && (YT && YT.Player)) {
            console.log('trigger check youtube player ready')
            this.initYtVideos();
        } else {
            setTimeout(this.checkYoutubePlayerReady, 100)
        }
    }

    
 

    initYtVideos() {
        for (let i = 1; i < this.TOTAL_VIDEO_CNT + 1; i++) {
            let divInsert = "video-" + i;
            console.log(divInsert)
            
            let lastVideo = false
            if (i == this.TOTAL_VIDEO_CNT) {
                lastVideo = true;
            }
            this.onYouTubeIframeAPIReady(null, i ,divInsert, this.videoId, lastVideo);
        }
        return true;
    }


    // 3. This function creates an <iframe> (and YouTube player) after the API code downloads.
    onYouTubeIframeAPIReady(player : any, videoPlayerIdx: number, divInsert : string, videoId : string, lastVideo : boolean) {
        console.log('trigger youtube player')
 
        if (player == null) {
              // @ts-ignore
            videoPlayers[videoPlayerIdx] = new YT.Player(divInsert, {
                width: this.videoWidth,
                height: this.videoHeight,
                videoId: videoId,
                events: {
                    'onReady': this.onPlayerReady(event, lastVideo)
                },
            });
            console.log(  this.videoPlayers[videoPlayerIdx])
        } else {
            // @ts-ignore
            player = new YT.Player(divInsert, {
                width: this.videoWidth,
                height: this.videoHeight,
                videoId: videoId,
                events: {
                    'onReady': this.onPlayerReady(event, lastVideo)
                },
            });
        }
      
    }

      // wait until last youtube iframe on page loads until initAccordion
      // accordion will break if it needs to load something after initializing
    onPlayerReady(event, lastVideo : boolean) {
        if (lastVideo) {
            console.log('trigger lastVideo onPlayerReady. Now can call accordion')
            this.initAccordion();
        }
    }
    

      // --------------------- Accordion functions ---------------------
    // On page load trigger 


     initAccordion() {
        console.log('trigger initAccordion');
        console.log('---- Video players ---');
        console.log(this.videoPlayers);

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
   
}