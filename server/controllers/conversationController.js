import { Conversation } from '../models/conversationModel.js';
import { User } from '../models/userModel.js';

export const setConversation = async (req, res) => {
    try {
        const senderId = req.id;
        const username = req.params.username;

        const user = await User.findOne({
            username
        });

        if(!user){
            return res.status(401).json({
                message: "Username is invalid!"
            })
        }

        let conversation = await Conversation.findOne({
            participants: [senderId, user._id],
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, user._id],
            });
        } else {
            return res.status(401).json({
                message: "Conversation already exists!"
            })
        }
        
        await conversation.save();

        return res.status(200).json({
            message: "Conversation is added successfully!"
        });

    } catch (error) {
        console.log(error);
    }
}