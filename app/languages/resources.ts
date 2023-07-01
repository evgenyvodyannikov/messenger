interface Resource {
    welcomeLoginMessage: string;
    name: string;
    email: string;
    password: string;
    loginButton: string;
    registerButton: string;
    socialLinks: string;
    registerStateMessage: string;
    registerStateAction: string;
    loginStateMessage: string;
    loginStateAction: string;
}

interface Resources {
    [key: string]: Resource;
}

const resources: Resources = {
    EN: {
        welcomeLoginMessage: "Sign in to your account",
        name: 'Name',
        email: 'Email address',
        password: "Password",
        loginButton: "Sign in",
        registerButton: "Register",
        socialLinks: "Or contunie with",
        registerStateMessage: "New to messenger?",
        registerStateAction: "Create an account",
        loginStateMessage: "Already have an account?",
        loginStateAction: "Login"
    },
    RU: {
        welcomeLoginMessage: "Войти в аккаунт",
        name: 'Имя',
        email: 'Эл. почта',
        password: "Пароль",
        loginButton: "Войти",
        registerButton: "Зарегистрироваться",
        socialLinks: "Войти с помощью",
        registerStateMessage: "Еще не зарегистрированы?",
        registerStateAction: "Создать аккаунт",
        loginStateMessage: "Уже зарегистрированы?",
        loginStateAction: "Войти"
    }
}

export default resources;