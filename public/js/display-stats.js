// JS to enable the dropdown functionality for levels.
$('.dropdown-toggle').dropdown();

// If a champion's level was selected, change the Level text to the level that was chosen.
$('.dropdown li a').click(function () {
    "use strict";

    // The text that should be shown to the user.
    var levelHtml = 'Level ' + $(this).text() + '<span class="caret"></span>';
    var $player = $(this).closest('.championInformation');
    var level = parseInt($(this).text());

    // Check if your level was changed, and update the stats displayed.
    if ($player.attr('id') === 'you') {
        youLevel = level;
        updateStatsDisplay($player, youData, level);
    } else {
        enemyLevel = level;
        updateStatsDisplay($player, enemyData, level);
    }

    // Change the appropriate text to be "Level #"
    $player.find('.dropdown-toggle').html(levelHtml);
});

$('.itemThumbnail').draggable({
    snap: ".item-select",
    snapMode: "inner",
    revert: 'invalid',
    helper: 'clone'
});

$('.item-select').droppable({
    accept: ".itemThumbnail",
    drop: function(event, ui) {
        "use strict";
        $(this).html($(ui.draggable).clone());
        //$(this).droppable('option', 'accept', ui.draggable);
    }
});

$(document).ready(function() {
    $('.itemThumbnail').fadeIn();
});