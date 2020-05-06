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
    var windowUrl = window.location.href;
    var localUrl = "http://localhost:8080";
    var herokuUrl = 'https://cryptic-basin-95763.herokuapp.com';
    var urlLocalHostIndex = windowUrl.indexOf("localhost");
    if (urlLocalHostIndex != -1) {
        var url = localUrl;
    }
    else {
        var url = herokuUrl;
    }
    console.log('url set to ' + window.location.href);
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    console.log('windowWidth: ' + windowWidth + ", windowHeight:" + windowHeight);
    var dialogWidth = windowWidth * 0.90; // 1200
    var dialogHeight = dialogWidth * .6; // 800
    var videoWidth = dialogWidth * 0.85; // 1000
    var videoHeight = videoWidth * .5; // 500
    // let ytLoader = new YouTubeLoader(TOTAL_VIDEO_CNT, videoWidth, videoHeight);
    var videoInserter = new VideoInserter_1["default"]();
    // --------------------- TODO: Initial Screen Trigger -----------------
    var TOTAL_VIDEO_CNT;
    var DIALOG_BOOKMARK_CNT = 1;
    var username = 'productionUser11';
    var labelVideos;
    var videoPlayers = [];
    var label1Videos;
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
        console.log("--------- Label Videos Array ---------");
        console.log(labelVideos);
        label1Videos = labelVideos.videoData[0].videos; // 2 videos
        TOTAL_VIDEO_CNT = label1Videos.length;
        console.log("TOTAL_VIDEO_CNT: " + TOTAL_VIDEO_CNT);
        for (var i = 1; i < TOTAL_VIDEO_CNT + 1; i++) {
            var currVideoUrl = label1Videos[i - 1].videoUrl;
            if (!currVideoUrl) {
                continue;
            }
            var oldNumBookmarks = label1Videos[i - 1].bookmarks.length;
            console.log("----- Inserting labelvideo: " + i + ", Old bookmarks length: " + oldNumBookmarks);
            videoInserter.insertVideoDiv(i, oldNumBookmarks, currVideoUrl);
        }
        checkYoutubePlayerReady();
    }
    function initYtVideos() {
        console.log("In initYtVideos()");
        for (var i = 1; i < TOTAL_VIDEO_CNT + 1; i++) {
            var divInsert = "video-" + i;
            console.log(divInsert);
            var currVideoUrl = label1Videos[i - 1].videoUrl;
            var videoId = parseYoutubeUrl(currVideoUrl);
            var lastVideo = false;
            if (i == TOTAL_VIDEO_CNT) {
                lastVideo = true;
            }
            onYouTubeIframeAPIReady(null, i, divInsert, videoId, lastVideo);
        }
        initVideoData();
    }
    function initVideoData() {
        // video-1, video-2
        for (var videoIdx = 1; videoIdx < TOTAL_VIDEO_CNT + 1; videoIdx++) {
            console.log('------initvideodata for video ' + videoIdx);
            var currVideo = label1Videos[videoIdx - 1];
            console.log(currVideo);
            var videoTitle = currVideo.videoTitle;
            var url_1 = currVideo.videoUrl;
            var notes = currVideo.notes;
            var oldBookmarks = currVideo.bookmarks;
            var oldNumBookmarks = currVideo.bookmarks.length;
            var videoId = "#video-" + videoIdx + "-";
            $(videoId + "title").text(videoTitle);
            $(videoId + "notes").val(notes);
            insertBookMarkData(videoIdx, oldBookmarks);
            addOldVideoBookmarks(videoIdx, oldNumBookmarks);
            addNewVideoBookmarks(videoIdx, oldNumBookmarks);
            addVideoSubmitBtn(videoIdx);
            addDeleteButton(videoIdx);
        }
    }
    function insertBookMarkData(videoNum, oldBookmarks) {
        var len = oldBookmarks.length;
        for (var i = 1; i < len + 1; i++) {
            var bookmarkTimeDiv = "#video-" + videoNum + "-time-" + i;
            var bookmarkNotesDiv = "#video-" + videoNum + "-bm-" + i;
            var bookmarkObj = oldBookmarks[i - 1];
            var timestamp = bookmarkObj.timestamp;
            var timestampNotes = bookmarkObj.timestampNotes;
            $(bookmarkTimeDiv).val(timestamp);
            $(bookmarkNotesDiv).val(timestampNotes);
        }
    }
    // --------------------- Button trigger functions -------------------------
    $('#dialog-submit-book').click(function () {
        if (!checkDialogInputs()) {
        }
        else {
            $("#dialog-add-video").dialog("close");
            videoCreate();
        }
    });
    $('#readTestBtn').click(function () {
        alert("Book read");
        videoRead();
    });
    /*    $('#readAllTestBtn').click(function() {
          alert("All books read");
          readAll(processLabelVideos);
      }); */
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
    /*$( ".videoDeleteButtons" ).click(function() {
       confirm("Are you sure you want to delete this book?");
       let videoNum = 300;
       let videoDeleteId = `#video-${videoNum}-submit-book`
       $(videoDeleteId).click(function() {
           alert("Deleting book.");
           videoDelete(videoNum);
        });
    }); */
    function addDeleteButton(videoNum) {
        var videoDeleteId = "#video-" + videoNum + "-delete-book";
        $(videoDeleteId).click(function () {
            alert("Book deleting...");
            videoDelete(videoNum);
            window.location.reload();
        });
    }
    // ---------------------  init Video Data  -------------------------
    function addOldVideoBookmarks(videoNum, oldNumBookmarks) {
        for (var i = 1; i < oldNumBookmarks + 1; i++) {
            addTimestampBtn(videoNum, i);
        }
        addInitialNewBookmarkDiv(videoNum, oldNumBookmarks + 1);
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
        // @ts-ignore
        $(timestampDiv).change(function () {
            var changedTimestampVal = $(timestampDiv).val();
            var changedSeconds = convertTimeToSeconds(changedTimestampVal);
            console.log("Bookmark val changed: " + changedSeconds);
            addTimeStamp(videoNum, timestampBtn, changedSeconds);
        });
    }
    function addInitialNewBookmarkDiv(videoNum, newBookmarkIdx) {
        console.log("addInitialNewBookDiv for: " + videoNum);
        var entryDiv = "#video-" + videoNum + "-new-bm";
        var divAppend = "\n            <div class=\"boxTitle\"><b>Add New Bookmarks</b></div>\n                <button id=\"video-" + videoNum + "-link-" + newBookmarkIdx + "\" class=\"timestampBtn\" >hh:mm:ss</button>  \n                <input id=\"video-" + videoNum + "-time-" + newBookmarkIdx + "\" type='time' class=\"without_ampm\" value=\"00:00:00\" step=\"1\" required>  \n               \n                <div>\n                <textarea class=\"bookmark-notes\" id=\"video-" + videoNum + "-bm-" + newBookmarkIdx + "\" cols=\"35\"></textarea>\n                </div>\n\n                <button type=\"button\" id=\"video-" + videoNum + "-add-bookmark\" class=\"add-bookmark btn btn-primary\">Add New</button>\n            <div id=\"video-" + videoNum + "-insert-before-me\"></div>\n         ";
        $(entryDiv).append(divAppend);
        addTimestampBtn(videoNum, newBookmarkIdx);
    }
    // ------------------ New bookmarks ------------------------
    function addNewVideoBookmarks(videoNum, oldNumBookmarks) {
        var add_bookmark_div = "#video-" + videoNum + "-add-bookmark";
        // for video 1 we have old bookmark 1, start on bookmark 2
        var newBookmarkIdx = oldNumBookmarks + 1;
        $(add_bookmark_div).click(function () {
            addNewBookmarkBtnAction(videoNum, newBookmarkIdx);
        });
    }
    function addNewBookmarkBtnAction(videoNum, bookmarkCnt) {
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
        $(divInsert).before("\n            <div>\n                " + timestampBtn + "\n                <input id=\"" + bmTime + "\" type='time' class=\"without_ampm\" step=\"1\" value=\"00:00:00\">   \n                <div>\n                    <textarea id=\"" + bmNote + "\" cols=\"35\" placeholder=\"Bookmark notes\"></textarea>\n                </div>  \n                <button type=\"button\" id=\"video-" + videoNum + "-add-bookmark\" class=\"add-bookmark btn btn-primary\">Add New</button>\n            </div>\n        ");
        addTimestampBtn(videoNum, bookmarkCnt);
        $(addBookmarkBtnDiv).click(function () {
            addNewBookmarkBtnAction(videoNum, bookmarkCnt);
        });
    }
    function addVideoSubmitBtn(videoNum) {
        var videoSubmitId = "#video-" + videoNum + "-submit-book";
        $(videoSubmitId).click(function () {
            alert("Book updating...");
            videoUpdate(videoNum);
            window.location.reload();
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
        $(divInsert).before("\n            <div>\n                <label for=\"dialog-Bookmarks\">hh:mm:ss </label> \n                <input id=\"" + dialogTime + "\" type='time' class=\"without_ampm\" step=\"1\" value=\"00:00:00\">   \n                <div>\n                    <textarea id=\"" + dialogNote + "\" cols=\"35\" placeholder=\"Bookmark notes\"></textarea>\n                </div>  \n                <button type=\"button\" id=\"dialog-add-bookmark\" class=\"add-bookmark btn btn-primary\">Add New</button>\n            </div>\n        ");
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
            var videoUrl, title, category, label, notes, bookmarks, newUrl, data, resp, j;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('----- In videoCreate -------');
                        videoUrl = $('#dialog-url').val();
                        title = getDialogTitle();
                        category = getDialogCategory();
                        label = getDialogLabel();
                        notes = $('#dialog-Notes').val();
                        bookmarks = getDialogBookmarks();
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
                        console.log('Video object sent: ');
                        console.log(data);
                        return [4 /*yield*/, postData(newUrl, data)];
                    case 1:
                        resp = _a.sent();
                        return [4 /*yield*/, resp.json()];
                    case 2:
                        j = _a.sent();
                        console.log("Here");
                        console.log(j);
                        if (j.result !== 'Video Found. Not adding.') {
                            console.log("Video created. Data: " + JSON.stringify(j));
                            window.location.reload();
                            alert("Your book was successfully added.");
                        }
                        else {
                            window.location.reload();
                            alert("Sorry your book was not added because a book with that video already exists in your library.");
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
                        newURL = url + "/video" + ("/" + username) + "/read?category=" + category + "&label=" + label;
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
    function readAll(processLabelVideos) {
        var _this = this;
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var newURL, resp, j;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("readAll called");
                        newURL = url + "/video" + ("/" + username) + "/readAll";
                        console.log("readAll: fetching all videos");
                        return [4 /*yield*/, fetch(newURL)];
                    case 1:
                        resp = _a.sent();
                        return [4 /*yield*/, resp.json()];
                    case 2:
                        j = _a.sent();
                        if (j['result'] !== 'error') {
                            console.log("Label videos read. Data: " + JSON.stringify(j));
                            labelVideos = j;
                            processLabelVideos();
                        }
                        else {
                            console.log("Error; video not read.");
                        }
                        return [2 /*return*/];
                }
            });
        }); })();
    }
    function videoUpdate(videoNum) {
        var _this = this;
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var htmlVideoUrl, category, label, videoTitle, videoURL, newURL, notes, stopAt, i, bookmarks, data, resp, j;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        htmlVideoUrl = $(".video-" + videoNum + "-vid").attr('id');
                        console.log("----------- Video Id: " + htmlVideoUrl + " for video number: " + videoNum);
                        category = $(".Category").attr('id').substring(9).replace(/-/g, " ");
                        label = $(".label-btn").attr('id').substring(6).replace(/-/g, " ");
                        videoTitle = $("#video-" + videoNum + "-title").text();
                        videoURL = htmlVideoUrl;
                        console.log("VIDEO TITLE: " + videoTitle);
                        console.log("VIDEO URL: " + videoURL);
                        newURL = url + "/video" + ("/" + username) + "/update?category=" + category + "&label=" + label + '&videoId=' + videoURL;
                        notes = $("#video-" + videoNum + "-notes").val();
                        stopAt = 0;
                        i = 1;
                        while (true) {
                            if ($("#video-" + videoNum + "-bm-" + i).length > 0) {
                                i++;
                            }
                            else {
                                stopAt = i - 1;
                                break;
                            }
                        }
                        bookmarks = getBookmarks("#video-" + videoNum + "-time-", "#video-" + videoNum + "-bm-", stopAt);
                        data = {
                            videoObj: {
                                category: category,
                                label: label,
                                title: videoTitle,
                                videoUrl: videoURL,
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
                        }
                        else {
                            console.log("Error. video not updated");
                        }
                        return [2 /*return*/];
                }
            });
        }); })();
    }
    // video-1-delete-video
    function videoDelete(videoNum) {
        var _this = this;
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var videoURL, newURL, data, resp, j;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        videoURL = $(".video-" + videoNum + "-vid").attr('id');
                        console.log("----------- Video Id: " + videoURL + " for video number: " + videoNum);
                        newURL = url + "/video" + ("/" + username) + "/delete?videoId=" + videoURL;
                        data = {
                            videoObj: {
                                videoUrl: videoURL
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
                        }
                        else {
                            console.log("Error. video not updated");
                        }
                        return [2 /*return*/];
                }
            });
        }); })();
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
        var title = $('#dialog-title').val();
        console.log('-- getDialogTitle: ' + title);
        if (!title) {
            alert("Please enter a Title");
            return false;
        }
        return title;
    }
    function getDialogBookmarks() {
        var timestampDiv = "#dialog-time-";
        var timestampNotes = "#dialog-bm-";
        return getBookmarks(timestampDiv, timestampNotes, DIALOG_BOOKMARK_CNT);
    }
    function getDialogCategory() {
        // no spaces in html or urls so replace spaces with dashes
        var category = $('#dialog-select-category').find(":selected").text();
        if (category === "Choose Category") {
            alert("Please select a Category. Sorry we are unable to process new categories currently.");
            return false;
            // category = $('#dialog-category-input').val();
        }
        else {
            return category;
        }
    }
    function getDialogLabel() {
        var label = $('#dialog-select-label').find(":selected").text();
        if (label === "Choose Label") {
            // label = $('#dialog-label-input').val();
            alert("Please select a Label. Sorry we are unable to process new labels currently.");
            return false;
        }
        else {
            return label;
        }
    }
    // general use for both CREATE and UPDATE
    function getBookmarks(timestampHtml, timestampNotesHtml, bookmarksCnt) {
        var bookmarks = [];
        for (var i = 0; i < bookmarksCnt; i++) {
            var bookmarkIdx = i + 1;
            var timestampDiv = timestampHtml + bookmarkIdx;
            var timestampNotesDiv = timestampNotesHtml + bookmarkIdx;
            console.log('timestampdiv:' + timestampDiv + "\ntimestampNotesDiv: " + timestampNotesDiv);
            var timestampVal = $(timestampDiv).val();
            var timestampNotesVal = $(timestampNotesDiv).val();
            var emptyBookmark = timestampVal == "00:00:00" && timestampNotesVal == "";
            if (!emptyBookmark) {
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
            var videoId = parseYoutubeUrl(url);
            console.log(videoId);
            onYouTubeIframeAPIReady(addPlayer, 0, "player1", videoId, false);
            $('.dialog-other').show();
        }
    }
    function parseYoutubeUrl(url) {
        if (!url) {
            return null;
        }
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
            setTimeout(checkYoutubePlayerReady, 200);
        }
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
