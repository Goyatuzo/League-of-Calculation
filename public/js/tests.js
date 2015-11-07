var mockData = {
    armor: 19.012,
    armorperlevel: 3.5,
    attackdamage: 5,
    attackdamageperlevel: 1,
    attackspeedoffset: -0.1,
    attackspeedperlevel: 3.5,
    spellblock: 30,
    spellblockperlevel: 5
};

QUnit.test( "Test attack damage", function (assert) {
    "use strict";
    assert.equal(getChampionAttackDamage(mockData, 5), 10, "AD at level 5 should be 10.");
});

QUnit.test( "Test attack speed", function (assert) {
    "use strict";
    assert.equal(getChampionAttackSpeed(mockData, 5), .792, "AS at level 5 should be around .791667");
    assert.equal(getChampionAttackSpeed(mockData, 4), .767, "AS at level 4 should be around .767361");
});

QUnit.test( "Test armor", function (assert) {
    "use strict";
    assert.equal(getChampionArmor(mockData, 5), 36.512, "Armor at level 5 should be 36.512");
    assert.equal(getChampionArmor(mockData, 4), 33.012, "Armor at level 4 should be 33.012");
});

QUnit.test( "Test MR", function (assert) {
    "use strict";
    assert.equal(getChampionMR(mockData, 5), 55, "MR at level 5 should be 55");
    assert.equal(getChampionMR(mockData, 4), 50, "MR at level 5 should be 50");
});