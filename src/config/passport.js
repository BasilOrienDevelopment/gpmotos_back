import LocalStrategy from 'passport-local';
import bcrypt from 'bcrypt';
import { User } from './database.js';

const localStrategy = new LocalStrategy.Strategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    async (email, password, done) => {
        try {
            const user = await User.findOne({ where: { email } });

            if (!user || !bcrypt.compareSync(password, user.password)) {
                return done(null, false, { message: 'Credenciales inválidas' });
            }

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
);

export default localStrategy;
