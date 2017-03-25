import * as express from 'express';
import ItemStaticEndpoint from '../RiotAPI/endpoints/items';

const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
    ItemStaticEndpoint.getAllItems("NA").then(itemData => {
        res.render('items', { title: 'All Items', bootstrap: itemData });
    });
});

export default router;