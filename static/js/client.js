'use strict';
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
exports.__esModule = true;
// import YouTubeLoader from './YouTubeLoader';
var VideoInserter_1 = require("./VideoInserter");
$(document).ready(function () {
    var localUrl = "http://localhost:8080";
    var herokuUrl = 'https://cryptic-basin-95763.herokuapp.com';
    var url = localUrl;
    var dialogWidth = 1200;
    var dialogHeight = 800;
    var videoWidth = 1000;
    var videoHeight = 800 / 1.5;
    var TOTAL_VIDEO_CNT = 3;
    var OLD_BOOKMARK_CNT = 1;
    var DIALOG_BOOKMARK_CNT = 1;
    // let ytLoader = new YouTubeLoader(TOTAL_VIDEO_CNT, videoWidth, videoHeight);
    var videoInserter = new VideoInserter_1["default"](1);
    videoInserter.sayHello();
    // On page load trigger 
    checkYoutubePlayerReady();
    // --------------------- Button trigger functions -------------------------
    $('#dialog-submit-book').click(function () {
        alert("Book submitted");
        $("#dialog-add-video").dialog("close");
        videoCreate();
    });
    $('#readTestBtn').click(function () {
        alert("Book read");
        videoRead();
    });
    $('.dialog-other').hide();
    $('#ytUrlInput').bind("paste", function () {
        handlePaste(insertVideo);
    });
    // @ts-ignore
    $("#delete-video").button({
        icons: {
            primary: "ui-icon-trash"
        },
        text: false
    });
    $("#delete-video-2").click(function () {
        alert("Book deleted");
        videoDelete();
    });
    // ---------------------  init Video Data  -------------------------
    function initVideoData() {
        // video-1, video-2
        for (var videoIdx = 1; videoIdx < TOTAL_VIDEO_CNT + 1; videoIdx++) {
            console.log('------initvideodata for video ' + videoIdx);
            addOldVideoBookmarks(videoIdx);
            addNewVideoBookmarks(videoIdx);
            addVideoSubmitBtn(videoIdx);
        }
    }
    function addOldVideoBookmarks(videoNum) {
        for (var i = 1; i < OLD_BOOKMARK_CNT + 1; i++) {
            addTimestampBtn(videoNum, i);
        }
        addInitialNewBookmark(videoNum);
    }
    function addTimestampBtn(videoNum, bookmarkIdx) {
        // video-1-time-1
        var timestampDiv = "#video-" + videoNum + "-time-" + bookmarkIdx;
        var timestampVal = $(timestampDiv).val();
        var timestampBtn = "#video-" + videoNum + "-link-" + bookmarkIdx;
        console.log('----' + timestampDiv + ': ' + timestampVal);
        var seconds = convertTimeToSeconds(timestampVal);
        console.log('--result seconds: ' + seconds);
        addTimeStamp(videoNum, timestampBtn, seconds);
    }
    function addInitialNewBookmark(videoNum) {
    }
    // ------------------ New bookmarks ------------------------
    function addNewVideoBookmarks(videoNum) {
        var add_bookmark_div = "#video-" + videoNum + "-add-bookmark";
        // for video 1 we have old bookmark 1, start on bookmark 2
        var newBookmarkIdx = OLD_BOOKMARK_CNT + 1;
        $(add_bookmark_div).click(function () {
            addNewBookmarkBtnAction(videoNum, newBookmarkIdx);
        });
    }
    function addNewBookmarkBtnAction(videoNum, bookmarkCnt) {
        addTimestampBtn(videoNum, bookmarkCnt);
        bookmarkCnt++; // start bookmark 2 -> bookmark 3
        var insertDiv = "#video-" + videoNum + "-insert-before-me";
        console.log('add video bookmarkCnt: ' + bookmarkCnt);
        addVideoBookmark(insertDiv, bookmarkCnt, videoNum);
    }
    function addVideoBookmark(divInsert, bookmarkCnt, videoNum) {
        var bmTime = "video-" + videoNum + "-time-" + bookmarkCnt;
        var bmNote = "video-" + videoNum + "-bm-" + bookmarkCnt;
        var timestampBtn = "<button id=\"video-" + videoNum + "-link-" + bookmarkCnt + "\" \n                        class=\"timestampBtn\">hh:mm:ss</button>";
        var addBookmarkBtnDiv = "#video-" + videoNum + "-add-bookmark";
        $(addBookmarkBtnDiv).remove();
        $(divInsert).before("\n            <div>\n                " + timestampBtn + "\n                <input id=\"" + bmTime + "\" type='time' class=\"without_ampm\" step=\"1\" value=\"00:00:00\">   \n                <div>\n                    <textarea id=\"" + bmNote + "\" cols=\"35\" placeholder=\"Bookmark notes\"></textarea>\n                    <button type=\"button\" id=\"video-1-add-bookmark\" class=\"add-bookmark btn btn-primary\">Add</button>\n                </div>  \n            </div>\n        ");
        $(addBookmarkBtnDiv).click(function () {
            addNewBookmarkBtnAction(videoNum, bookmarkCnt);
        });
    }
    function addVideoSubmitBtn(videoNum) {
        var videoSubmitId = "#video-" + videoNum + "-submit-book";
        $(videoSubmitId).click(function () {
            alert("Book submitted");
        });
    }
    // ------- helper functions for Video add bookmark ---------
    function convertTimeToSeconds(input) {
        var hours = parseInt(input.substring(0, 2));
        if (hours == 12) {
            hours = 0;
        }
        var minutes = parseInt(input.substring(3, 5));
        var seconds = parseInt(input.substring(6, 8));
        if (!seconds) {
            seconds = 0;
        }
        console.log(hours + ',' + minutes + ',' + seconds);
        seconds += (minutes * 60) + (hours * 3600);
        console.log('seconds: ' + seconds);
        return seconds;
    }
    // --------------------------- Dialog add bookmarks ----------------------
    $('#dialog-add-bookmark').click(function () {
        var insertDiv = "#dialog-insert-before-me";
        DIALOG_BOOKMARK_CNT++;
        console.log('add dialog bookmarkCnt: ' + DIALOG_BOOKMARK_CNT);
        addDialogBookmark(insertDiv, DIALOG_BOOKMARK_CNT);
    });
    function addDialogBookmark(divInsert, bookmarkCnt) {
        var dialogTime = "dialog-time-" + bookmarkCnt;
        var dialogNote = "dialog-bm-" + bookmarkCnt;
        $(divInsert).before("\n            <div>\n                <label for=\"dialog-Bookmarks\">hh:mm:ss </label> \n                <input id=\"" + dialogTime + "\" type='time' class=\"without_ampm\" step=\"1\">   \n                <div>\n                    <textarea id=\"" + dialogNote + "\" cols=\"35\" placeholder=\"Bookmark notes\"></textarea>\n                </div>  \n            </div>\n        ");
    }
    // --------------------- TODO CRUD functions -------------------------
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
                        bookmarks = getDialogBookmarks();
                        notes = $('#dialog-Notes').val();
                        console.log("urlinput: " + videoUrl + ", category: " + category + ", label: " + label + ", notes: " + notes);
                        console.log(bookmarks);
                        newUrl = url + "/video" + "/eric" + "/create?category=" + category + "&label=" + label;
                        console.log(newUrl);
                        return [4 /*yield*/, fetch(newUrl)];
                    case 1:
                        resp = _a.sent();
                        return [4 /*yield*/, resp.json()];
                    case 2:
                        j = _a.sent();
                        if (j['result'] !== 'error') {
                            console.log("Video created. Data: " + JSON.stringify(j));
                            document.getElementById("outputText").innerHTML = "Success; video created. Data: " + JSON.stringify(j);
                        }
                        else {
                            document.getElementById("outputText").innerHTML = "Error; video not created.";
                        }
                        return [2 /*return*/];
                }
            });
        }); })();
    }
    function videoRead() {
        var _this = this;
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var category, label, newURL, resp, j;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("videoRead called");
                        category = "someCategory" //to be deprecated.
                        ;
                        label = "someLabel" //to be deprecated.
                        ;
                        newURL = url + "/video" + "/eric" + "/read?category=" + category + "&label=" + label;
                        console.log("videoRead: fetching " + newURL);
                        return [4 /*yield*/, fetch(newURL)];
                    case 1:
                        resp = _a.sent();
                        return [4 /*yield*/, resp.json()];
                    case 2:
                        j = _a.sent();
                        if (j['result'] !== 'error') {
                            console.log("Video read. Data: " + JSON.stringify(j));
                            document.getElementById("outputText").innerHTML = "Success; video read. Data: " + JSON.stringify(j);
                        }
                        else {
                            document.getElementById("outputText").innerHTML = "Error; video not read.";
                        }
                        return [2 /*return*/];
                }
            });
        }); })();
    }
    function videoUpdate() {
    }
    function videoDelete() {
        var _this = this;
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var category, label, newURL, resp, j;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("---- in videoDelete ----");
                        category = "someCategroy";
                        label = "someLabel";
                        newURL = url + "/video" + "/eric" + "/delete?category=" + category + "&label=" + label;
                        console.log("videoDelete: fetching " + category, +', ' + label);
                        return [4 /*yield*/, fetch(newURL)];
                    case 1:
                        resp = _a.sent();
                        return [4 /*yield*/, resp.json()];
                    case 2:
                        j = _a.sent();
                        if (j['result'] !== 'error') {
                            console.log("Video deleted. Data: " + JSON.stringify(j));
                            document.getElementById("outputText").innerHTML = "Success; video deleted. Data: " + JSON.stringify(j);
                        }
                        else {
                            document.getElementById("outputText").innerHTML = "Error; video not deleted.";
                        }
                        return [2 /*return*/];
                }
            });
        }); })();
    }
    // ------------------- TODO Helper functions for getting data for CRUD  --------------------------
    // CREATE get data from add video dialog
    function getDialogBookmarks() {
        var timestampDiv = "dialog-time-";
        var bmNotes = "dialog-bm-";
        return getBookmarks(timestampDiv, bmNotes);
    }
    function getDialogCategory() {
    }
    function getDialogLabel() {
    }
    // UPDATE - get data from main screen
    function getBookmarks(timestamp, bmNotes) {
        var bookmarks = [];
        for (var i = 1; i < OLD_BOOKMARK_CNT + 1; i++) {
            timestamp += "" + i;
            bmNotes += "" + i;
            var timestampVal = $(timestamp).val();
            var bmNotesVal = $(bmNotes).val();
            if (timestamp) {
                bookmarks[i] = {
                    timestamp: timestampVal,
                    timestampNotes: bmNotesVal
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
    function getCategoryMainPage() {
        var category = $('#Category-Coding').text().replace(" ", "-");
        if (!category) {
            category = "err";
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
    // ---------------------  Add-video dialog functions  -------------------------------------------
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
            onYouTubeIframeAPIReady(addPlayer, 0, "player1", videoId_1, false);
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
    var videoPlayers = [];
    var videoId = "XlvsJLer_No";
    function initYtVideos() {
        for (var i = 1; i < TOTAL_VIDEO_CNT + 1; i++) {
            var divInsert = "video-" + i;
            console.log(divInsert);
            var lastVideo = false;
            if (i == TOTAL_VIDEO_CNT) {
                lastVideo = true;
            }
            onYouTubeIframeAPIReady(null, i, divInsert, videoId, lastVideo);
        }
        initVideoData();
    }
    // 3. This function creates an <iframe> (and YouTube player) after the API code downloads.
    function onYouTubeIframeAPIReady(player, videoPlayerIdx, divInsert, videoId, lastVideo) {
        console.log('trigger youtube player');
        if (player == null) {
            // @ts-ignore
            videoPlayers[videoPlayerIdx] = new YT.Player(divInsert, {
                width: videoWidth,
                height: videoHeight,
                videoId: videoId,
                events: {
                    'onReady': onPlayerReady(event, lastVideo)
                }
            });
            console.log(videoPlayers[videoPlayerIdx]);
        }
        else {
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
    }
    // wait until last youtube iframe on page loads until initAccordion
    // accordion will break if it needs to load something after initializing
    function onPlayerReady(event, lastVideo) {
        if (lastVideo) {
            console.log('trigger lastVideo onPlayerReady. Now can call accordion');
            initAccordion();
        }
    }
    function addTimeStamp(videoNum, timestampBtn, time) {
        // convert time to seconds
        $(timestampBtn).click(function () {
            videoPlayers[videoNum].seekTo(time, true);
        });
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
    function initAccordion() {
        console.log('trigger initAccordion');
        console.log('---- Video players ---');
        console.log(videoPlayers);
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
