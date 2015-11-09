// var youData = Your champion's data.
// var enemyData = Enemy champion's data.

var youLevel;
var enemyLevel;

/**
 * When some information pertaining the championInformation tag changes, use that
 * element as a parameter and adjust the statistical values for the appropriate
 * champion.
 *
 * @param $player   The championInformation div of the information that is to be edited.
 * @param data      The data to populate the cells.
 * @param level     The level of the champion to be calculated.
 */
function updateStatsDisplay($player, data, level) {
    "use strict";

    // The following points to the stat cell in the corresponding player div.
    var $adCell = $player.find('.ad');
    var $asCell = $player.find('.as');
    var $apCell = $player.find('.ap');

    var $armorCell = $player.find('.armor');
    var $mrCell = $player.find('.mr');

    var stats = data['stats'];

    $adCell.text(getChampionAttackDamage(stats, level));
    $asCell.text(getChampionAttackSpeed(stats, level));
    // AP starts from 0 and only grows from item.
    $armorCell.text(getChampionArmor(stats, level));
    $mrCell.text(getChampionMR(stats, level));
}

/**
 * Based on the input stats and the input level, calculate the champion's AD.
 *
 * @param stats
 * @param level
 * @returns {string}
 */
function getChampionAttackDamage(stats, level) {
    "use strict";

    var baseAD = stats['attackdamage'];
    var adPerLevel = stats['attackdamageperlevel'];

    // Round to the nearest hundredth.
    return (baseAD + adPerLevel * level).toFixed(3);
}

/**
 * Based on the input stats and the level, calculate the champion's AS.
 *
 * @param stats
 * @param level
 * @returns {string}
 */
function getChampionAttackSpeed(stats, level) {
    "use strict";

    var offset = stats['attackspeedoffset'];
    var asPerLevel = stats['attackspeedperlevel'];

    // Attack speed grow is from level 2, so ignore level 1.
    level -= 1;

    return ((0.625 / (1 + offset)) * (1 + (asPerLevel * level) / 100)).toFixed(3);
}

/**
 * Based on the input stats and the level, calculate the champion's armor.
 *
 * @param stats
 * @param level
 * @returns {string}
 */
function getChampionArmor(stats, level) {
    "use strict";

    var baseArmor = stats['armor'];
    var armorPerLevel = stats['armorperlevel'];

    return (baseArmor + level * armorPerLevel).toFixed(3);
}

/**
 * Based on the input stats and th level, calculate the champion's MR.
 *
 * @param stats
 * @param level
 * @returns {string}
 */
function getChampionMR(stats, level) {
    "use strict";

    var baseMR = stats['spellblock'];
    var mrPerLevel = stats['spellblockperlevel'];

    return (baseMR + level * mrPerLevel).toFixed(3);
}

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