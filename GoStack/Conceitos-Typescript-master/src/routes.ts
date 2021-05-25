import { Request, Response } from 'express'

import createUser from './services/CreateUser'

export function index(request: Request, response: Response){
    const user = createUser({
        email: 'leonardosj98@hotmail.com',
        name: 'Leonardo S. Jaremczuk',
        password: 'senha123',
        techs: [{
            title: 'Node.js', 
            experience: 5
        },
        {
            title: 'React', 
            experience: 5
        },
        {
            title: 'React Native', 
            experience: 5
        },
            "Typescript",
            "Javascript"
        ]
    },
    )

    return response.json(user)
}