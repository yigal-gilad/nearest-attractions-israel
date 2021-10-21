var mongoose = require('mongoose');

var schema = mongoose.Schema;

var attractionsSchema = new schema({
    Id: {
      type: Number,
      required: [true, "field is missing"]
  },
    Name: {
      type: String,
      required: [true, "field is missing"]
  },
  //   ShortDescription: {
  //     type: String,
  //     required: [true, "field is missing"]
  // },
  //   FullDescription: {
  //     type: String,
  //     required: [true, "field is missing"]
  // },
  //   VendorId: {
  //     type: Number,
  //     required: [true, "field is missing"]
  // },
  //   Vendor_Name: {
  //     type: String,
  //     required: [true, "field is missing"]
  // },
    Product_Url: {
      type: String,
      required: [true, "field is missing"]
  },
  //   Accessibility: {
  //     type: String,
  //     required: [true, "field is missing"]
  // },
    Address: {
      type: String,
      required: [true, "field is missing"]
  },
    Attraction_Type: {
      type: String,
      required: [true, "field is missing"]
  },
  //   Blue_Flag: {
  //     type: String,
  //     required: [true, "field is missing"]
  // },
  //   City: {
  //     type: String,
  //     required: [true, "field is missing"]
  // },
  //   Diving_beach: {
  //     type: String,
  //     required: [true, "field is missing"]
  // },
  //   Email: {
  //     type: String,
  //     required: [true, "field is missing"]
  // },
  //   Notes: {
  //     type: String,
  //     required: [true, "field is missing"]
  // },
  //   Notes_for_opening_hours: {
  //     type: String,
  //     required: [true, "field is missing"]
  // },
    Opening_Hours: {
      type: String,
      required: [true, "field is missing"]
  },
  //   Parking: {
  //     type: String,
  //     required: [true, "field is missing"]
  // },
  //   Phone: {
  //     type: String,
  //     required: [true, "field is missing"]
  // },
  //   Region: {
  //     type: String,
  //     required: [true, "field is missing"]
  // },
  //   Scheduled_visits: {
  //     type: String,
  //     required: [true, "field is missing"]
  // },
  //   Suitable_for_Children: {
  //     type: String,
  //     required: [true, "field is missing"]
  // },
  //   Surfing_beach: {
  //     type: String,
  //     required: [true, "field is missing"]
  // },
  //   URL: {
  //     type: String,
  //     required: [true, "field is missing"]
  // },
  pos: {
        type: Object,
        required: [true, "field is missing"]
    },
})

var attractions = mongoose.model('attractions', attractionsSchema, 'attractions');

module.exports = attractions;