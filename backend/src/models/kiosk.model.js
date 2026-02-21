import mongoose from 'mongoose';

const kioskSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    location:{
        latitude:{
        type:Number,
        required:true
    },
    longitude:{
        type:Number,
        required:true
        }
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:'active'
    }
},{
    timestamps:true
})

const Kiosk=mongoose.model('Kiosk',kioskSchema);
export default Kiosk;