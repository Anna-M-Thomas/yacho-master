March 15, 2021

- 30 minutes: create-react app, got rid of unnecessary bits. wrote inital readme.
- started work on javascript/db.json thing for automating calls to xeno-canto api to get recordings
- 30 minutes: saving to db.json. Working get request to xeno.canto api.
- 30 minutes: get request to xeno.canto api with axis
- 30 minutes: got _some_ birds and saved in db.json
  Total: 2 hours

March 16, 2021

- 30 minutes: Made function to compare bird list with attained birds, got most of remaining
- 30 minutes: Got data for all birds, figuring out how to download mp3s with Node
- 30 minutes: Can download mp3 with node, rename file, set default mp3 player to Audacity
- 30 minutes: Downloading batches of mp3 files.
- 30 minutes: Finished downloading all, cleaning up blank files
- 30 minutes: Setting up test for helper quiz function
- 30 minutes: First helper functions and their tests
  Total: 3.5 hours

March 18, 2021

- 30 minutes: brainstorming goals, fixing dependency tree something something, added separate pages via react-router, looking at languages in Full Stack website
- 30 minutes: installed react-i18next, tried it out, looking at Suspense now
- 30 minutes: language setting buttons, navigation in jp/en, first quiz components
- 30 minutes: working on displaying random question/answers with text only
- 30 minutes: question and answers display ok, can hide question
- 30 minutes: points for guessing right, event listener for buttons work 1x only
- 30 minutes: starting backend
- 30 minutes: more backend serving static files (mp3) with express.static
  Total 4 hours

March 19, 2021

- 30 minutes: adding Japanese names to db.json
- 30 minutes: finished adding Japanese names, looking at recording citation
- 30 minutes: fixed audio not reloading problem
- 30 minutes: adding hot keys via react-hot-keys
- 30 minutes: hotkeys successfully work like the buttons do (check answer)
- 30 minutes: started settings page for hotkeys
- 30 minutes: can set hotkeys, working on preventing duplicates
- 30 minutes: made map for special keys, to do for next time
  Total 4 hours

March 22, 2021

- 30 minutes: puzzling over keys
- 30 minutes: alphabet, #s, special keys in hotkeys keymap OK
- 30 minutes: setting play button, next button
- 30 minutes: play button, next button, not broken
- 30 minutes: looking at avibase
- 30 minutes: adding styling to button being set, editing code
- 30 minutes: trying to simplify code
- 30 minutes: Put get answer & get question in back end. Success!!!
  Total 4 hours

March 23, 2021

- 30 minutes: simplified settings state, front end now asking back end for questions, answers
- 30 minutes: Connect to Mongo, mongoose, making user schema
- 30 minutes: Testing backend with supertest
- 30 minutes: Form for making new user/password, failing to post
- 30 minutes: New user form works, working on login
- 30 minutes: login not working, testing
- 30 minutes: login works, local storage with logged in user
  Total 3.5 hours

March 25, 2021

- 30 minutes: trying to fix audio source issue
- 30 minutes: looking up safari slowness issue
- 30 minutes: clear forms after submit, hide login page after login, working on preventing next question without answering
- 30 minutes: Finally won't go to next question without answer
- 30 minutes: setting up an array in user for saving correct/incorrect answer
- 30 minutes: test for array in user passed
  Total 3 hours

March 26, 2021
-30 minutes: working on restructuring User
-30 minutes: answer model, testing
-30 minutes: still thinking about collection, structure.
-30 minutes: making new router for answers
-30 minutes: test works for posting a new answer
-30 minutes: can update an answer
-30 minutes: can post a new answer from front end
-30 minutes: can update right/wrong from front end
Total 4 hours

March 30, 2021
-30 minutes: # of choices now reflected in request to back end
-30 minutes: fixed another # of choices problem, restructuring quiz
-30 minutes: Combined question, answers into one component
-30 minutes: Getting answer history to display in question, thinking how to deal with local storage & answer history
-30 minutes: More struggles with answer history
-30 minutes: Trying to set answer history after answer
-30 minutes: UseEffect to either get or reset user by checking token
-30 minutes: Working on handling expired tokens by logging out, token needed for posting answer history
Total 4 hours

