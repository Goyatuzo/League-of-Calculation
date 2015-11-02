/**
 * @author Yuto Otaguro
 */

// When a champion thumnbnail is clicked, that is the first champion that was selected by the user.
var yourChampion;
var enemyChampion;

function getChampionFromPath(path) {
    var pathArray = path.split('/');

    // The PNG filename is at the end of the path.
    pathArray = pathArray[pathArray.length - 1];

    // Split the PNG filename to extension and champion name.
    pathArray = pathArray.split('.');

    // Return index 0, which is the champion name with no symbols or spaces.
    return pathArray[0];
}

/**
 * When a champion's thumbnail is clicked, either visually represent the champion that got selected,
 * or redirect when two champions were chosen.
 */
$(".championThumbnail").click(function () {
    // If your champion is not yet selected, change the id of the element to visually show champ has been chosen.
    if (yourChampion === undefined) {
        $(this).attr({id: 'you'});
        yourChampion = getChampionFromPath($(this)[0].currentSrc);
    } else {    // Otherwise enemy champ was selected and now you need to move to the next page.
        enemyChampion = getChampionFromPath($(this)[0].currentSrc);

        // Now redirect.
        window.location.replace(yourChampion + '/' + enemyChampion);
    }
});