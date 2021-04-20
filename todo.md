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
- Why am I not getting answers array from backend? Backend has an array of 281 something objects. I am receiving that just fine on login. I need to get user upon reload, not rely on localStorage, or answers could be out of date. In Full Stack Open example,
  const user = storage.loadUser()
  if (user) {
  dispatch(login(user))
  }
  }, [dispatch])
  I want to store user, as in token, username, and id. Separately, I want to store answerhistory, which is loaded with useEffect.
  -api/answers isn't working? Why?...done
- Check for token for posting answers...done, badly
  -Add try and catch to answerHandler.answerAgain in Quiz...done
  -Now successfully verifying token for answersRouter, though it does't prompt a logout yet...done
  -Alter front end to only use one endpoint and send true/false value for right/wrong and bird id to backend, get rid of the front end incrementing...done
  -Figure out how to omit user in answerFirstTime, right, wrong and user in answerAgain. You should be able to get user from token and increment on backend based on wasCorrect.
  -Send answer id and right/wrong with token header (which contains user) to backend
  ==> backend 1. gets user 2. Checks user's answer set for answer 3. if no answer, makes new Answer, adds to set, and saves answer 4. If answer, find and update answer by Mongo id
  -Increment for backend definitely works now!! You can just, do something Javascript-y to Mongoose documents and save() and it works! https://mongoosejs.com/docs/documents.html#updating-using-save
  -Also saving answers in state looks OK
  -Wait, why are there duplicate answers in the backend?...think it's solved...done
  -Why is returning user.answers empty? There should be 10. Because the answers array in user is actually empty.
- I think I fixed "No matching document found for id" error by changing user.save() to user.update()...oh great, now it only saves one answer to array...OK, works with findOneAndUpdate. It was version problems...done
  -Make User populate answers for being sent back in login check....done
  -Make new function for clearing logged in user to pass down into quiz, and also make logout stick...done
- Can now show right/wrong history with slight delay after answering...done
  -Change from getting mp3s from xeno canto back to stored on backend, unless we can figure out cross origin cookie issue...done
- It would be quicker to just get stored answer from state and increment it...wait, never mind, if it hasn't been answered it's not in state...done
- While you're at it, add bird names to answer...WAIT no we can't do that, that hardcodes either English or Japanese name, not good. But on the other end, if we go by xenocanto ID and put that in the i18n thing, then we'd need to change that if we switch xenocanto audio files. OK so answers have BOTH jp and en.
- Let users delete their accounts..done, and it no longer wrecks everything, but I need to
  -Erase all answers that user had...done!!!
- (I've set token back to 24h for now...)
- Pictures! Here's flicker-sdk https://www.npmjs.com/package/flickr-sdk
- Save settings to local storage, like # of options, key commands....done
- Save right and wrong to answers array if not logged in, not local storage (?probably)...no, I'm going to leave that just for logged in users...done
  -Clicking the right answer registers as being the wrong answer...fixed...done
  -Switch all Buttons to contained...done mostly
- Translate rest of site for both JP/EN...done
- Start to work on the Dreaded Design...doneish
  -Looking for hover effect for menu links...never mind Material UI does it for me for buttons...done
  Add endpoint that gives all the recorders (for thanks)...no I don't need to do that, giving thanks individually...done

  - Show citation and license with audio file
    `${bird.rec}, XC${bird.id}. Accessible at ${bird.url}.`
    Anon Torimi, XC404507. Accessible at www.xeno-canto.org/404507.
    (How to do that with react-i18next?)...done

  -Tell Heroku secrets & things, it doesn't know anything yet and that is probably why image api is now failing...done

  -Set it up so can look at app locally (post switching to relative URL)

- Add some kind of message/alert component that says right or wrong and shows errors...kind of like it better without alert?
- What am I going to do for a hundred and something more hours? Think of more stuff to do!

- Make everything async
- I should probably just have one gitignore file instead of multiple, it's one repository?

- Safari is super slow with audio, but this seems to be just "the nature of safari"

Other problems

- Japanese Grosbeak was restricted and we didn't actually download an mp3 file for it...done
- Chinese Hwamei's audio is broken. Another restricted recording....done
- Japanese thrush has no Japanese name listed (undefined)....done
- What is Western Yellow Wagtail doing in there?...Oh yeah, yellow wagtail in En is gray wagtail, western yellow comes to Okinawa and sometimes Kyushu I guess....done

  -Something wrong with Peregrine Falcon audio www.xeno-canto.org/624604...can't tell what it is.Everything looks ok.

Too short or not clear--look for a better source?

- Common sandpiper www.xeno-canto.org/575518 change to https://www.xeno-canto.org/240418 downloaded
  deleted
  added
  changed JSON

- Jungle nightjar www.xeno-canto.org/404907 change to https://www.xeno-canto.org/575166 downloaded
  deleted
  added
  changed JSON

- Common snipe www.xeno-canto.org/622103 to https://www.xeno-canto.org/637616 donwloaded
  deleted
  added
  changed JSON

- Japanese cormorant www.xeno-canto.org/360997 to https://www.xeno-canto.org/215126 downloaded
  deleted
  added
  changed JSON

- Striated heron www.xeno-canto.org/550529 to https://www.xeno-canto.org/623412 downloaded
  deleted
  added
  changed JSON

- Bull-bellied pipit www.xeno-canto.org/624421 to https://www.xeno-canto.org/622932
  deleted
  added
  changed JSON

- Rock dove www.xeno-canto.org/550328 to https://www.xeno-canto.org/615956 downloaded
  deleted
  added
  changed JSON

- Oriental Cuckoo www.xeno-canto.org/624365 to https://www.xeno-canto.org/636271
  deleted
  added
  changed JSON

- Tundra Swan www.xeno-canto.org/622675 to https://www.xeno-canto.org/615226 downloaded
  deleted
  added
  changed JSON

- Japanese Wood Pigeon www.xeno-canto.org/190496 to https://www.xeno-canto.org/285879 downloaded
  to 190495
  to
  deleted
  added...need to remove & find another, this is no derivs...190495
  switched and changed JSON

- Japanese Reed Bunting www.xeno-canto.org/492006 to https://www.xeno-canto.org/467361 downloaded
  deleted
  added
  changed JSON

- Northern Shoveler www.xeno-canto.org/541310 to https://www.xeno-canto.org/635744 downloaded
  deleted
  added
  changed JSON

- Grey Heron (too much silence) www.xeno-canto.org/625963 to https://www.xeno-canto.org/638666
  deleted
  added
  changed JSON

- Grey-Capped Greenfinch www.xeno-canto.org/627141 to can't use 285949, no derivs to https://www.xeno-canto.org/192392 instead downloaded
  deleted
  added
  changed JSON

- Little Grebe (can hear honking instead) www.xeno-canto.org/553775 to https://www.xeno-canto.org/215128 downloaded
  deleted
  added
  changed JSON

-Water rail www.xeno-canto.org/575203 to https://www.xeno-canto.org/638533 downloaded
deleted
added
changed JSON

-Common redshank www.xeno-canto.org/560874 to https://www.xeno-canto.org/618146 downloaded
deleted
added
changed JSON

-Grey-tailed Tattler www.xeno-canto.org/596212 to https://www.xeno-canto.org/192309
deleted
added
changed JSON

-Common Redpoll www.xeno-canto.org/626750 to https://www.xeno-canto.org/486718
deleted
added
changed JSON
