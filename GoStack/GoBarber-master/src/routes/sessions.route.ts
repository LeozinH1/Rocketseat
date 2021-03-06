import { Router } from 'express'

import AuthenticateUserService from '../services/AuthenticateUserService'

const sessionsRoute = Router()

sessionsRoute.post('/', async (request, response) => {
    const { email, password } = request.body

    const authenticateUser = new AuthenticateUserService()

    const { user, token } = await authenticateUser.execute({
        email,
        password,
    })

    const userWithoutPassword = {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        created_at: user.created_at,
        updated_at: user.updated_at,
    }

    return response.json({ user: userWithoutPassword, token })
})

export default sessionsRoute
