"use strict";
exports.__esModule = true;
var VideoInserter = /** @class */ (function () {
    function VideoInserter(videoNum) {
        this.videoNum = videoNum;
        console.log("in video inserter: " + videoNum);
    }
    VideoInserter.prototype.sayHello = function () {
        console.log("---hello!");
    };
    return VideoInserter;
}());
exports["default"] = VideoInserter;
