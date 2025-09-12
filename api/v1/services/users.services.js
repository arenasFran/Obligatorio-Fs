import User from "../ModelsDB/user.model.js"

export const saveUserService= async (newUser)=>{

    const user = new User(newUser) 
    await user.save();
    return user;
}