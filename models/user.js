const { Schema, default: mongoose } = require("mongoose");
const SALT_WORK_FACTOR = 10;
var bcrypt = require('bcrypt');
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        index: { unique: true }
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

UserSchema.pre('save', async function save(next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (err) {
        return next(err);
    }
});

UserSchema.methods.validatePassword = async function validatePassword(data) {
    const isMatch = await bcrypt.compare(data, this.password);
    return isMatch;
};

module.exports = mongoose.model('User', UserSchema);