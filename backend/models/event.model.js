import mongoose from "mongoose";

const eventSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            unique:true,
            trim:true,
        },
        description:{
            type:String,
            required:true,
            trim:true,
        },
        date:{
            type:Date,
            required:true,
        },
        deadline:{
            type:Date,
        },
        coordinator:{
            type:[String],
            required:true,
            validate:v=> Array.isArray(v) && v.length > 0,
        },
        location:{
            type:String,
            required:true,
            trim:true,
        },
        maxParticipants:{
            type:Number,
            required:true,
            min:1,
        },
        participants:[
        {    
            user : {
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
            },
            name:String,
            email:String,
            registrationNumber:String,
            department:String,
            year:String,
        }    
        ],
    },{
        timestamps:true,
    }
);
const Event = mongoose.model("Event", eventSchema);
export default Event;