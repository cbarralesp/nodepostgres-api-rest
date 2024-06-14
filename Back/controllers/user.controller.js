import bcryptjs from 'bcryptjs';
import { UserModel } from "../models/user.model.js";

// /api/v1/users/register  ruta para el registro
const register = async (req, res) => {
    try {
        console.log(req.body);
        const { username, email, password } = req.body;

        // Validaciones
        if (!username || !email || !password) {
            return res.status(400).json({ ok: false, msg: "Falla en requerir los campos de usuario, email, password" });
        }

        const user = await UserModel.findOneByEmail(email);
        if (user) {
            return res.status(409).json({ ok: false, msg: "El email ya existe" });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Crear usuario
        const newUser = await UserModel.create(email, hashedPassword, username);
    
        return res.status(201).json({ ok: true, msg: newUser });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error del servidor'
        });
    }
};

// /api/v1/users/login   ruta para el login
const login = async (req, res) => {
    try {
        // Implementa la lógica de inicio de sesión aquí
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error del servidor'
        });
    }
}

export const UserController = { register, login };
