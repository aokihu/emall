import RestRouter from '../lib/koa-rest-router';

const modelName = 'product';
const router = new RestRouter(modelName, {prefix: `/v1/${modelName}`});

export default router;
