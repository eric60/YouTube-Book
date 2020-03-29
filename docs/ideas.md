## Team Name: Kappa
## Application Name: Youtube Book

## Team Overview
* Johnathan Campana - https://github.com/johnathancampana
* Eric Shi - https://github.com/eric60
* Trent Bourgoin - https://github.com/tbourgoin1

  
## Innovative Idea
Our application Youtube Book is similar to a personal library where you can catalog your favorite Youtube videos. This is similar to mybooklist.com where you can list your favorite books. Youtube has playlists but doesn’t have the ability to add notes or data about the video. Youtube Book is unique because users can paste their youtube link and it will organize their videos by the category through Youtube’s Data API and also embed it as a watchable iframe making their favorite videos readily watchable without going to youtube itself.

Along with labels like Calc 3, notes, and video bookmark timestamps, users can streamline their Youtube videos in a single label group with easily accessible timestamps. This is better than just pasting links because the videos can be watched directly from our web site.

  
## Important Components
Our 2 main components will be the Youtube video category and the user inputted data on the video. The types of data we will be processing from the user is their video list. For each video input, we will fetch the video category from the Youtube Data API and it will automatically sort their video in a category like "education" or "entertainment". After, the user will enter in a label to further categorize their video like "Calc 3" or "Funny videos". Finally the user will enter in the title, notes, and any bookmark timestamps. We will support create, read, update, delete (CRUD) functions on all our data elements.

Data processed: 
* Users' video lists
* Video category
* Video title, video label, video notes, and video bookmark timestamps with notes attached e.g. (1:23 - Important part discussing integrals)

  
