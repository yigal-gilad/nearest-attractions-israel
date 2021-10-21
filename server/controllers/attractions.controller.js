const express = require('express');
const app = express();
const attraction = require('../schemas/attraction');

// get attractions list from db and send it back to the client
exports.getAttractions = (req, res) => {
    attraction.find(req.query.category === "any" ? {
        // pos: { $geoWithin: { $centerSphere: [[parseInt(req.query.lat), parseInt(req.query.lon)], 400 / 6378.1] } }
    } : { Attraction_Type: req.query.category })
        .then(async (doc) => {
            if (!doc) return res.status(404).send("no attractions found");
            return res.status(200).send(doc);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send("something went wrong...")
        });
}
