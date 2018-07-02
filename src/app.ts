import * as express from 'express'
import * as bodyParser from 'body-parser';
import { getUsersCtrl, getUserCtrl, createUserCtrl, updateUserCtrl, deleteUserCtrl } from './users/user.controller';

class App {
  public express

  constructor() {
    this.express = express();
    this.express.use(bodyParser.urlencoded({ extended: false }))
    this.express.use(bodyParser.json())
    this.mountRoutes();
  }

  private mountRoutes(): void {
    const router = express.Router();
    router.get('/api/users', getUsersCtrl);
    router.get('/api/users/:id', getUserCtrl);
    router.post('/api/users', createUserCtrl);
    router.put('/api/users/:id', updateUserCtrl);
    router.delete('/api/users/:id', deleteUserCtrl);
    this.express.use('/', router);
  }
}

export default new App().express