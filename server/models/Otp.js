import mongoose, { Schema } from "mongoose";

const otpSchema = new mongoose.Schema(
{
    email:String,
    otpHash:String,
    expiresAt:{type:Date,required:true},
     verified: Boolean
}
)

const Otp = mongoose.model("Otp",otpSchema);
export default Otp;