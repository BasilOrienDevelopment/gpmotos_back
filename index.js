import { config } from "dotenv";
import express from "express";
import { sequelize } from "./src/config/database.js";
import passport from "passport";
import session from "express-session";
import localStrategy from "./src/config/passport.js";
import { User } from "./src/config/database.js";
import router from "./src/routes/router.js";


config({ path: "./.env" })
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: "fd09e7a770a2429bcf1a4aebe02ff8a0a77604b5bde132a7bea6f4a23929dc2c",
    saveUninitialized: true,
    resave: true
}))

app.use(passport.initialize())
app.use(passport.session())

passport.use(localStrategy)

passport.serializeUser(function (user, done) {
    done(null, user.id)
})

passport.deserializeUser(function (id, done) {
    User.findByPk(id)
        .then(user => {
            done(null, user)
        })
        .catch(error => {
            done(error)
        })
})


//router

app.use("/", router)


//iniciar servidor
const PORT = process.env.PORT || 3002

sequelize.sync({ force: true }).then(function () {
    console.log("Base de datos inicializada.")
    app.listen(PORT, console.log(`Server running on port ${PORT}`))
})