# [Youtube-Book](https://cryptic-basin-95763.herokuapp.com/)

## Description
YouTube Book lets you upload YouTube videos as books with bookmarks and notes.

## To Run the server - Just do this once
* In root type `npm run start-dev` and go to localhost:8080
* You may have to **refresh the page a few times (2-5 times)** until you see green bars that are collapsible.
Sometimes the YouTube videos do not load and you will see just the blank video data. 
* The 12 in the hh:mm:ss format is a 0 but we could not get it to show as 0 since its a time input.

## To Build for Development - Do this every time changing a file
1. **Changing Client ts files**
    * Type `npm run build` in root whenever changing client ts files.

2. **Changing Server ts files**
    * Type `tsc` in /src whenever changing server ts files.
