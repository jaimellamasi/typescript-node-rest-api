import { Request, Response } from 'express'
import { User } from './user.model';

const users: User[] = [
    { id: 1, name: "Chemazo", job: "Tuitero" },
    { id: 2, name: "Rajoy", job: "Ex presidente" },
    { id: 3, name: "Jimmy", job: "Runner" },
]
export let getUsersCtrl = (req: Request, res: Response) => {
    res.json(users)
    res.status(200)
}

export let getUserCtrl = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        res.json({ error: "Requested user does not exist" })
        res.status(400)
        return;
    }
    const user = users.filter(u => u.id === id)[0]
    if (!user) {
        res.json({ error: "Requested user does not exist" })
        res.status(400)
        return;
    }
    res.json(users.filter(u => u.id === id)[0])
    res.status(200)
}

export let createUserCtrl = (req: Request, res: Response) => {
    const user: User = {
        id: users[users.length - 1].id + 1,
        name: req.body.name,
        job: req.body.job
    };
    users.push(user);
    res.json(user)
    res.status(200)
}

export let updateUserCtrl = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        res.json({ error: "Requested user does not exist" })
        res.status(400)
        return;
    }
    for (let user of users) {
        if (user.id == id) {
            user.name = req.body.name;
            user.job = req.body.job;
            break;
        }
    }
    res.json(users.filter(u => u.id == id)[0])
    res.status(200)
}

export let deleteUserCtrl = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        res.json({ error: "Requested user does not exist" })
        res.status(400)
        return;
    }
    const removeIndex = users.map(u => u.id).indexOf(id);
    users.splice(removeIndex, 1);
    res.status(200)
    res.json(users)
}