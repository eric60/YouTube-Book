$(document).ready(function () {
    var player;
    var dialogWidth = 800;
    var dialogHeight = 600;
    $('#addYtBook').click(function () {
    });
    $('.dialog-other').hide();
    $('#ytUrlInput').bind("paste", function () {
        handlePaste(insertVideo);
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
    $("#dialog-add-video").dialog({
        autoOpen: false,
        width: dialogWidth,
        height: dialogHeight,
        resizable: false
    });
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
    $(".collapsible-category").accordion({
        collapsible: true
    });
    $(".collapsible-label").accordion({
        collapsible: true
    });
    $(".panel-panel-primary-education").accordion({
        collapsible: true
    });
});
