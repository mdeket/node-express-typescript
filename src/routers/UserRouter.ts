import {Router, Request, Response, NextFunction} from 'express';
import User from '../models/User';

class UserRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public GetUsers(req: Request, res: Response, next: NextFunction): void {
        User.find({})
            .then((data) => {
                res.status(200).json({
                    data
                });
            })
            .catch(next);
    }

    public GetUser(req: Request, res: Response, next: NextFunction): void {
        const username: string = req.params.username;
        User.findOne({username}).populate('articles', 'title content')
            .then((data) => {
                res.status(200).json({
                    data
                });
            })
            .catch(next);
    }

    public Createuser(req: Request, res: Response, next: NextFunction): void {
        const name: string = req.body.name;
        const username: string = req.body.username;
        const email: string = req.body.email;
        const password: string = req.body.password;
        const articles: string[] = req.body.articles;

        const user = new User({
            name, username, email, password, articles
        });

        user.save()
            .then((data) => {
                res.status(201).json({
                    data
                });
            })
            .catch(next);
    }

    public UpdateUser(req: Request, res: Response, next: NextFunction): void {
        const username: string = req.params.username;

        User.findOneAndUpdate({username}, req.body)
            .then((data) => {
                res.status(200).json({
                    data
                });
            })
            .catch(next);
    }

    public DeleteUser(req: Request, res: Response, next: NextFunction): void {
        const username = req.params.username;

        User.findOneAndRemove({username})
            .then((data) => {
                res.status(200).json({
                    data
                });
            })
            .catch(next);
    }

    routes() {
        this.router.get('/:username', this.GetUser);
        this.router.get('/', this.GetUsers);
        this.router.post('/', this.Createuser);
        this.router.post('/:username', this.UpdateUser);
        this.router.delete('/:username', this.DeleteUser);
    }

}

const userRoutes = new UserRouter();
export default userRoutes;
