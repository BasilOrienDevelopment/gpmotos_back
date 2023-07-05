import { Router } from "express";
import { User, UserData } from "../config/database.js";
import { body, validationResult } from "express-validator";
import passport from "passport";

const validateRegistrationData = [
    body('name').notEmpty().withMessage('El nombre es requerido'),
    body('username').notEmpty().withMessage('El nombre de usuario es requerido'),
    body('email').notEmpty().withMessage('El correo electrónico es requerido').isEmail().withMessage('El correo electrónico no es válido'),
    body('password').notEmpty().withMessage('La contraseña es requerida'),
];

const validateLoginData = [
    body('email').notEmpty().withMessage('El correo electrónico es requerido').isEmail().withMessage('El correo electrónico no es válido'),
    body('password').notEmpty().withMessage('La contraseña es requerida'),
];

const authController = Router()

authController.post("/login", validateLoginData, function (req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    return next()
}, passport.authenticate('local', {
    successRedirect: "/auth/session",
    failureRedirect: "/auth/session"
}))

authController.post("/register", validateRegistrationData, async function (req, res) {
    if (req.isAuthenticated()) {
        return res.json("Ya iniciaste sesion.")
    }
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        // Obtener los datos del formulario de registro
        const { name, username, email, password } = req.body;

        // Verificar si el usuario ya existe en la base de datos
        const existingUser = await User.findOne({
            where: {
                email: email,
            },
        });

        if (existingUser) {
            return res.status(400).json({ error: 'El usuario ya está registrado' });
        }

        // Crear un nuevo usuario en la tabla "User"
        const newUser = await User.create({
            name,
            username,
            email,
            password,
        });

        // Crear los datos adicionales del usuario en la tabla "UserData"
        await UserData.create({
            UserId: newUser.id, // Asociar los datos al usuario recién creado
            verified: false,
            verifyCode: null, // Generar un código de verificación
            cart: {},
        });

        res.status(200).json({ message: 'Registro exitoso' });
    } catch (error) {
        console.error('Error en el registro de usuario:', error);
        res.status(500).json({ error: 'Error en el registro de usuario' });
    }
});

authController.get("/session", function (req, res) {
    if (req.isAuthenticated()) {
        return res.json(true)
    } else {
        return res.json(false)
    }
})

authController.post("/logout", function (req, res) {
    req.logout((err) => {
        if (err) {
            console.error('Error en el logout:', err);
            return res.status(500).json({ error: 'Error en el logout' });
        }


        res.status(200).json({ message: 'Cerraste sesion' });
    });
})

export default authController