import {UserModel} from "../models/UserModel.js";

export const register = async (req, res) => {
    try {
        if (!req.body) {
            res.redirect(`/`);
        }
        let { login, psw1, psw2, email } = req.body;

        // Nahuya? Vopros huli
        if (psw1 !== psw2) {
            throw "password is similar"
        }

        const doc = new UserModel(login, psw1, email)
        doc.save()

        console.log(doc)
        // TODO: Render main page
        res.render('html/login_page.html')

    } catch (e) {
        res.status(400).json({
            message: `Registration error: ${e}`
        })
    }


}