const express = require('express');
const constant = require('./src/constants/index');

const app = express();
const port = constant.PORT;
const bodyParser = require('body-parser');
const cors = require('cors');

const productCategoryRouter = require('./src/routers/productCategory.router');
const productRouter = require('./src/routers/product.router');
const authRouter = require('./src/routers/auth.router');
const uploadFileRouter = require('./src/routers/uploadFile.router');
const accountRouter = require('./src/routers/account.router');
const roleRouter = require('./src/routers/role.router');
const productReviewRouter = require('./src/routers/productReview.router');
const orderRouter = require('./src/routers/order.router');
const orderDetailRouter = require('./src/routers/orderDetail.router');
const blogRouter = require('./src/routers/blog.router');
const cartRouter = require('./src/routers/cart.router');
const favoriteRouter = require('./src/routers/favorite.router');
const orderCheckStatusRouter = require('./src/routers/orderCheckStatus.router');
const blogCommentRouter = require('./src/routers/blogComment.router');
const contactRouter = require('./src/routers/contact.router');

app.use(express.static('uploads'));

app.use(cors({ origin: true, credentials: true }));
// parse application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: false,
    limit: '50mb',
    parameterLimit: 50000,
  })
);
// parse application/json
app.use(bodyParser.json({ limit: '50mb' }));

app.use('/api', authRouter);
app.use('/api', productCategoryRouter);
app.use('/api', productRouter);
app.use('/api', uploadFileRouter);
app.use('/api', accountRouter);
app.use('/api', roleRouter);
app.use('/api', productReviewRouter);
app.use('/api', orderRouter);
app.use('/api', orderDetailRouter);
app.use('/api', blogRouter);
app.use('/api', cartRouter);
app.use('/api', favoriteRouter);
app.use('/api', orderCheckStatusRouter);
app.use('/api', blogCommentRouter);
app.use('/api', contactRouter);

app.listen(port || 3000, () => {});
