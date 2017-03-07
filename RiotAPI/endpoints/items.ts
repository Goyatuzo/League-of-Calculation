import * as fetch from 'isomorphic-fetch';

import RiotApiEndpoint from './index';
import { IItemListDto } from '../interfaces/items';


export default class ItemStaticEndpoint extends RiotApiEndpoint {

    public static getAllItems(): Promise<IItemListDto> {
        return fetch(`${this.baseStaticRoute}item?api_key=b9a83979-c2a0-4007-9e07-f3a8e08e4f61`).then(response => {
            return response.json() as Promise<IItemListDto>;
        });
    }
}