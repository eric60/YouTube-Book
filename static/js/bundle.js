!function(e){var o={};function t(n){if(o[n])return o[n].exports;var i=o[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,t),i.l=!0,i.exports}t.m=e,t.c=o,t.d=function(e,o,n){t.o(e,o)||Object.defineProperty(e,o,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,o){if(1&o&&(e=t(e)),8&o)return e;if(4&o&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&o&&"string"!=typeof e)for(var i in e)t.d(n,i,function(o){return e[o]}.bind(null,i));return n},t.n=function(e){var o=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(o,"a",o),o},t.o=function(e,o){return Object.prototype.hasOwnProperty.call(e,o)},t.p="",t(t.s=0)}([function(e,o,t){"use strict";var n=this&&this.__awaiter||function(e,o,t,n){return new(t||(t=Promise))((function(i,r){function a(e){try{d(n.next(e))}catch(e){r(e)}}function l(e){try{d(n.throw(e))}catch(e){r(e)}}function d(e){var o;e.done?i(e.value):(o=e.value,o instanceof t?o:new t((function(e){e(o)}))).then(a,l)}d((n=n.apply(e,o||[])).next())}))},i=this&&this.__generator||function(e,o){var t,n,i,r,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return r={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(r[Symbol.iterator]=function(){return this}),r;function l(r){return function(l){return function(r){if(t)throw new TypeError("Generator is already executing.");for(;a;)try{if(t=1,n&&(i=2&r[0]?n.return:r[0]?n.throw||((i=n.return)&&i.call(n),0):n.next)&&!(i=i.call(n,r[1])).done)return i;switch(n=0,i&&(r=[2&r[0],i.value]),r[0]){case 0:case 1:i=r;break;case 4:return a.label++,{value:r[1],done:!1};case 5:a.label++,n=r[1],r=[0];continue;case 7:r=a.ops.pop(),a.trys.pop();continue;default:if(!(i=a.trys,(i=i.length>0&&i[i.length-1])||6!==r[0]&&2!==r[0])){a=0;continue}if(3===r[0]&&(!i||r[1]>i[0]&&r[1]<i[3])){a.label=r[1];break}if(6===r[0]&&a.label<i[1]){a.label=i[1],i=r;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(r);break}i[2]&&a.ops.pop(),a.trys.pop();continue}r=o.call(e,a)}catch(e){r=[6,e],n=0}finally{t=i=0}if(5&r[0])throw r[1];return{value:r[0]?r[1]:void 0,done:!0}}([r,l])}}};o.__esModule=!0;var r=t(1);$(document).ready((function(){if(-1!=window.location.href.indexOf("localhost"))var e="http://localhost:8080";else e="https://cryptic-basin-95763.herokuapp.com";console.log("url set to "+window.location.href);var o=$(window).width(),t=$(window).height();console.log("windowWidth: "+o+", windowHeight:"+t);var a,l,d,s=.9*o,c=.6*s,u=.85*s,v=.5*u,f=new r.default(1),g=1,b="productionUser2",m=[];function h(e,o){for(var t=o.length,n=1;n<t+1;n++){var i="#video-"+e+"-time-"+n,r="#video-"+e+"-bm-"+n,a=o[n-1],l=a.timestamp,d=a.timestampNotes;$(i).val(l),$(r).val(d)}}function p(o){$("#video-"+o+"-delete-book").click((function(){alert("Book deleting..."),function(o){var t=this;n(t,void 0,void 0,(function(){var t,n,r;return i(this,(function(i){switch(i.label){case 0:return console.log("---- in videoDelete ----"),t=$("#video-"+o+"-vid").text(),console.log("----------- Video Id: "+t+" for : "+o),n=e+"/video/"+b+"/delete?&videoId="+t,console.log("videoDelete: fetching "+t),[4,O(n,{})];case 1:return[4,i.sent().json()];case 2:return"error"!==(r=i.sent()).result?(console.log("Video deleted. Data: "+JSON.stringify(r)),document.getElementById("outputText").innerHTML="Success; video deleted. Data: "+JSON.stringify(r)):document.getElementById("outputText").innerHTML="Error; video not deleted.",[2]}}))}))}(o),window.location.reload()}))}function k(e,o){for(var t=1;t<o+1;t++)y(e,t);!function(e,o){console.log("addInitialNewBookDiv for: "+e);var t='\n            <div class="boxTitle"><b>Add New Bookmarks</b></div>\n                <button id="video-'+e+"-link-"+o+'" class="timestampBtn" >hh:mm:ss</button>  \n                <input id="video-'+e+"-time-"+o+'" type=\'time\' class="without_ampm" value="00:00:00" step="1" required>  \n               \n                <div>\n                <textarea class="bookmark-notes" id="video-'+e+"-bm-"+o+'" cols="35"></textarea>\n                </div>\n\n                <button type="button" id="video-'+e+'-add-bookmark" class="add-bookmark btn btn-primary">Add New</button>\n            <div id="video-'+e+'-insert-before-me"></div>\n         ';$("#video-"+e+"-new-bm").append(t)}(e,o+1)}function y(e,o){var t="#video-"+e+"-time-"+o,n=$(t).val(),i="#video-"+e+"-link-"+o;console.log("----"+t+": "+n);var r=B(n);console.log("--result seconds: "+r),P(e,i,r),$(t).change((function(){var o=B($(t).val());console.log("Bookmark val changed: "+o),P(e,i,o)}))}function w(e,o){var t=o+1;$("#video-"+e+"-add-bookmark").click((function(){x(e,t)}))}function x(e,o){y(e,o),o++;var t="#video-"+e+"-insert-before-me";console.log("add video bookmarkCnt: "+o),function(e,o,t){var n="video-"+t+"-time-"+o,i="video-"+t+"-bm-"+o,r='<button id="video-'+t+"-link-"+o+'" \n                        class="timestampBtn">hh:mm:ss</button>',a="#video-"+t+"-add-bookmark";$(a).remove(),$(e).before("\n            <div>\n                "+r+'\n                <input id="'+n+'" type=\'time\' class="without_ampm" step="1" value="00:00:00">   \n                <div>\n                    <textarea id="'+i+'" cols="35" placeholder="Bookmark notes"></textarea>\n                </div>  \n                <button type="button" id="video-'+t+'-add-bookmark" class="add-bookmark btn btn-primary">Add New</button>\n            </div>\n        '),$(a).click((function(){x(t,o)}))}(t,o,e)}function T(o){$("#video-"+o+"-submit-book").click((function(){alert("Book updating..."),function(o){var t=this;n(t,void 0,void 0,(function(){var t,n,r,a,l,d,s,c,u;return i(this,(function(i){switch(i.label){case 0:return t=$("#video-"+o+"-vid").text(),console.log("----------- Video Id: "+t+" for video number: "+o),n=$(".Category").attr("id").substring(9).replace(/-/g," "),r=$(".label-btn").attr("id").substring(6).replace(/-/g," "),a=$("#video-"+o+"-title").text(),l=t,console.log("VIDEO TITLE: "+a),console.log("VIDEO URL: "+l),d=e+"/video/"+b+"/update?category="+n+"&label="+r+"&videoId="+l,s=$("#video-"+o+"-notes").val(),c={videoObj:{category:n,label:r,title:a,videoUrl:l,bookmarks:[],notes:s}},console.log(c),[4,O(d,c)];case 1:return[4,i.sent().json()];case 2:return"error"!==(u=i.sent()).result?console.log("Video updated. Data: "+JSON.stringify(u)):console.log("Error. video not updated"),[2]}}))}))}(o),window.location.reload()}))}function B(e){var o=parseInt(e.substring(0,2));12==o&&(o=0);var t=parseInt(e.substring(3,5)),n=parseInt(e.substring(6,8));return n||(n=0),console.log(o+","+t+","+n),n+=60*t+3600*o,console.log("seconds: "+n),n}function N(){$("#dialog-add-bookmark").click((function(){var e,o,t,n;g++,console.log("add dialog bookmarkCnt: "+g),e="#dialog-insert-before-me",t="dialog-time-"+(o=g),n="dialog-bm-"+o,$("#dialog-add-bookmark").remove(),$(e).before('\n            <div>\n                <label for="dialog-Bookmarks">hh:mm:ss </label> \n                <input id="'+t+'" type=\'time\' class="without_ampm" step="1" value="00:00:00">   \n                <div>\n                    <textarea id="'+n+'" cols="35" placeholder="Bookmark notes"></textarea>\n                </div>  \n                <button type="button" id="dialog-add-bookmark" class="add-bookmark btn btn-primary">Add New</button>\n            </div>\n        '),N()}))}function O(e,o){return n(this,void 0,void 0,(function(){return i(this,(function(t){switch(t.label){case 0:return[4,fetch(e,{method:"POST",mode:"cors",cache:"no-cache",credentials:"same-origin",headers:{"Content-Type":"application/json"},redirect:"follow",body:JSON.stringify(o)})];case 1:return[2,t.sent()]}}))}))}function D(){var e=$("#dialog-title").val();return console.log("-- getDialogTitle: "+e),e||(alert("Please enter a Title"),!1)}function I(){var e=$("#dialog-select-category").find(":selected").text();return"Choose Category"===e?(alert("Please select a Category. Sorry we are unable to process new categories currently."),!1):e}function S(){var e=$("#dialog-select-label").find(":selected").text();return"Choose Label"===e?(alert("Please select a Label. Sorry we are unable to process new labels currently."),!1):e}function V(e){if(function(e){if(!e.match(/v=([^&]+)/))return!1;return!0}(e)){var o=_(e);console.log(o),L(void 0,0,"player1",o,!1),$(".dialog-other").show()}else alert("Please enter a valid YouTube Video URL")}function _(e){if(!e)return null;var o=e.match(/v=([^&]+)/);return console.log(o),o[1]}function L(e,o,t,n,i){console.log("trigger youtube player"),null==e?(m[o]=new YT.Player(t,{width:u,height:v,videoId:n,events:{onReady:j(event,i)}}),console.log(m[o])):e=new YT.Player(t,{width:u,height:v,videoId:n,events:{onReady:j(event,i)}})}function j(e,o){o&&(console.log("trigger lastVideo onPlayerReady. Now can call accordion"),console.log("trigger initAccordion"),console.log("---- Video players ---"),console.log(m),$(".Label-Body").accordion({header:"> div > h3",active:!1,collapsible:!0,heightStyle:"content"}).sortable({axis:"y",handle:"h3",stop:function(e,o){o.item.children("h3").triggerHandler("focusout"),$(this).accordion("refresh")},update:function(){var e;e=$(".Label-Body").sortable("toArray"),console.log("new sortedIds: "+e)}}))}function P(e,o,t){$(o).click((function(){m[e].seekTo(t,!0)}))}!function(o){var t=this;n(t,void 0,void 0,(function(){var t,n;return i(this,(function(i){switch(i.label){case 0:return console.log("readAll called"),t=e+"/video/"+b+"/readAll",console.log("readAll: fetching all videos"),[4,fetch(t)];case 1:return[4,i.sent().json()];case 2:return"error"!==(n=i.sent()).result?(console.log("Label videos read. Data: "+JSON.stringify(n)),l=n,o()):console.log("Error; video not read."),[2]}}))}))}((function(){console.log("--------- Label Videos Array ---------"),console.log(l),d=l.videoData[0].videos,a=d.length,console.log("TOTAL_VIDEO_CNT: "+a);for(var e=1;e<a+1;e++){var o=d[e-1].videoUrl;if(o){var t=d[e-1].bookmarks.length;console.log("----- Inserting labelvideo: "+e+", Old bookmarks length: "+t),f.insertVideoDiv(e,t,o)}}})),function e(){"undefined"!=typeof YT&&YT&&YT.Player?function(){console.log("In initYtVideos()");for(var e=1;e<a+1;e++){var o="video-"+e;console.log(o);var t=_(d[e-1].videoUrl),n=!1;e==a&&(n=!0),L(null,e,o,t,n)}!function(){for(var e=1;e<a+1;e++){console.log("------initvideodata for video "+e);var o=d[e-1];console.log(o);var t=o.videoTitle,n=(o.videoUrl,o.notes),i=o.bookmarks,r=o.bookmarks.length,l="#video-"+e+"-";$(l+"title").text(t),$(l+"notes").val(n),h(e,i),k(e,r),w(e,r),T(e),p(e)}}()}():setTimeout(e,100)}(),$("#dialog-submit-book").click((function(){(function(){if(!I()||!S()||!D())return!1;return!0})()&&(alert("Book submitted"),$("#dialog-add-video").dialog("close"),function(){var o=this;n(o,void 0,void 0,(function(){var o,t,n,r,a,l,d,s,c;return i(this,(function(i){switch(i.label){case 0:return console.log("----- In videoCreate -------"),o=$("#dialog-url").val(),t=D(),n=I(),r=S(),a=$("#dialog-Notes").val(),l=function(e,o,t){for(var n=[],i=0;i<t;i++){var r=i+1,a=e+r,l=o+r;console.log("timestampdiv:"+a+"\ntimestampNotesDiv: "+l);var d=$(a).val(),s=$(l).val();"00:00:00"!=d?n[i]={timestamp:d,timestampNotes:s}:console.log(r+") Did not add timestamp.\nTimestampVal: "+d+", timestampNotesVal: "+s)}return n}("#dialog-time-","#dialog-bm-",g),console.log("url: "+o+"\n title: "+t+"\n category: "+n+"\n label: "+r+"\n notes: "+a+"\n bookmarks:"),d=e+"/video/"+b+"/create",console.log(d),s={videoObj:{category:n,label:r,title:t,videoUrl:o,bookmarks:l,notes:a}},console.log("in videoCreate video obj: "),console.log(s),[4,O(d,s)];case 1:return[4,i.sent().json()];case 2:return"error"!==(c=i.sent()).result?console.log("Video created. Data: "+JSON.stringify(c)):console.log("Error; video not created."),[2]}}))}))}(),window.location.reload())})),$("#readTestBtn").click((function(){alert("Book read"),function(){var o=this;n(o,void 0,void 0,(function(){var o,t;return i(this,(function(n){switch(n.label){case 0:return console.log("videoRead called"),o=e+"/video/"+b+"/read?category=someCategory&label=someLabel",console.log("videoRead: fetching "+o),[4,fetch(o)];case 1:return[4,n.sent().json()];case 2:return"error"!==(t=n.sent()).result?(console.log("Video read. Data: "+JSON.stringify(t)),document.getElementById("outputText").innerHTML="Success; video read. Data: "+JSON.stringify(t)):document.getElementById("outputText").innerHTML="Error; video not read.",[2]}}))}))}()})),$(".dialog-other").hide(),$("#dialog-url").bind("paste",(function(){var e;e=V,navigator.clipboard.readText().then(e)})),$("#delete-video").button({icons:{primary:"ui-icon-trash"},text:!1}),N(),$("#dialog-add-video").dialog({autoOpen:!1,width:s,height:c,resizable:!0}),$("#addVideoBtn").click((function(){$("#dialog-add-video").dialog("open")})),$("#dialog-edit-order").dialog({autoOpen:!1,width:800,height:600,resizable:!1}),$("#image-icon").click((function(){$("#dialog-edit-order").dialog("open")}))}))},function(e,o,t){"use strict";o.__esModule=!0;var n=function(){function e(e){this.categories=[],this.videoNum=e}return e.prototype.getBookmarksDiv=function(e){for(var o="",t=1;t<e+1;t++)o+='\n                <button id="video-'+this.videoNum+"-link-"+t+'" class="timestampBtn" >hh:mm:ss</button>  \n\n                <input id="video-'+this.videoNum+"-time-"+t+'" type=\'time\' class="without_ampm" step="1" required value="00:00:00"> \n                <div>\n                <textarea class="bookmark-notes" id="video-'+this.videoNum+"-bm-"+t+'" cols="35"></textarea>\n                </div>\n            ';return o},e.prototype.insertVideoDiv=function(e,o,t){console.log("In Video Inserter insertVideoDiv for: "+e),this.videoNum=e;var n=this.getBookmarksDiv(o);$(".Label-Body").append('\n            <div class="Label-Video">\n                <h3 id="video-'+e+'-title">Placeholder Title for '+e+'</h3>   \n\n                <div class="panel-body">\n                    <div class = "video-section" id="video-'+e+'"></div>\n                    <p id="video-'+e+'-vid" style="color:white;">'+t+'</p>\n\n                    <div class="video-text">            \n                        <div class="dialog-notes">\n                            <label for="dialog-Notes" class="boxTitle">Notes</label> \n                            <div>\n                                <textarea id="video-'+e+'-notes" cols="35"></textarea>\n                            </div>           \n                        </div>\n\n                        <div class="boxTitle"><b>Old Bookmarks</b></div>\n\n                        <div class="all-bookmarks">\n                            <div class="video-bookmarks">                        \n                                '+n+'\n                            </div>\n\n                            <div class="dialog-bookmarks" id="video-'+e+'-new-bm">                    \n                            </div>\n                        \n                            <div class="dialog-footer">\n                                <button type="button" id="video-'+e+'-submit-book" class="submitBtn btn btn-success">Submit</button>\n                            </div>\n                        </div>\n\n                        <button id ="video-'+e+'-delete-book" class="videoDeleteButtons">Delete</button>\n                    </div>                                   \n                </div>\n            </div>\n        ')},e}();o.default=n}]);