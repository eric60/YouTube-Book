"use strict";
exports.__esModule = true;
var YouTubeLoader = /** @class */ (function () {
    function YouTubeLoader(TOTAL_VIDEO_CNT, videoWidth, videoHeight) {
        this.videoPlayers = [];
        this.videoId = "XlvsJLer_No";
        console.log("new test 123");
        this.TOTAL_VIDEO_CNT = TOTAL_VIDEO_CNT;
        this.videoWidth = videoWidth;
        this.videoHeight = videoHeight;
        // this.checkYoutubePlayerReady();
    }
    // Yt iframe API not synchronous, need to wait until ready
    YouTubeLoader.prototype.checkYoutubePlayerReady = function () {
        // @ts-ignore
        if (typeof YT !== "undefined" && (YT && YT.Player)) {
            console.log('trigger check youtube player ready');
            this.initYtVideos();
        }
        else {
            setTimeout(this.checkYoutubePlayerReady, 100);
        }
    };
    YouTubeLoader.prototype.initYtVideos = function () {
        for (var i = 1; i < this.TOTAL_VIDEO_CNT + 1; i++) {
            var divInsert = "video-" + i;
            console.log(divInsert);
            var lastVideo = false;
            if (i == this.TOTAL_VIDEO_CNT) {
                lastVideo = true;
            }
            this.onYouTubeIframeAPIReady(null, i, divInsert, this.videoId, lastVideo);
        }
        return true;
    };
    // 3. This function creates an <iframe> (and YouTube player) after the API code downloads.
    YouTubeLoader.prototype.onYouTubeIframeAPIReady = function (player, videoPlayerIdx, divInsert, videoId, lastVideo) {
        console.log('trigger youtube player');
        if (player == null) {
            // @ts-ignore
            videoPlayers[videoPlayerIdx] = new YT.Player(divInsert, {
                width: this.videoWidth,
                height: this.videoHeight,
                videoId: videoId,
                events: {
                    'onReady': this.onPlayerReady(event, lastVideo)
                }
            });
            console.log(this.videoPlayers[videoPlayerIdx]);
        }
        else {
            // @ts-ignore
            player = new YT.Player(divInsert, {
                width: this.videoWidth,
                height: this.videoHeight,
                videoId: videoId,
                events: {
                    'onReady': this.onPlayerReady(event, lastVideo)
                }
            });
        }
    };
    // wait until last youtube iframe on page loads until initAccordion
    // accordion will break if it needs to load something after initializing
    YouTubeLoader.prototype.onPlayerReady = function (event, lastVideo) {
        if (lastVideo) {
            console.log('trigger lastVideo onPlayerReady. Now can call accordion');
            this.initAccordion();
        }
    };
    // --------------------- Accordion functions ---------------------
    // On page load trigger 
    YouTubeLoader.prototype.initAccordion = function () {
        console.log('trigger initAccordion');
        console.log('---- Video players ---');
        console.log(this.videoPlayers);
        $(".Label-Body").accordion({
            header: "> div > h3",
            active: false,
            collapsible: true,
            heightStyle: "content"
        })
            .sortable({
            axis: "y",
            handle: "h3",
            stop: function (event, ui) {
                // IE doesn't register the blur when sorting
                // so trigger focusout handlers to remove .ui-state-focus
                ui.item.children("h3").triggerHandler("focusout");
                // Refresh accordion to handle new order
                $(this).accordion("refresh");
            },
            update: function () {
                save_new_order();
            }
        });
        function save_new_order() {
            var sortedIds = $(".Label-Body").sortable('toArray');
            console.log("new sortedIds: " + sortedIds);
        }
    };
    return YouTubeLoader;
}());
exports["default"] = YouTubeLoader;
