"use strict";
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
var http = require('http');
var url = require('url');
var express = require('express');
var faker = require('faker');
var MyServer = /** @class */ (function () {
    function MyServer(db) {
        var _this = this;
        // Server stuff: use express instead of http.createServer
        this.server = express();
        this.router = express.Router();
        this.theDatabase = db;
        // from https://enable-cors.org/server_expressjs.html
        this.router.use(function (request, response, next) {
            response.header('Content-Type', 'application/json');
            response.header('Access-Control-Allow-Origin', '*');
            response.header('Access-Control-Allow-Headers', '*');
            next();
        });
        // Serve static pages from a particular path.
        this.server.use('/', express.static('../static'));
        this.server.use(express.json());
        this.server.use('/', this.router);
        this.router.all('/user/signup');
        this.router.all('user/signin');
        this.router.post('/video/:username/create', this.createVideoHandler.bind(this));
        this.router.all('/video/:username/read', this.readVideoHandler.bind(this));
        this.router.all('/video/:username/readAll', this.readAllVideoHandler.bind(this));
        this.router.all('/video/:username/update', this.updateVideoHandler.bind(this));
        this.router.all('/video/:username/delete', this.deleteVideoHandler.bind(this));
        // Set a fall-through handler if nothing matches.
        this.router.get('*', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                response.send(JSON.stringify({ "result": "error" }));
                return [2 /*return*/];
            });
        }); });
    }
    MyServer.prototype.listen = function (port) {
        this.server.listen(port);
    };
    // ------------------------- CRUD handlers ------------------------------------
    MyServer.prototype.createVideoHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var username, videoObj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        username = request.params['username'];
                        console.log('username: ' + username);
                        videoObj = request.body.videoObj;
                        console.log(videoObj);
                        return [4 /*yield*/, this.createVideo(username, videoObj, response)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.readVideoHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var username, category, label;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        username = request.params['username'];
                        category = request.query.category;
                        label = request.query.label;
                        console.log('------ username, category, label: ' + username + ", " + category + " , " + label);
                        return [4 /*yield*/, this.readVideo(username, category, label, response)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.readAllVideoHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var username;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        username = request.params['username'];
                        return [4 /*yield*/, this.readAllVideos(username, response)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.updateVideoHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var username, videoId, videoObj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("in updateVideoHandler");
                        username = request.params['username'];
                        videoId = request.params['videoId'];
                        videoObj = request.body.videoObj;
                        return [4 /*yield*/, this.updateVideo(username, videoId, videoObj, response)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.deleteVideoHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var username, videoId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("in deleteVideoHandler");
                        username = request.params['username'];
                        videoId = request.body.videoObj.videoUrl;
                        console.log("delvideoHandler username: " + username);
                        console.log("delvideoHandler videoId: " + videoId);
                        return [4 /*yield*/, this.deleteVideo(username, videoId, response)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // ---------------------------- CRUD functions -------------------------------------
    MyServer.prototype.createVideo = function (username, videoObj, response) {
        return __awaiter(this, void 0, void 0, function () {
            var found;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("creating video...");
                        return [4 /*yield*/, this.theDatabase.isFound(username, videoObj)];
                    case 1:
                        found = _a.sent();
                        if (found) {
                            console.log("-----> Video Found. Not adding.");
                            response.write(JSON.stringify({ 'result': 'Video Found. Not adding.' }));
                            response.end();
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.theDatabase.put(username, videoObj)];
                    case 2:
                        _a.sent();
                        response.write(JSON.stringify({ 'result': 'created',
                            'username': username,
                            'videoObj': videoObj
                        }));
                        response.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.readVideo = function (username, category, label, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("reading video...");
                        return [4 /*yield*/, this.theDatabase.get(username)];
                    case 1:
                        _a.sent(); //can't be right, what does get() use as the key?
                        response.write(JSON.stringify({ 'result': 'read',
                            'username': username,
                            'category': category,
                            'label': label,
                            'title': faker.random.word() + " video",
                            'notes': faker.random.words() + " video",
                            'bookmarks': faker.date.recent() + " - " + faker.random.words() + ", " + faker.date.recent() + " - " + faker.random.words()
                        }));
                        response.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.readAllVideos = function (username, response) {
        return __awaiter(this, void 0, void 0, function () {
            var userObj, labelVideos;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("\n\nreading all videos...");
                        return [4 /*yield*/, this.theDatabase.getAll(username)];
                    case 1:
                        userObj = _a.sent();
                        labelVideos = this.parseLabelVideos(userObj);
                        response.write(JSON.stringify({ 'result': 'read all videos',
                            'username': username,
                            'videoData': labelVideos
                        }));
                        response.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.parseLabelVideos = function (videoObj) {
        console.log("parsing user obj");
        var labelVideos = videoObj.categories[0].labels;
        return labelVideos;
    };
    MyServer.prototype.updateVideo = function (username, videoId, videoObj, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("updating video...");
                        return [4 /*yield*/, this.theDatabase.putUpdate(username, videoObj)];
                    case 1:
                        _a.sent();
                        console.log("INSERTED UPDATED VID INTO DB");
                        response.write(JSON.stringify({
                            'result': 'updated',
                            'username': username,
                            'video ID': videoId,
                            'updatedVideoData': videoObj
                        }));
                        response.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.deleteVideo = function (username, videoId, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("deleting video. Username: " + username);
                        return [4 /*yield*/, this.theDatabase.del(username, videoId)];
                    case 1:
                        _a.sent();
                        console.log('DELETED VID');
                        response.write(JSON.stringify({ 'result': 'deleted',
                            'username': username,
                            'videoId': videoId
                        }));
                        response.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    return MyServer;
}());
exports.MyServer = MyServer;
