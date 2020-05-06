"use strict";
exports.__esModule = true;
var VideoInserter = /** @class */ (function () {
    function VideoInserter() {
    }
    /*  public insertCategoryDiv(categories) {
         let divInsert = '#category-insert-before-me';
 
         categories.forEach(category => {
             $(divInsert).before(`
             <button class="category-btn" id="Category-${category}" >${category}</button>
             <div class="${category}" id="Category-${category}">
               <div id = 'label-insert-before-me'></div>
             </div>
         `);
             this.insertLabelDiv(category);
         });
     } */
    /* public insertLabelDiv(category) {
        let divInsert = '#label-insert-before-me';

        category.forEach(label => {
            $(divInsert).before(`
              <button class="label-btn" id="Label-${label}">${label}</button>
                <div class="Label-Body" id="Label-Body-${label}">
                    <div id = 'video-insert-before-me'></div>
                </div>
        `);
            label.forEach(video => {
                this.insertVideoDiv(video.videoNum);
            });
        });
    } */
    VideoInserter.prototype.getBookmarksDiv = function (oldNumBookmarks, videoNum) {
        var div = "";
        for (var i = 1; i < oldNumBookmarks + 1; i++) {
            div += "\n                <button id=\"video-" + videoNum + "-link-" + i + "\" class=\"timestampBtn\" >hh:mm:ss</button>  \n\n                <input id=\"video-" + videoNum + "-time-" + i + "\" type='time' class=\"without_ampm\" step=\"1\" required value=\"00:00:00\"> \n                <div id=\"video-" + videoNum + "-bookmark-container\">\n                <textarea class=\"bookmark-notes\" id=\"video-" + videoNum + "-bm-" + i + "\" cols=\"35\"></textarea>\n                </div>\n            ";
        }
        return div;
    };
    VideoInserter.prototype.insertVideoDiv = function (videoNum, oldNumBookmarks, videoUrl) {
        console.log("In Video Inserter insertVideoDiv for: " + videoNum);
        var divInsert = '.Label-Body';
        var bookmarksDiv = this.getBookmarksDiv(oldNumBookmarks, videoNum);
        $(divInsert).append("\n            <div class=\"Label-Video\">\n                <h3 id=\"video-" + videoNum + "-title\">Placeholder Title for " + videoNum + "</h3>   \n\n                <div class=\"panel-body\">\n                    <div class = \"video-section\" id=\"video-" + videoNum + "\"></div>\n                    <p class=\"video-" + videoNum + "-vid\" id=" + videoUrl + " style=\"color:white;\"></p>\n\n                    <div class=\"video-text\">            \n                        <div class=\"dialog-notes\">\n                            <label for=\"dialog-Notes\" class=\"boxTitle\">Notes</label> \n                            <div>\n                                <textarea id=\"video-" + videoNum + "-notes\" cols=\"35\"></textarea>\n                            </div>           \n                        </div>\n\n                        <div class=\"boxTitle\"><b>Old Bookmarks</b></div>\n\n                        <div class=\"all-bookmarks\">\n                            <div class=\"video-bookmarks\">                        \n                                " + bookmarksDiv + "\n                            </div>\n\n                            <div class=\"dialog-bookmarks\" id=\"video-" + videoNum + "-new-bm\">                    \n                            </div>\n                        \n                            <div class=\"dialog-footer\">\n                                <button type=\"button\" id=\"video-" + videoNum + "-submit-book\" class=\"submitBtn btn btn-success\">Submit</button>\n                            </div>\n                        </div>\n\n                        <button id =\"video-" + videoNum + "-delete-book\" class=\"btn btn-danger videoDeleteButtons\">Delete Book</button>\n                    </div>                                   \n                </div>\n            </div>\n        ");
    };
    return VideoInserter;
}());
exports["default"] = VideoInserter;
