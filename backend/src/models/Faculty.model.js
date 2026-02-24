import mongoose from 'mongoose'

const FacultySchema=new mongoose.Schema({
    facultyName:{
        type:String,
    },
    designation:{
        type:String,
    },
    qualification:{
        type:String,
    },
    totalExperience:{
        type:Number,
    },
    imageUrl:{
        type:String,
    },
    email:{
        type:String,
    },
    phoneNumber:{
        type:String,
    },
    department:{
        type:String,
        enum:['CSE','ECE','MECH','CIVIL','EEE','IT'],
    }
})


const Faculty=mongoose.model('faculty',FacultySchema)
export default Faculty