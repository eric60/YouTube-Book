"use strict";
exports.__esModule = true;
var VideoInserter = /** @class */ (function () {
    function VideoInserter(videoNum) {
        this.categories = [];
        this.videoNum = videoNum;
    }
    VideoInserter.prototype.insertCategoryDiv = function (categories) {
        var _this = this;
        var divInsert = '#category-insert-before-me';
        categories.forEach(function (category) {
            $(divInsert).before("\n            <button class=\"category-btn\" id=\"Category-" + category + "\" >" + category + "</button>\n            <div class=\"" + category + "\" id=\"Category-" + category + "\">     \n              <div id = 'label-insert-before-me'></div>\n            </div>\n        ");
            _this.insertLabelDiv(category);
        });
    };
    VideoInserter.prototype.insertLabelDiv = function (category) {
        var _this = this;
        var divInsert = '#label-insert-before-me';
        category.forEach(function (label) {
            $(divInsert).before("  \n              <button class=\"label-btn\" id=\"Label-" + label + "\">" + label + "</button>  \n                <div class=\"Label-Body\" id=\"Label-Body-" + label + "\">\n                    <div id = 'video-insert-before-me'></div>\n                </div>\n        ");
            label.forEach(function (video) {
                _this.insertVideoDiv(video.videoNum);
            });
        });
    };
    VideoInserter.prototype.insertVideoDiv = function (videoNum) {
        //console.log("Inserting labelNum: " + labelNum + ", videoNum: " + videoNum);
        var divInsert = '#video-insert-before-me';
        $(divInsert).before("\n            <h1>Hello! " + videoNum + " </h1>\n            <div class=\"panel-body\">\n                <div class = \"video-section\" id=\"video-" + videoNum + "\"></div>\n                <div class=\"video-text\">\n        \n                    <div class=\"dialog-notes\">\n                    <label for=\"dialog-Notes\" class=\"boxTitle\">Notes</label> \n                    <div>\n                        <textarea id=\"video-" + videoNum + "-notes\" cols=\"35\"></textarea>\n                    </div>           \n                    </div>\n\n                    <div class=\"boxTitle\"><b>Bookmarks</b></div>\n\n                    <div class=\"all-bookmarks\">\n                    <div class=\"video-bookmarks\">\n                        \n                        <button id=\"video-" + videoNum + "-link-1\" class=\"timestampBtn\" >hh:mm:ss</button>  \n\n                        <input id=\"video-" + videoNum + "-time-1\" type='time' class=\"without_ampm\" step=\"1\" required value=\"00:01:10\"> \n                        <div>\n                        <textarea class=\"bookmark-notes\" id=\"video-" + videoNum + "-bm-1\" cols=\"35\"></textarea>\n                        </div>\n                    </div>\n\n\n                    <div class=\"dialog-bookmarks\">\n                        <div class=\"boxTitle\"><b>Add New Bookmarks</b></div>\n                        <button id=\"video-" + videoNum + "-link-2\" class=\"timestampBtn\" >hh:mm:ss</button>  \n                        <input id=\"video-" + videoNum + "-time-2\" type='time' class=\"without_ampm\" value=\"00:00:00\" step=\"1\" required>  \n                        <div>\n                        <textarea class=\"bookmark-notes\" id=\"video-" + videoNum + "-bm-2\" cols=\"35\"></textarea>\n                        </div>\n                        <button type=\"button\" id=\"video-" + videoNum + "-add-bookmark\" class=\"add-bookmark btn btn-primary\">Add New</button>\n                        <div id=\"video-" + videoNum + "-insert-before-me\"></div>\n                    </div> \n\n                    \n                    <div class=\"dialog-footer\">\n                        <button type=\"button\" id=\"video-" + videoNum + "-submit-book\" class=\"submitBtn btn btn-success\">Submit</button>\n                    </div>\n                    </div>\n\n                    <button onClick=\"deleteVideo()\" id =\"delete-video\">Delete</button>\n                </div>\n            </div>\n        ");
    };
    return VideoInserter;
}());
exports["default"] = VideoInserter;
