interface techObject {
    title: string;
    experience: number;
}

interface CreateUserData {
    name ?: string;
    email : string;
    password : string;
    techs : Array<string | techObject>
}

export default function createUser(params : CreateUserData){
    const user = {
        name : params.name,
        email : params.email,
        password: params.password,
        techs : params.techs
    }

    return user;
}