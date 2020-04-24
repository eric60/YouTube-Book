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
    console.log('url: ' + window.location.href);
    var windowUrl = window.location.href;
    var localUrl = "http://localhost:8080";
    var herokuUrl = 'https://cryptic-basin-95763.herokuapp.com';
    if (windowUrl.indexOf("localhost")) {
        var url = localUrl;
    }
    else {
        var url = herokuUrl;
    }
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    console.log('windowWidth: ' + windowWidth + ", windowHeight:" + windowHeight);
    var dialogWidth = windowWidth * 0.8; // 1200
    var dialogHeight = dialogWidth * .67; // 800
    var videoWidth = dialogWidth * 0.85; // 1000
    var videoHeight = videoWidth * .5; // 500
    // --------- TODO Data from GET call to user's video list -----------------
    var TOTAL_VIDEO_CNT = 3;
    var OLD_BOOKMARK_CNT = 1;
    // -------------------------------------------------------------------
    var DIALOG_BOOKMARK_CNT = 1;
    var MAINPG_BOOKMARK_CNT = 2;
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
    $('#readAllTestBtn').click(function () {
        alert("All books read");
        readAll();
    });
    $('.dialog-other').hide();
    $('#dialog-url').bind("paste", function () {
        handlePaste(insertVideo);
    });
    // @ts-ignore
    $("#delete-video").button({
        icons: {
            primary: "ui-icon-trash"
        },
        text: false
    });
    $("#delete-video").click(function () {
        confirm("Are you sure you want to delete this book?");
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
            alert("Book updating...");
            videoUpdate(videoNum);
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
    dialogAddBookmarkAction();
    function dialogAddBookmarkAction() {
        $('#dialog-add-bookmark').click(function () {
            var insertDiv = "#dialog-insert-before-me";
            DIALOG_BOOKMARK_CNT++;
            console.log('add dialog bookmarkCnt: ' + DIALOG_BOOKMARK_CNT);
            addDialogBookmark(insertDiv, DIALOG_BOOKMARK_CNT);
        });
    }
    function addDialogBookmark(divInsert, bookmarkCnt) {
        var dialogTime = "dialog-time-" + bookmarkCnt;
        var dialogNote = "dialog-bm-" + bookmarkCnt;
        var dialogAddBookmarkBtnDiv = "#dialog-add-bookmark";
        $(dialogAddBookmarkBtnDiv).remove();
        $(divInsert).before("\n            <div>\n                <label for=\"dialog-Bookmarks\">hh:mm:ss </label> \n                <input id=\"" + dialogTime + "\" type='time' class=\"without_ampm\" step=\"1\" value=\"00:00:00\">   \n                <div>\n                    <textarea id=\"" + dialogNote + "\" cols=\"35\" placeholder=\"Bookmark notes\"></textarea>\n                    <button type=\"button\" id=\"dialog-add-bookmark\" class=\"add-bookmark btn btn-primary\">Add</button>\n                </div>  \n            </div>\n        ");
        dialogAddBookmarkAction();
    }
    // --------------------- TODO CRUD functions -------------------------
    function postData(url, data) {
        return __awaiter(this, void 0, void 0, function () {
            var resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(url, {
                            method: 'POST',
                            mode: 'cors',
                            cache: 'no-cache',
                            credentials: 'same-origin',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            redirect: 'follow',
                            body: JSON.stringify(data)
                        })];
                    case 1:
                        resp = _a.sent();
                        return [2 /*return*/, resp];
                }
            });
        });
    }
    function videoCreate() {
        var _this = this;
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var videoUrl, title, category, label, notes, bookmarks, username, newUrl, data, resp, j;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('----- In videoCreate -------');
                        videoUrl = $('#dialog-url').val();
                        title = $('#dialog-title').val();
                        category = getDialogCategory();
                        label = getDialogLabel();
                        notes = $('#dialog-Notes').val();
                        bookmarks = getDialogBookmarks();
                        console.log("url: " + videoUrl + "\n title: " + title + "\n category: " + category + "\n label: " + label + "\n notes: " + notes + "\n bookmarks:");
                        username = "eric";
                        newUrl = url + "/video/" + username + "/create";
                        console.log(newUrl);
                        data = {
                            videoObj: {
                                category: category,
                                label: label,
                                title: title,
                                videoUrl: videoUrl,
                                bookmarks: bookmarks,
                                notes: notes
                            }
                        };
                        console.log('in videoCreate video obj: ');
                        console.log(data);
                        return [4 /*yield*/, postData(newUrl, data)];
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
    function readAll() {
        var _this = this;
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var newURL, resp, j;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("readAll called");
                        newURL = url + "/video" + "/eric" + "/readAll";
                        console.log("readAll: fetching all videos");
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
    function videoUpdate(videoNum) {
        var _this = this;
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var category, label, newURL, notes, timestampDiv, timestampNotes, bookmarks, data, resp, j;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        category = document.getElementsByClassName("video-" + videoNum + "-category")[0].id.substring(9);
                        label = document.getElementsByClassName("video-" + videoNum + "-label")[0].id.substring(6);
                        newURL = url + "/video" + "/eric" + "/update?category=" + category + "&label=" + label;
                        notes = $("#video-" + videoNum + "-notes").val();
                        timestampDiv = "#video-" + videoNum + "-time-";
                        timestampNotes = "#video-" + videoNum + "-bm-";
                        bookmarks = getBookmarks(timestampDiv, timestampNotes, MAINPG_BOOKMARK_CNT);
                        data = {
                            videoObj: {
                                category: category,
                                label: label,
                                bookmarks: bookmarks,
                                notes: notes
                            }
                        };
                        console.log(data);
                        return [4 /*yield*/, postData(newURL, data)];
                    case 1:
                        resp = _a.sent();
                        return [4 /*yield*/, resp.json()];
                    case 2:
                        j = _a.sent();
                        if (j['result'] !== 'error') {
                            console.log("Video updated. Data: " + JSON.stringify(j));
                            document.getElementById("outputText").innerHTML = "Success; video updated. Data: " + JSON.stringify(j);
                        }
                        else {
                            document.getElementById("outputText").innerHTML = "Error; video not updated.";
                        }
                        return [2 /*return*/];
                }
            });
        }); })();
    }
    // video-1-delete-video
    function videoDelete() {
        var _this = this;
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var category, label, videoId, newURL, resp, j;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("---- in videoDelete ----");
                        category = "someCategroy";
                        label = "someLabel";
                        videoId = "someID";
                        newURL = url + "/video" + "/eric" + "/delete?category=" + category + "&label=" + label + '&videoId=' + videoId;
                        console.log("videoDelete: fetching " + category, +', ' + label + ', ' + videoId);
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
        var timestampDiv = "#dialog-time-";
        var timestampNotes = "#dialog-bm-";
        return getBookmarks(timestampDiv, timestampNotes, DIALOG_BOOKMARK_CNT);
    }
    function getDialogCategory() {
        // no spaces in html or urls so replace spaces with dashes
        var category = $('#dialog-select-category').find(":selected").text();
        if (category === "Choose Category") {
            category = $('#dialog-category-input').val();
        }
        return category;
    }
    function getDialogLabel() {
        var label = $('#dialog-select-label').find(":selected").text();
        if (label === "Choose Label") {
            label = $('#dialog-label-input').val();
        }
        return label;
    }
    // general use for both CREATE and UPDATE
    function getBookmarks(timestamp, timestampNotes, bookmarksCnt) {
        var bookmarks = [];
        for (var i = 0; i < bookmarksCnt; i++) {
            var bookmarkIdx = i + 1;
            var timestampDiv = timestamp + bookmarkIdx;
            var timestampNotesDiv = timestampNotes + bookmarkIdx;
            console.log('timestampdiv:' + timestampDiv + "\ntimestampNotesDiv: " + timestampNotesDiv);
            var timestampVal = $(timestampDiv).val();
            var timestampNotesVal = $(timestampNotesDiv).val();
            if (timestampVal != "00:00:00") {
                bookmarks[i] = {
                    timestamp: timestampVal,
                    timestampNotes: timestampNotesVal
                };
            }
            else {
                console.log(bookmarkIdx + ") Did not add timestamp.\nTimestampVal: " + timestampVal + ", timestampNotesVal: " + timestampNotesVal);
            }
        }
        return bookmarks;
    }
    // --------------------  UPDATE TODO - get data from main screen ------------------------------
    //gets data for current video based on the submit button id - e.g. the 1 from
    // video-1-submit-book
    function getMainPageVideoData(videoNum) {
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
