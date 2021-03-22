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

- Save score to localStorage
- I should probably just have one gitignore file instead of multiple, it's one repository
- Show citation and license with audio file
  `${bird.rec}, XC${bird.id}. Accessible at ${bird.url}.`
  Anon Torimi, XC404507. Accessible at www.xeno-canto.org/404507.
  (How to do that with react-i18next?)
- Move bird objects to backend. Add endpoint that gives all the recorders (for thanks)
