
Technologies used:
express
a bunch of npm modules
    as for what these do they were part of the project guidelines and majority were required for running the server.

Giant Bomb API: (thanks to irwin for this) an videogame library with a lot of information
Twitch API: lets you pull information on streams, online or not and other streamer statistics.

the approach was setting up the Giant Bomb API and then using the value it returns to put into the twitch API.

this helped to solve issues of uniform results among the two api's. the giant bomb api would search the full name of whatever it pulled from the search and the twitch would look for that.
(if the game had no streams twitch searches for similar expressions ex: mariokart super circuit would pull up mario kart 64 cause noone plays super circuit.)

unsolved features: i tried to implement a next stream button but it didnt seem to work more than once per refresh.
put was being weird too.

User stories:
 Ideally the user should be able to avoid the google bait of retailers and pull up a detailed overview of the game followed by live gameplay of said game.
