import mongoose from "mongoose";

const conversationModel = new mongoose.Schema({
    participants:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    messages:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Message"
        }
    ],
    lastMessage:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    }
},{
    timestamps:true
});


conversationModel.pre('save', function (next) {
    this.lastMessage = this.messages.length ? this.messages[this.messages.length - 1] : null;
    next();
});


export const Conversation = mongoose.model("Conversation", conversationModel);