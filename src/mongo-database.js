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
var Database = /** @class */ (function () {
    function Database(collectionName) {
        var _this = this;
        //followed from tutorial here https://www.mongodb.com/blog/post/quick-start-nodejs-mongodb--how-to-get-connected-to-your-database
        this.MongoClient = require('mongodb').MongoClient;
        this.dbName = "db";
        var secrets, password;
        if (!process.env.PASSWORD) {
            secrets = require('./secrets.json');
            password = secrets.password;
        }
        else {
            password = process.env.PASSWORD;
        }
        this.uri = "mongodb+srv://guest:" + password + "@cs326cluster-0pubh.mongodb.net/test?retryWrites=true&w=majority";
        this.collectionName = collectionName;
        this.client = new this.MongoClient(this.uri, { useNewUrlParser: true });
        (function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.connect()["catch"](function (err) { console.log(err); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); })();
    }
    Database.prototype.put = function (username, videoObj) {
        return __awaiter(this, void 0, void 0, function () {
            var db, collection, category, label, insertVideoObj, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.client.db(this.dbName);
                        collection = db.collection(this.collectionName);
                        category = videoObj.category;
                        label = videoObj.label;
                        insertVideoObj = {
                            videoUrl: videoObj.videoUrl,
                            videoTitle: videoObj.title,
                            videoOrder: 3,
                            notes: videoObj.notes,
                            bookmarks: videoObj.bookmarks
                        };
                        console.log("\nput: username = " + username + ", label: " + label);
                        return [4 /*yield*/, collection.updateOne({ 'username': username,
                                'categories.0.categoryName': category,
                                'categories.0.labels': { $elemMatch: { "labelName": label } } }, { $push: { 'categories.0.labels.$.videos': insertVideoObj } }, { 'upsert': true })];
                    case 1:
                        result = _a.sent();
                        console.log("\nresult = " + result);
                        return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.putUpdate = function (username, videoObj) {
        return __awaiter(this, void 0, void 0, function () {
            var db, collection, category, label, insertVideoObj, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.client.db(this.dbName);
                        collection = db.collection(this.collectionName);
                        category = videoObj.category;
                        label = videoObj.label;
                        insertVideoObj = {
                            videoUrl: videoObj.videoUrl,
                            videoTitle: videoObj.title,
                            videoOrder: 3,
                            notes: videoObj.notes,
                            bookmarks: videoObj.bookmarks
                        };
                        console.log("\nputUpdate: username = " + username + ", label: " + label + ", video URL: " + videoObj.videoUrl);
                        return [4 /*yield*/, collection.updateOne({ 'username': 'eric',
                                'categories.0.categoryName': category,
                                'categories.0.labels': { $elemMatch: { "labelName": label } } }, { $set: { 'categories.0.labels.$.videos.0': insertVideoObj } }, { 'upsert': true })];
                    case 1:
                        result = _a.sent();
                        console.log("\nresult = " + result);
                        return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.getAll = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var db, collection, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.client.db(this.dbName);
                        collection = db.collection(this.collectionName);
                        console.log("getAll: key = " + username);
                        return [4 /*yield*/, collection.findOne({ 'username': username })];
                    case 1:
                        result = _a.sent();
                        console.log("\ngetAll: returned " + JSON.stringify(result));
                        if (result) {
                            return [2 /*return*/, result];
                        }
                        else {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.get = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var db, collection, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.client.db(this.dbName);
                        collection = db.collection(this.collectionName);
                        console.log("get: key = " + key);
                        return [4 /*yield*/, collection.findOne({ 'name': key })];
                    case 1:
                        result = _a.sent();
                        console.log("get: returned " + JSON.stringify(result));
                        if (result) {
                            return [2 /*return*/, result.value];
                        }
                        else {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.del = function (username, videoObj) {
        return __awaiter(this, void 0, void 0, function () {
            var db, collection, category, label, url, title, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.client.db(this.dbName);
                        collection = db.collection(this.collectionName);
                        category = videoObj.category;
                        label = videoObj.label;
                        url = videoObj.url;
                        title = videoObj.title;
                        console.log("\ndelete: username = " + username + ", title: " + title);
                        return [4 /*yield*/, collection.deleteOne({ 'username': username, 'categories.0.categoryName': category,
                                'categories.0.labels': { $elemMatch: { "labelName": label } } }, { 'categories.0.labels.$.videos': { $elemMatch: { "videoUrl": url } }
                            })];
                    case 1:
                        result = _a.sent();
                        console.log("\nresult = " + result);
                        return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.isFound = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var v;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("isFound: key = " + key);
                        return [4 /*yield*/, this.get(key)];
                    case 1:
                        v = _a.sent();
                        console.log("is found result = " + v);
                        if (v === null) {
                            return [2 /*return*/, false];
                        }
                        else {
                            return [2 /*return*/, true];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return Database;
}());
exports.Database = Database;
