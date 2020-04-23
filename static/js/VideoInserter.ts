export default class VideoInserter {
    private videoNum : number;

    constructor(videoNum : number) {
        this.videoNum = videoNum;
        console.log("in video inserter: " + videoNum)
    }

    public sayHello() {
        console.log("---hello!");
    }


}