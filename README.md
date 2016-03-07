League of Legends Damage Calculator
===================================
The user can choose the champion dealing the damage, and the champion receiving the damage. From there, the user can select the level they wish to be in, and also drag and drop the items that are owned by the champion. From there, the application will approximate the damage values to be expected in a second.

The application retrieves information directly from the API hosted by Riot Games, and stores them on the local system, so even if the API crashes due to traffic, this application will still run.

The motivation for this idea came from the fact that the only real way to determine "ideal builds" for each champion came from either experience, or having another friend be a meatshield for you and using a stopwatch to see how long it took for someone to die. The first can only be gained through a long time of playing, and even then it's more of an estimate rather than an accurate value. The second takes at least 20 minutes to reach the stage for initial trials, and that is per champion pair. If a different pair wanted to try out the same test, they would have to use another 20 minutes just to start testing. Something so simple should be much easier to do, since everything is based on mathematics. This is what I attempted to accomplish.


///////////////////////////////////////////////////////////////////////////////////////

Stopping work on this because there is just simply too many variables to consider when trying to calculate the damage models in League of Legends. I may come back to this in the future on a simplified version of the original idea.

Using it on your own server
---------------------------
Be sure to put your own API key in the system environment variable.
