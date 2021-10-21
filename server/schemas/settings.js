var mongoose = require('mongoose');

var schema = mongoose.Schema;

var settingsSchema = new schema({
    privacypolicy: {
        type: String,
        required: [true, "privacypolicy field is missing"]
    },
    termsofuse: {
        type: String,
        required: [true, "termsofuse field is missing"]
    },
    appicon: {
        type: String,
        required: [true, "appIcon field is missing"]
    },
    applogo: {
        type: String,
        required: [true, "applogo field is missing"]
    },
    // googleId: {
    //     type: String,
    //     required: [true, "googleId required"]
    // },
    // facebookId: {
    //     type: number,
    //     required: [true, "facebookId required"]
    // },
    chatdisabled: {
        type: Boolean,
        required: [true, "paymentDisabled required"]
    },
    creditbuilder: {
        type: Boolean,
        required: [true, "creditBuilder required"]
    },
    facebooklink: {
        type: String,
        required: [true, "facebooklink required"]
    },
    instagramlink: {
        type: String,
        required: [true, "instagramlink required"]
    },
    linkedinlink: {
        type: String,
        required: [true, "linkedinlink required"]
    },
    twitterlink: {
        type: String,
        required: [true, "twitterlink required"]
    },
    youtubelink: {
        type: String,
        required: [true, "youtubeLink required"]
    },
})

var settings = mongoose.model('settings', settingsSchema, 'settings');

module.exports = settings;