export default class RiotApiEndpoint {
    protected static basicStaticRoute(region: string): string {
        return `https://global.api.pvp.net/api/lol/static-data/${region}/v1.2/`;
    }

    protected static dataDragonImageEndpoint(): string = 'http://ddragon.leagueoflegends.com/cdn/5.23.1/img/';
}