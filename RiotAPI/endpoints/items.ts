import * as fetch from 'isomorphic-fetch';

import RiotApiEndpoint from './index';
import { IItemListDto } from '../interfaces/items';
import { API_KEY } from '../constants';

export default class ItemStaticEndpoint extends RiotApiEndpoint {
    public static getAllItems(region: string): Promise<IItemListDto> {
        return fetch(`${this.basicStaticRoute(region)}item?api_key=${API_KEY}`).then(response => {
            return response.json() as Promise<IItemListDto>;
        });
    }
}
