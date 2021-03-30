- **The GOALS**
- *is not broken *multilingual En/Jp *login with username, password *stored correct answer history and score which allows clearing for logged in users *correct answer history, score for not logged in *accessible (semantic HTML, make sure answers can be selected, OK color scheme, pic captions) *responsive *annoying theme song (that is off unless otherwise specified) *pictures *acceptable CC license wise

* Three pages? The game, settings, and thanks page (xeno-canto, recordings). And login, so 4
* Key commands for selecting bird which can be set to user's preferences

- get rid of create-react app boilerplate.....done
- write inital readme.....done
- make file for getting bird recordings.....done
- write a single request to save in db.json.....done
- write a single request to xeno-canto api and check it saves in db.json.....done
- figure out how to filter responses to the first one with a suitable license and save in db.json....done
  --We want share alike (international) creativecommons.org/licenses/by-nc-sa/4.0/
  --Not non derivative //creativecommons.org/licenses/by-nc-nd/4.0/ which would mean we can't alter the recording
- Make another .js file importing db.json and birdlist to see how many birds are not saved yet, export that, make another pass with getbirds.js.....done
- Get last three birds from the error console.log probably.....done
- New file for downloading mp3s. What method? node-downloader-helper is working.....done
- Can I rename the file to the id instead? Am totally going to screw up file names this long.....done
- Download audacity and figure out how to prevent itunes from automically opening mp3 files.....done, set to audacity for now. Quicktime player resaves file on close? and then mac distrusts file
- How to download multiple files without being terrible? Whatever, let's do a for loop.
- OK, I don't know what's wrong with for loops in node but let's do foreach instead in groups of 10
- Why do I have 239 items when there should be only 238...what I am I missing...it's DS_Store!.....done
- Look at xeno-canto widget--probably can't use.....done
- Setting up testing for helper function...in progress
- A function that, given an array, picks a question, and n number of answers including real answer...done
- The answers need to be in random order, right now answer is always first...done!
- Three pages (react-router)...done
- Add languages: react-i18next https://react.i18next.com/latest/using-with-hooks ...done, ish
- What is suspense...it is annoying I will turn it off...done
- First quiz components, text-based only, no audio/pics...done
- Add audio...done
- I need to add a jp name and a romaji name to every bird. Did manually, that was inefficient...done
- Audio file src doesn't change even when props (question) changes
  https://stackoverflow.com/questions/43577182/react-js-audio-src-is-updating-on-setstate-but-the-audio-playing-doesnt-chang
  I can get the audio with useRef, and pass it up. See Full Stack Open 5b !!! It worked!!....done
- Key commands, not just click buttons...react-hotkeys-hook...done
- Hotkeys (hardcoded #) now work for checking answer....done
- Add hotkey for next button...done
- How can user set keys?...done kind of
- In settings, get charcode of keystroke. Check to see if it's anywhere alphabet-y (that # range). If yes, set state with that. Then check to see if it's in hotkeys-keymap, if yes, get value for key and set state with that. If not, ignore....DONEee finally
- Check caps. If state is set with "A", does "a" work. If state is set with "a," does "A" work...nope, so we need to toLowercase...done
- Let user choose number of answers...done, phew
- OK do I actually need to store mp3s? Let's look at avibase!!...
  Avibase has a "listen to recording" button that has a data-concept which is same as avibase id (ex. 6D7A9C93AD1830EB)
  On page reload, a different song from xeno-canto plays.
  It's using a jquery player called jPlayer. jPlayer is getting the audio out of something called sound_item.jsp using id from data-concept
  I can look at sound_item.jsp ex. https://avibase.bsc-eoc.org/sound_item.jsp?avibaseid=11453A9801F87E9D
  and see the mp3 audio URL is different each time. And uh oh wait, there's a fileid. There is only one fileid per recording, and the fileid is not from xeno-canto.
- My conclusion is I think probably avibase is linking to files, not hosting them. I don't need to host the files probably because setting audio src to the xeno-canto file is working....done
- Show what button is being set...done
- Move bird objects, get next question and answer to backend....DONE!
- Simplify that part of Settings state to a string/null!...done, that's a little better
- Thwarted by CORS! Oh, also the backend isn't running, that's a problem...done
- Change front end so it asks back end for question and answer...done
- Add connection to MongoDB, Mongoose...done
- Testing to make sure it's not completely broken...done, so it is only 1/4 broken maybe
- Add new user submit form...done, works
- Add login form, and thus tokens and stuff,, and also loginrouter for backend...done
- Wheres the bit that expires the token? Part 4d ...done
- "data and hash arguments required"...done
- The audio is not actually reloading still, whyyy~ do I need to useRef harder or what
  WTF firstchild source= is right, but currentSource is wrong???...DONE
- Forms need to clear after submit...done
- Login page should disappear from menu if user?...done
- The next arrow key, specifically, is showing hasAnswered as false. Why? Answer: you forgot that dependency array thing again!...done
- Disable next key in quiz until question is answered...done
- Change array to hold objects {bird id, correct: number, incorrect:number} or something?
  "The $addToSet operator adds a value to an array unless the value is already present, in which case $addToSet does nothing to that array. To specify a <field> in an embedded document or in an array, use dot notation."
  An array like answers = [{id: "1234", right: 2, wrong: 3},{id: "1234", right: 2, wrong: 3}] would use the index
  eg. answers.0, so I'd need to keep track of the index, which I don't want to do.
  answers = [{id: "1234", history: [{right: 2, wrong: 3}]}]
  "answers.1234"

  - For example, comments in the example blog models is comments: [ String ]
    I want answers : [Object]
    You know what, making another schema and storing documents inside the array makes more sense.
    If answered bird is NOT in user array of answers post to api/answers, make a new answer with 0 right and wrong, save user in its user field or whatever, add it to user, return user.
    If answered bird IS in user array of answers, put to api/answers/:id (meaning Mongo \_id!) with full updated object and incremented right or wrong

  1. An endpoint that goes to api/answers/
  2. A new schema for birds
  3. set \_id to bird id. Each bird gets an array of answerSchemas
  4. No, but I need to update the answer. Agggggghh
     Answer
     \_id:
     bird: String
     user: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "User",
     },
     right: Number,
     wrong: Number
     -

- Guess what, right and wrong have to be numbers or you can't increment them....done
- Put answers in a separate state...no I don't want to, that's a pain. OK. I figured out how to alter user's answer array in state....done
- Reducing number of answers doesn't limit number of answers in Quiz, like the elements are still there
  This is # of choices not fed to api call yet. Changed get to post to send data...done
- How many documents can these things hold? Is it really OK to have 200 something bird answers per user? 100 users answer all => 23,700 1000 users =>237,000
  ....Yeah, it's ok. https://docs.mongodb.com/manual/reference/limits/ under data "there is not limit on # of documents...done
- Now why is only loading one answer on next?...done

- Show # right and wrong after answered if signed in...done
- Check for token for posting answers
- Add some kind of message/alert component
- Add something that shows if answer was right or not
- Store correct/incorrect history of bird for unlogged (local storage), logged user
- Let users delete their accounts
- Show citation and license with audio file
  `${bird.rec}, XC${bird.id}. Accessible at ${bird.url}.`
  Anon Torimi, XC404507. Accessible at www.xeno-canto.org/404507.
  (How to do that with react-i18next?)
- Make everything async
- Save score to localStorage
- I should probably just have one gitignore file instead of multiple, it's one repository?
  Add endpoint that gives all the recorders (for thanks)
- Safari is super slow with audio, but this seems to be just "the nature of safari"
