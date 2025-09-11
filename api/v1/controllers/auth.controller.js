import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const usuarios = [];
export const login = (req,res) =>{
    const {password, username} = req.body;

    const user = usuarios.find(u => u.username === username);
    if(!user){
        return res.status(401).json({error: 'Usuario y/o contraseña incorrectos.'});
    }

    const valida= bcrypt.compareSync(password, user.password);
    if(!valida){
        return res.status(401).json({error: 'Usuario y/o contraseña incorrectos.'});
    }
    const token = jwt.sign({username: username}, process.env.JWT_SECRET, {expiresIn: '1d'});
    res.status(200).json({message: 'Usuario ingresado con éxito',token});
}


export const register = (req,res) =>{
    const { username, password, email } = req.body; 
    const user = usuarios.find(u => u.username === username)

    if(user)
    {
        return res.status(409).json({error: 'Nombre de usuario existente.'});
    }
    const hash = bcrypt.hashSync(password, 10);
    usuarios.push({ username, password: hash, email });
    const token = jwt.sign({username: username}, process.env.JWT_SECRET, {expiresIn :'1d'});
    res.status(201).json({message: 'Usuario registrado con éxito',token})
}

