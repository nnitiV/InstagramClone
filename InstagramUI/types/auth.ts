export type RegisterUser = {
    email: string,
    username: string,
    name: string,
    password: string,
    confirmPassword: string
    dateOfBirth: string
};

export type TokenPayload = {
    sub: string;
    name: string;
    exp: number;
    iss: string;
    aud: string;
};