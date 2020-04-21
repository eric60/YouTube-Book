var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
$(document).ready(function () {
    var localUrl = "http://localhost:8080";
    var herokuUrl = 'https://cryptic-basin-95763.herokuapp.com';
    var url = localUrl;
    var dialogWidth = 1200;
    var dialogHeight = 800;
    var videoWidth = 1000;
    var videoHeight = 800 / 1.5;
    // --------------------- Button functions -------------------------
    $('#submit-book').click(function () {
        alert("Book submitted");
        $("#dialog-add-video").dialog("close");
        videoCreate();
    });
    $('.dialog-other').hide();
    $('#ytUrlInput').bind("paste", function () {
        handlePaste(insertVideo);
    });
    var bookmarkCnt = 1;
    $('#add-bookmark').click(function () {
        bookmarkCnt++;
        console.log('bookmarkCnt: ' + bookmarkCnt);
        addBookmark("#insert-before-me", bookmarkCnt);
    });
    function addBookmark(divInsert, bookmarkCnt) {
        $(divInsert).before("\n            <div>\n                <label for=\"dialog-Bookmarks\">hh:mm:ss </label> \n                <input id=\"time-" + bookmarkCnt + "\" type='time' class=\"without_ampm\" step=\"1\">   \n                <div>\n                    <textarea id=\"notes-" + bookmarkCnt + "\" cols=\"35\" placeholder=\"Bookmark notes\"></textarea>\n                </div>  \n            </div>\n        ");
    }
    // --------------------- CRUD functions -------------------------
    function videoCreate() {
        var _this = this;
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var videoUrl, category, label, bookmarks, notes, newUrl, resp, j;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('----- In videoCreate -------');
                        videoUrl = $('#ytUrlInput').val();
                        category = getCategory();
                        label = getLabel();
                        bookmarks = getBookmarks();
                        notes = $('#dialog-Notes').val();
                        console.log("urlinput: " + videoUrl + ", category: " + category + ", label: " + label + ", notes: " + notes);
                        console.log(bookmarks);
                        newUrl = url + "/video" + "/eric/" + "/create?category=" + category + "&label=" + label;
                        console.log(newUrl);
                        return [4 /*yield*/, fetch(newUrl)];
                    case 1:
                        resp = _a.sent();
                        return [4 /*yield*/, resp.json()];
                    case 2:
                        j = _a.sent();
                        console.log(j);
                        return [2 /*return*/];
                }
            });
        }); })();
    }
    function videoRead() {
    }
    function videoUpdate() {
    }
    function videoDelete() {
    }
    // ------------------- Helper functions --------------------------
    function getBookmarks() {
        var bookmarks = [];
        for (var i = 1; i < bookmarkCnt + 1; i++) {
            var timestamp = $("#time-" + i).val();
            var timestampNotes = $("#notes-" + i).val();
            if (timestamp) {
                bookmarks[i] = {
                    timestamp: timestamp,
                    timestampNotes: timestampNotes
                };
            }
        }
        return bookmarks;
    }
    function getCategory() {
        // no spaces in html or urls so replace spaces with dashes
        var category = $('#select-category').find(":selected").text().replace(" ", "-");
        if (!category) {
            category = $('#dialog-category-input').val();
        }
        return category;
    }
    function getLabel() {
        var label = $('#select-label').find(":selected").text().replace(" ", "-");
        if (!label) {
            label = $('#dialog-label-input').val();
        }
        return label;
    }
    function handlePaste(callback) {
        var url = navigator.clipboard.readText().then(callback);
    }
    var addPlayer;
    function insertVideo(url) {
        if (!validateUrl(url)) {
            alert("Please enter a valid YouTube Video URL");
        }
        else {
            var videoId_1 = parseYoutubeUrl(url);
            console.log(videoId_1);
            onYouTubeIframeAPIReady(addPlayer, "player1", videoId_1, false);
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
    // ------------------------- YouTube player functions -------------------------
    // Yt iframe API not synchronous, need to wait until ready
    function checkYoutubePlayerReady() {
        // @ts-ignore
        if (typeof YT !== "undefined" && (YT && YT.Player)) {
            initYtVideos();
        }
        else {
            setTimeout(checkYoutubePlayerReady, 100);
        }
    }
    var videosLen = 2;
    var videoPlayers = [];
    var videoId = "XlvsJLer_No";
    function initYtVideos() {
        for (var i = 0; i < videosLen; i++) {
            var player = void 0;
            videoPlayers[i] = player;
            var divInsert = "video-" + (i + 1);
            console.log(divInsert);
            var lastVideo = false;
            if (i == videosLen - 1) {
                lastVideo = true;
            }
            onYouTubeIframeAPIReady(videoPlayers[i], divInsert, videoId, lastVideo);
        }
    }
    // 3. This function creates an <iframe> (and YouTube player) after the API code downloads.
    function onYouTubeIframeAPIReady(player, divInsert, videoId, lastVideo) {
        console.log('trigger youtube player');
        // @ts-ignore
        player = new YT.Player(divInsert, {
            width: videoWidth,
            height: videoHeight,
            videoId: videoId,
            events: {
                'onReady': onPlayerReady(event, lastVideo)
            }
        });
    }
    // wait until last youtube iframe on page loads until initAccordion
    // accordion will break if it needs to load something after initializing
    function onPlayerReady(event, lastVideo) {
        if (lastVideo) {
            console.log('trigger lastVideo onPlayerReady. Now can call accordion');
            initAccordion();
        }
    }
    // --------------------- Dialog functions ---------------------------
    dialogAddVideo();
    function dialogAddVideo() {
        $("#dialog-add-video").dialog({
            autoOpen: false,
            width: dialogWidth,
            height: dialogHeight,
            resizable: true
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
    // --------------------- Accordion functions ---------------------
    // On page load trigger 
    checkYoutubePlayerReady();
    function initAccordion() {
        console.log('trigger initAccordion');
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
    }
});
