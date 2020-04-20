$(document).ready(function () {
    var player;
    var dialogWidth = 800;
    var dialogHeight = 600;
    var divClone = "<div class=\"split dialog-Video\">\n                    <label for=\"ytUrlInput\">Paste your YouTube Video URL: </label>            \n                    <input id=\"ytUrlInput\" type=\"text\">\n                    <div id=\"player1\"></div>\n                    </div>";
    // --------------------- Button functions -------------------------
    $('#submit-book').click(function () {
        alert("Book submitted");
        $("#dialog-add-video").dialog("close");
        location.reload();
    });
    $('.dialog-other').hide();
    $('#ytUrlInput').bind("paste", function () {
        handlePaste(insertVideo);
    });
    $('#add-bookmark').click(function () {
        $("#insert-before-me").before("\n            <div>\n                <label for=\"dialog-Bookmarks\">Add Bookmark hh:mm:ss </label>   \n                <input id=\"time-1\" type='time' class=\"without_ampm\" step=\"1\">  \n                <textarea id=\"notes-1\" placeholder=\"Bookmark notes\"></textarea>\n            </div>\n        ");
    });
    function handlePaste(callback) {
        var url = navigator.clipboard.readText().then(callback);
    }
    function insertVideo(url) {
        if (!validateUrl(url)) {
            alert("Please enter a valid YouTube Video URL");
        }
        else {
            var videoId = parseYoutubeUrl(url);
            console.log(videoId);
            onYouTubeIframeAPIReady(player, "player1", videoId);
            $('.dialog-other').show();
        }
    }
    function parseYoutubeUrl(url) {
        var regEx = /v=([^&]+)/;
        var match = url.match(regEx);
        console.log(match);
        var videoId = match[1];
        return videoId;
    }
    function validateUrl(url) {
        // example v=73Fyj6HZ6R0&t=3s
        // exclude only & character
        if (!url.match(/v=([^&]+)/)) {
            return false;
        }
        return true;
    }
    function onYouTubeIframeAPIReady(player, divInsert, videoId) {
        console.log('trigger youtube player');
        // @ts-ignore
        player = new YT.Player(divInsert, {
            width: dialogWidth,
            height: dialogHeight / 2,
            videoId: videoId,
            events: {}
        });
    }
    // --------------------- Dialog functions ---------------------------
    dialogAddVideo();
    function dialogAddVideo() {
        $("#dialog-add-video").dialog({
            autoOpen: false,
            width: dialogWidth,
            height: dialogHeight,
            resizable: false
        });
    }
    $("#addVideoBtn").click(function () {
        $("#dialog-add-video").dialog("open");
    });
    $("#dialog-edit-order").dialog({
        autoOpen: false,
        width: 800,
        height: 600,
        resizable: false
    });
    $("#image-icon").click(function () {
        $("#dialog-edit-order").dialog("open");
    });
    // ================================ Collapsible methods =================================
    $(".Label-Body").accordion({
        header: "> div > h3",
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
});
