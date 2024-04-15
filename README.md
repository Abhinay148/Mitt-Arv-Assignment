# Mitt-Arv-Assignment

## Description
The assignment was given to create a React application with the following features:

## Features
- **Login/Signup:** Users can register or log in to access the application.
- **Homepage:** Displays previously added data to the user.
- **Search Bar:** Allows users to search for specific notes.
- **Filter Option:** Users can filter notes based on the time of entry.
- **Floating Button:** Located at the bottom right, users can click to add a new note.
- **Add Note Form:**
  - Users can enter the following information:
    - Title
    - Description (Rich Text Editor)
    - Image
    - URL
    - Video URL
- **Note Details:**
  - Clicking on a specific note displays its details.
## Tech Stack Used
-**React**
-**Html**
-**Css**
-**Nodejs**
-**MongoDb**
## Functionality

### Logsignup.js
- This component provides the option for users to log in or sign up if they are visiting for the first time.
- User data is stored in MongoDB's User folder using the `/signup` endpoint from the backend.
- For logging in, the `/login` endpoint is utilized. If the provided details match, the user is redirected to the `Home.js` component.
### Home.js
- It consist of Search bar,Filter option, add Note floating button & the previous added note of respective user.
- /fetchusernotes is called to fetch the user previous data.

### Noteform.js
- On clicking the floating button the noteform component pop up where the user can add new Note.
  - Title
  - Description
  - Image Url
  - Video Url
- /addnotes is called on submit

### Note.js
- The added Note is visible in the form of a block.
### Notedetails.js
- On click the Note The Note details pop up with the detailed data of the note.
### Floating Button
-On the bottom Right corner a added button is there if the user wants to add the new note.
