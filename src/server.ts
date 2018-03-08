import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as cors from 'cors';

// import routers
import ArticleRouter from "./routers/ArticleRouter";
import UserRouter from "./routers/UserRouter";
import HttpError from "./errors/HttpError";


// Server class
class Server {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    public config() {
        // mongoose
        const MONGO_URI = 'mongodb://localhost/nodeblog';
        mongoose.connect(MONGO_URI || process.env.MONGODB_URI);

        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(bodyParser.json());
        this.app.use(logger('dev'));
        this.app.use(compression());
        this.app.use(helmet());
        this.app.use(cors());
    }

    public routes() {
        let router: express.Router;
        router = express.Router();

        this.app.use('/', router);
        this.app.use('/api/v1/articles', ArticleRouter.router);
        this.app.use('/api/v1/users', UserRouter.router);
        this.app.use((err, req, res, next) => {
            const errorResponse = new HttpError('Error occurred!', 500);
            res.json({message: errorResponse.message, statusCode: errorResponse.statusCode});
            next(res);
        });
    }
}

export default new Server().app;
