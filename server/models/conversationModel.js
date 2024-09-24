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
    if (this.messages.length > 0) {
        this.lastMessage = this.messages[this.messages.length - 1];
    }
    next();
});


export const Conversation = mongoose.model("Conversation", conversationModel);