March 31, 2021
-30 minutes: Token checking OK (actually receiving token), groundwork for moving update answer logic to backend and combining into one endpoint
-30 minutes: backend answer logic written
-30 minutes: more work on token, update answer
-30 minutes: checking incrementing
-30 minutes: working on checking token problems and getting answers from backend on reload
-30 minutes: saving answers in user problems
-30 minutes: saving answers ok even when answering quickly (mongo version problems), working on login check and returning answers
-30 minutes: can display right/wrong history, logout function OK, changed mp3 files back to access from backend
Total 4 hours

36 hours so far...wow, that's only like 2 credits and to get 10 credits it'd be....175 hours??

April 1, 2021
-30 minutes: Saving Japanese and English names in answer, changed thanks page to about page, redirecting to about page, started a user page
-30 minutes: User page displays right and wrong history, clears history (locally)
-30 minutes: Working on delete user option
-30 minutes: Successfully checking user token with headers and not request.body. Successfully deleting user, which then spectacularly wrecks everything.
-30 minutes: Can delete answer history now
-30 minutes: looking at options for pictures, will try flickr api
Total 3 hours

April 2, 2021
-30 minutes: Looking at Flickr api
-30 minutes: Made temporary mystery bird image, front end asking for api for image
-30 minutes: Successfully getting JSON image info from flikr api through the backend!
Total 1.5 hours

April 4, 2021
-30 minutes: Showing an image from flickr!
Total .5 hours

April 5, 2021
-30 minutes: No longer resets previously set keys by adding choices, working on local storage for settings
-30 minutes: local storage works, looking at material UI
-30 minutes: material UI stuff
-30 minutes: user data to Table, fixed clear answers (wasn't actually deleting)
-30 minutes: Looking at quiz styling, alert dialog (for erasing user etc)
-30 minutes: Alert opens with generic message (but doesn't close, whoops)
Total 3 hours

April 6, 2021
-30 minutes: Alert for delete answer history and user works
-30 minutes: working on grid layout for quiz
-30 minutes: more messing with grid
-30 minutes: trying to resolve overlapping with grid and failing
-30 minutes: Working on various console log warnings
-30 minutes: i18n for Quiz
Total 3 hours

April 8. 2021
-30 minutes: Watching Material UI tutorial
-30 minutes; still trying to fix layout
-30 minutes: gave up on Grid, switched to regular flexbox
-30 minutes: fiddling with styles
-30 minutes: more styles
-30 minutes: translated settings, userforms
Total 3 hours

April 9, 2021
-30 minutes: Removed h1s, fixed margins without h1s, looking at hover effect for menu
Total 30 minutes

April 12, 2021
-30 minutes: Slightly more mobile responsive, fixed too-tall images, added Roboto font to html page
-30 minutes: Added Flickr credits, moved credits and key map to bottom
-30 minutes: Fiddling with menu icons
-30 minutes: More menu icons, starting mystery bird pic
-30 minutes: mystery bird pic
Total 2 hours 30 minutes

April 14, 2021
-30 minutes JP-EN and links for About page
-30 minutes JP-EN for User page and confirm dialog
-30 minutes, made footer in Quiz, adjusted picture label, fixed photo credit to link to profile
-30 minutes: Tweaked button styling, changed bullets to duck emojis, omitted tab and escape for keyboard navigation
Total 2 hours

55 hours so far

April 15, 2021
-30 minutes: Using quiz and checking recordings

April 16, 2021
-30 minutes: more checking recordings
-30 minutes: Missing bird image
-30 minutes: Favicon stuff, starting fixing audio
-30 minutes: downloadeding new audio

April 19, 2021
-30 minutes: Downloading audio, starting JSON edits
-30 minutes: JSON edits
-30 minutes: more JSON edits
-30 minutes: finished JSON, checking audio, last translation bit, looking at i18n debugging
-30 minutes: looking at Heroku, changing back to getting audio from Xeno-canto
-30 minutes: trying to make Heroku work
-30 minutes: trying to figure out why api calls don't work
