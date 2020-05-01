export default class VideoInserter {
    private videoNum : number;
    categories : Array<any> = [];


    constructor(videoNum : number) {
        this.videoNum = videoNum;
    }

    public insertVideos(categories) {
        categories.forEach(category => {
            category.labels.forEach(label => {
                this.insertVideoDiv(label, this.videoNum);
            }); 
         });
    }
    

    public insertVideoDiv(labelNum : number, videoNum : number) {
        console.log("Inserting labelNum: " + labelNum + ", videoNum: " + videoNum);

        let divInsert = '#video-insert-before-me';

        let category = document.getElementsByClassName(`video-${videoNum}-category`)[0].id.substring(9);
        let label = document.getElementsByClassName(`video-${videoNum}-label`)[0].id.substring(6);
        let notes : any = $(`#video-${videoNum}-notes`).val();
        let timestampDiv = `#video-${videoNum}-time-`;
        let timestampNotes = `#video-${videoNum}-bm-`;

        $(divInsert).before(`
            <div class="Label-Video" id="Web-Services-video1">
            <h3 id="video-1-title-Web-Services-Video-1">Web services video 1</h3>   
            
            <div class="panel-body">
                <div class = "video-section" id="video-1"></div>
                <div class="video-text">
                    <p class = "video-${videoNum}-category" id = "Category-${category}"></p>
                    <p class = "video-${videoNum}-label" id = "Label-${label}"></p>
                    <p id = "videoNum-${videoNum}"></p>
                    <div class="dialog-notes">
                    <label for="dialog-Notes" class="boxTitle">Notes</label> 
                    <div>
                        <textarea id="video-${videoNum}-notes" cols="35"></textarea>
                    </div>           
                    </div>

                    <div class="boxTitle"><b>Bookmarks</b></div>

                    <div class="all-bookmarks">
                    <div class="video-bookmarks">
                        <!-- TODO TRENT UPDATE get data from fields on submit when edited-->
                        
                        <button id="video-${videoNum}-link-1" class="timestampBtn" >hh:mm:ss</button>  

                        <input id="video-${videoNum}-time-1" type='time' class="without_ampm" step="1" required value="00:01:10"> 
                        <div>
                        <textarea class="bookmark-notes" id="video-${videoNum}-bm-1" cols="35"></textarea>
                        </div>
                    </div>


                    <div class="dialog-bookmarks">
                        <!-- TODO TRENT UPDATE get data from fields on submit when edited-->  
                        <div class="boxTitle"><b>Add New Bookmarks</b></div>
                        <button id="video-${videoNum}-link-2" class="timestampBtn" >hh:mm:ss</button>  
                        <input id="video-${videoNum}-time-2" type='time' class="without_ampm" value="00:00:00" step="1" required>  
                        <div>
                        <textarea class="bookmark-notes" id="video-${videoNum}-bm-2" cols="35"></textarea>
                        </div>
                        <button type="button" id="video-${videoNum}-add-bookmark" class="add-bookmark btn btn-primary">Add New</button>
                        <div id="video-${videoNum}-insert-before-me"></div>
                    </div> 

                    
                    <div class="dialog-footer">
                        <button type="button" id="video-${videoNum}-submit-book" class="submitBtn btn btn-success">Submit</button>
                    </div>
                    </div>

                    <button onClick="deleteVideo()" id ="delete-video">Delete</button>
                </div>
            </div>
            <!-- Video-1 Panel body end -->
        </div>
        `);
    }


}