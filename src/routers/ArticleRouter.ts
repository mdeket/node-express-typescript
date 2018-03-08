import {Router, Request, Response, NextFunction} from 'express';
import Article from '../models/Article';

class ArticleRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public GetArticles(req: Request, res: Response, next: NextFunction): void {
        Article.find({})
            .then((data) => {
                res.status(200).json({
                    data
                });
            })
            .catch(next);
    }

    public GetArticle(req: Request, res: Response, next: NextFunction): void {
        const slug: string = req.params.slug;
        Article.find({slug})
            .then((data) => {
                res.status(200).json({
                    data
                });
            })
            .catch(next);
    }

    public CreateArticle(req: Request, res: Response, next: NextFunction): void {
        const title: string = req.body.title;
        const slug: string = req.body.slug;
        const content: string = req.body.content;
        const featuredImage: string = req.body.featuredImage;

        const article = new Article({
            title, slug, content, featuredImage
        });

        article.save()
            .then((data) => {
                res.status(201).json({
                    data
                });
            })
            .catch(next);
    }

    public UpdateArticle(req: Request, res: Response, next: NextFunction): void {
        const slug: string = req.params.slug;

        Article.findOneAndUpdate({slug}, req.body)
            .then((data) => {
                res.status(200).json({
                    data
                });
            })
            .catch(next);
    }

    public DeleteArticle(req: Request, res: Response, next: NextFunction): void {
        const slug = req.params.slug;

        Article.findOneAndRemove({slug})
            .then((data) => {
                res.status(200).json({
                    data
                });
            })
            .catch(next);
    }

    routes() {
        this.router.get('/:slug', this.GetArticle);
        this.router.get('/', this.GetArticles);
        this.router.post('/', this.CreateArticle);
        this.router.post('/:slug', this.UpdateArticle);
        this.router.delete('/:slug', this.DeleteArticle);
    }

}

const articleRouter = new ArticleRouter();
export default articleRouter;
