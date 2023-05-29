# Lemuel

"Google Chrome" --remote-debugging-port=9222
tsc --watch ts_file.ts

This is going to be me seeing if I can hookup a jupyter notebook with selenium remote debugging to have a massively efficient dev experience.

Being able to maintain state and test code blocks inidividually can save time & sanity.

## ijavascript & chrome-remote-interface work, but are very finicky.

Things that would be nice to have:

-   top level await
-   getting dom objects with javascript instead of strings
-   allowing redefining with const/let/var

## Angelina

Pretty much has given me all of those things that I wanted to have.
Custom jupyter kernel that hooks into chrome dev console. Comes with typescript support. Extremely convenient for developing chrome extensions. Can probably be modifed to work w. web dev in general.
I'm really happy with how useful Angelina has proven herself to be.
