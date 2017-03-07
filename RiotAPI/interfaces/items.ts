export interface IItemListDto {
    basic: IBasicDataDto;
    data: { [string: string]: IItemDto };
    groups: Array<IGroupDto>;
    tree: Array<IItemTreeDto>;
    type: string;
    version: string;
}

export interface IBasicDataDto {
    colloq: string;
    consumeOnFull: boolean;
    consumed: boolean;
    depth: number;
    description: string;
    from: Array<string>;
    /**
     * Data Dragon includes the gold field for basic data, which is shared by both rune and item.
     * However, only items have a gold field on them, representing their gold cost in the store.
     * Since runes are not sold in the store, they have no gold cost.
     */
    gold: IGoldDto;
    group: string;
    hideFromAll: boolean;
    id: number;
    image: IImageDto;
    inStore: boolean;
    info: Array<string>;
    maps: { [string: string]: boolean };
    name: string;
    plaintext: string;
    requiredChampion: string;
    rune: IMetaDataDto;
    sanitizedDescription: string;
    specialRecipe: number;
    stacks: number;
    stats: IBasicDataStatsDto;
    tags: Array<string>;
}

export interface IGroupDto {
    maxGroupOwnable: string;
    key: string;
}

export interface IItemDto {
    colloq: string;
    consumeOnFull: boolean;
    consumed: boolean;
    depth: number;
    description: string;
    effect: { [string: string]: string };
    from: Array<string>;
    /**
     * Data Dragon includes the gold field for basic data, which is shared by both rune and item.
     * However, only items have a gold field on them, representing their gold cost in the store.
     * Since runes are not sold in the store, they have no gold cost.
     */
    gold: IGoldDto;
    group: string;
    hideFromAll: boolean;
    id: number;
    image: IImageDto;
    inStore: boolean;
    info: Array<string>;
    maps: { [string: string]: boolean };
    name: string;
    plaintext: string;
    requiredChampion: string;
    rune: IMetaDataDto;
    sanitizedDescription: string;
    specialRecipe: number;
    stacks: number;
    stats: IBasicDataStatsDto;
    tags: Array<string>;
}

export interface IItemTreeDto {
    header: string;
    tags: Array<string>;
}

export interface IBasicDataStatsDto {
    FlatArmorMod: number;
    FlatAttackSpeedMod: number;
    FlatBlockMod: number;
    FlatCritChangeMod: number;
    FlatCritDamageMod: number;
    FlatEXPBonus: number;
    FlatEnergyPoolMod: number;
    FlatEnergyRegenMod: number;
    FlatHPPoolMod: number;
    FlatHPRegenMod: number;
    FlatMagicDamageMod: number;
    FlatMovementSpeedMod: number;
    FlatPhysicalDamageMod: number;
    FlatSpellBlockMod: number;
    PercentArmorMod: number;
    PercentAttackSpeedMod: number;
    PercentBlockMod: number;
    PercentCritChanceMod: number;
    PercentCritDamageMod: number;
    PercentDodgeMod: number;
    PercentEXPBonus: number;
    PercentHPPoolMod: number;
    PercentHPRegenMod: number;
    PercentLifeStealMod: number;
    PercentMPPoolMod: number;
    PercentMPRegenMod: number;
    PercentMagicDamageMod: number;
    PercentMovementSpeedMod: number;
    PercentPhysicalDamageMod: number;
    PercentSpellBlockMod: number;
    PercentSpellVampMod: number;
    rFlatArmorModPerLevel: number;
    rFlatArmorPenetrationMod: number;
    rFlatArmorPenetrationModPerLevel: number;
    rFlatCritChangeModPerLevel: number;
    rFlatCritDamageModPerLevel: number;
    rFlatDodgeMod: number;
    rFlatDodgeModPerLevel: number;
    rFlatEnergyModPerLevel: number;
    rFlatEnergyRegenModPerLevel: number;
    rFlatGoldPer10Mod: number;
    rFlatHPModPerLevel: number;
    rFlatHPRegenModPerLevel: number;
    rFlatMPModPerLevel: number;
    rFlatMPRegenModPerLevel: number;
    rFlatMagicDamageModPerLevel: number;
    rFlatMagicPenetrationMod: number;
    rFlatMagicPenetrationModPerLevel: number;
    rFlatMovementSpeedModPerLevel: number;
    rFlatPhysicalDamageModPerLevel: number;
    rFlatSpellBlockModPerLevel: number;
    rFlatTimeDeadMod: number;
    rFlatTimeDeadModPerLevel: number;
    rPercentArmorPenetrationMod: number;
    rPercentArmorPenetrationModPerLevel: number;
    rPercentAttackSpeedModPerLevel: number;
    rPercentCooldownMod: number;
    rPercentCooldownModPerLevel: number;
    rPercentMagicPenetrationMod: number;
    rPercentMagicPenetrationModPerLevel: number;
    rPercentMovementSpeedModPerLevel: number;
    rPercentTimeDeadMod: number;
    rPercentTimeDeadModPerLevel: number;
}

export interface IGoldDto {
    base: number;
    purchasable: boolean;
    sell: number;
    total: number;
}

export interface IImageDto {
    full: string;
    group: string;
    h: number;
    sprite: string;
    w: number;
    x: number;
    y: number;
}

export interface IMetaDataDto {
    isRune: boolean;
    tier: string;
    type: string;
}