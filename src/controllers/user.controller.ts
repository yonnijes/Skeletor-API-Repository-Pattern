import { Request, Response } from 'express';
import { route, POST, GET } from 'awilix-express';
import { BaseController } from '../common/controllers/base.controller';
import { UserCreateDto } from '../dtos/user.dto';
import { UserService } from '../services/user.service';

@route('/user')
export default class UserController extends BaseController {
    constructor(private UserService: UserService) {
        super();
    }

    @GET()
    public async all(req: Request, res: Response) {
        try {
            res.send(
                await this.UserService.all()
            );
        } catch (error) {
            this.handleException(error, res);
        }
    }


    @route('/authenticate')
    @POST()
    async index(req: Request, res: Response) {
        try {
            const result = await this.UserService.authenticate(
                req.body.email, req.body.password
            );

            res.send(result);
        } catch (error) {
            this.handleException(error, res);
        }
    }

    @route('/create')
    @POST()
    async create(req: Request, res: Response) {
        try {
            await this.UserService.create({
                email: req.body.email,
                password: req.body.password
            } as UserCreateDto);

            res.status(204);
            res.send();
        } catch (error) {
            this.handleException(error, res);
        }
    }
}