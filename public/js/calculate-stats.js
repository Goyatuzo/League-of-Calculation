// var youData = Your champion's data.
// var enemyData = Enemy champion's data.

var youLevel = 1;
var enemyLevel = 1;

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
    var $critCell = $player.find('.crit');

    var $armorCell = $player.find('.armor');
    var $mrCell = $player.find('.mr');

    var stats = data['stats'];
    var $items = $player.find(".item-set");

    // List of items.
    var items = getItemList($items);

    var totalAd = parseFloat(getChampionAttackDamage(stats, level)) + parseFloat(getItemsTotalAd(items));
    var totalAs = parseFloat(getChampionAttackSpeed(stats, level)) * (parseFloat(getItemsAttackSpeed(items)) + 1.0).toFixed(3);
    var totalArmor = parseFloat(getChampionArmor(stats, level)) + parseFloat(getItemsTotalArmor(items));
    var totalMr = parseFloat(getItemsTotalMR(items));

    var critChance = parseFloat(getItemsTotalCrit(items));

    $adCell.text(totalAd);
    $asCell.text(totalAs);
    $critCell.text(critChance * 100 + "%");

    // AP starts from 0 and only grows from item.
    $armorCell.text(totalArmor);
    $mrCell.text(totalMr);

    simulateDamage(totalAd, totalAs, critChance, 0, totalArmor, totalMr);
}

///////////////////////////////////////////////
///////////////////////////////////////////////
// Item-related functions
///////////////////////////////////////////////
///////////////////////////////////////////////

/**
 * From the Item URL, extrapolate only the item number.
 *
 * @param URL
 * @returns {*}
 */
function getItemNumber(URL) {
    "use strict";
    // First split by /
    var components = URL.split("/");

    // Then we only care about the last part of the URL.
    components = components[components.length - 1];

    // Now take away the file extension and get the filename, which is also the item number.
    components = components.split(".");
    return components[0];
}

/**
 * Given the div to the item, obtain the item number and return the stats.
 *
 * @param $itemDiv Reference to the div containing the item.
 */
function getItemData($itemDiv) {
    "use strict";
    // Obtain itemURL
    var itemURL = $itemDiv.children("img").attr("src");

    if (itemURL === undefined) {
        return undefined;
    }

    // Obtain item information.
    return itemData[getItemNumber(itemURL)];
}

function getItemList($setDiv) {
    "use strict";

    // List of items.
    var items = [];
    items.push(getItemData($setDiv.find("#item-one")));
    items.push(getItemData($setDiv.find("#item-two")));
    items.push(getItemData($setDiv.find("#item-three")));
    items.push(getItemData($setDiv.find("#item-four")));
    items.push(getItemData($setDiv.find("#item-five")));
    items.push(getItemData($setDiv.find("#item-six")));

    return items;
}

function getItemsAttributeSum(itemSet, attribute) {
    "use strict";

    var attributeSum = 0;
    var itemStats;

    for (var i = 0; i < itemSet.length; ++i) {
        if (itemSet[i]) {
            itemStats = itemSet[i]['stats'];

            // If the item has the desired attribute, add it to the sum.
            if (itemStats[attribute]) {
                attributeSum += itemStats[attribute];
            }
        }
    }
    return attributeSum;
}


function getItemsTotalAd(itemSet) {
    "use strict";

    return getItemsAttributeSum(itemSet, 'FlatPhysicalDamageMod');
}

function getItemsAttackSpeed(itemSet) {
    "use strict";

    return getItemsAttributeSum(itemSet, "PercentAttackSpeedMod");
}

function getItemsTotalCrit(itemSet) {
    "use strict";

    return getItemsAttributeSum(itemSet, "FlatCritChanceMod");
}

function getItemsTotalArmor(itemSet) {
    "use strict";

    return getItemsAttributeSum(itemSet, "FlatArmorMod").toFixed(3);
}

function getItemsTotalMR(itemSet) {
    "use strict";

    return getItemsAttributeSum(itemSet, "FlatSpellBlockMod").toFixed(3);
}

///////////////////////////////////////////////
///////////////////////////////////////////////
// Champion base values.
///////////////////////////////////////////////
///////////////////////////////////////////////

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

    // Level one has no growth.
    level -= 1;

    // Round to the nearest hundredth.
    return (baseAD + adPerLevel * (level)).toFixed(3);
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

    // Level 1 has no growth
    level -= 1;

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

    // Level 1 has no growth.
    level -= 1;

    return (baseMR + level * mrPerLevel).toFixed(3);
}

///////////////////////////////////////////////
///////////////////////////////////////////////
// Simulation
///////////////////////////////////////////////
///////////////////////////////////////////////

function simulateDamage(ad, as, crit, ap, armor, mr) {
    "use strict";

    var $adCalculation = $("#adCalculation");

    var numberOfAutos = attackCount(as, 1);
    var simulateAd = numberOfAutos * ad * armorMultiplier(armor);
    $adCalculation.text(simulateAd.toFixed(3));
}

/**
 * Calculate the number of times the champion auto attacks.
 *
 * @param as
 * @param seconds
 * @returns {number}
 */
function attackCount(as, seconds) {
    "use strict";

    return as * seconds;
}

/**
 * Obtain the damage multiplier reduced by armor through this calculation.
 *
 * @param armor
 * @returns {number}
 */
function armorMultiplier(armor) {
    "use strict";
    return parseFloat(100.0 / (100.0 + armor));
}