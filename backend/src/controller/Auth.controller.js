import User from "../models/User.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const registerSuperAdmin=async(req,res)=>{
    try{
        const {userId,name,email,password}=req.body;

        const existingSuperAdmin=await User.findOne({role:'superAdmin'});
        if(existingSuperAdmin){
            return res.status(400).json({message:'Super admin already exists'});
        }

        const hashPassword=await bcrypt.hash(password,10);
        const newSuperAdmin=new User({
            userId,
            name,
            email,
            password:hashPassword,
            role:'superAdmin'
        });

        await newSuperAdmin.save();

        res.status(201).json({message:'Super admin created successfully',superAdmin:newSuperAdmin});
    }catch(err){
        res.status(500).json({message:'Error creating super admin',error:err.message});
    }
}


export const createAdmin=async(req,res)=>{
    try{
        const {userId,name,email,password}=req.body;

        if(req.user.role!=='superAdmin'){
            return res.status(403).json({message:'Only super admin can create admin'});
        }

        const hashPassword=await bcrypt.hash(password,10);

        const newAdmin=new User({
            userId,
            name,
            email,
            password:hashPassword,
            role:'admin'
        });

        await newAdmin.save();
        res.status(201).json({message:'Admin created successfully',admin:newAdmin});
    }catch(err){
        res.status(500).json({message:'Error creating admin',error:err.message});
    }
}


export const createUser=async(req,res)=>{
    try{
        const {userId,name,email,password}=req.body;

        if(req.user.role!=='admin' && req.user.role!=='superAdmin'){
            return res.status(403).json({message:'Only admin or super admin can create user'});
        }

        const hashPassword=await bcrypt.hash(password,10);

        const newUser=new User({
            userId,
            name,
            email,
            password:hashPassword,
            role:'user'
        });

        await newUser.save();
        res.status(201).json({message:'User created successfully',user:newUser});
    }catch(err){
        res.status(500).json({message:'Error creating user',error:err.message});
    }
}


export const login=async(req,res)=>{
    try{
        const {userId,password}=req.body;

        if(!userId || !password){
            return res.status(400).json({message:'User ID and password are required'});
        }

        const user=await User.findOne({userId});
        if(!user){
            return res.status(404).json({message:'User not found'});
        }

        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:'Invalid credentials'});
        }

        const token=jwt.sign({userId:user.userId,role:user.role},process.env.JWT_SECRET,{expiresIn:'1h'});

        res.cookie('token',token,{httpOnly:true});
        res.json({message:'Login successful',user:{userId:user.userId,name:user.name,email:user.email,role:user.role}});

    }catch(err){
            res.status(500).json({message:'Error logging in',error:err.message});
            console.error('Login error:', err);
    }
}