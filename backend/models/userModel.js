import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name:{type:String,required:true,match: [
        /^[A-Za-z\s]+$/,
        "Full name should contain only letters and spaces"],},
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(value) {
                // Email regex pattern for basic validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                // Check if email matches regex and local part (before @) is not only numbers
                if (!emailRegex.test(value)) {
                    return false;
                }
                const localPart = value.split('@')[0];
                return !/^\d+$/.test(localPart);
            },
            message: props => `${props.value} is not a valid email or local part contains only numbers`
        }
    },
    password:{type:String,required:true},
    cartData:{type:Object,default:{}}
},{minimize:false})

const userModel = mongoose.models.user || mongoose.model("user",userSchema);
export default userModel;