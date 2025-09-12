import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { saveUserService } from '../services/users.services.js';
import Plan from '../ModelsDB/plan.model.js';
import User from '../ModelsDB/user.model.js';

export const login = async (req,res) =>{
    const {password, username} = req.body;
    const user = await User.findOne({username}).populate('plan')
   
    if(!user){
        return res.status(401).json({error: 'Usuario y/o contraseña incorrectos.'});
    }

    const valida= bcrypt.compareSync(password, user.password);
    if(!valida){
        return res.status(401).json({error: 'Usuario y/o contraseña incorrectos.'});
    }
    const token = jwt.sign({username: username, id:user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
    res.status(200).json({message: 'Usuario ingresado con éxito',token, plan:user.plan});
}


export const register = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    
    const existingUser = await User.findOne({username})

    if(existingUser)
    {
         return res.status(409).json({ error: 'Nombre de usuario existente.' });
    }

    const defaultPlan = await Plan.findOne({ name: "plus" });
    const hash = bcrypt.hashSync(password, 10);
    
    const data = {
      username,
      password: hash,
      email,
      plan: defaultPlan._id
    };

    const newUser = await saveUserService(data);
    const token = jwt.sign({ username: newUser.username, id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(201).json({message: "Usuario registrado con éxito", user:{id: newUser._id, username: newUser.username,email: newUser.email, plan:defaultPlan.name},token});

    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al registrar usuario." });
  }
};
