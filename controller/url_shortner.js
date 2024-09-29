require("dotenv").config();
const shortner = require("node-url-shortener");
const shortid = require("shortid");
const Url = require("../models/url");
const { Op } = require("sequelize");
const url_shortener = async (req, res) => {
    const { originalUrl } = req.body;
    const baseUrl = process.env.BASE_URL;

    if (!originalUrl) {
        return res.status(400).json("Please enter a URL");
    }

    try {
        let url = await Url.findOne({ where: { originalUrl } });
        console.log("hi");
        if (url) {
            res.json(url.shortUrl);
        } else {
            const shortUrl = `${baseUrl}/${shortid.generate()}`; // Generate short URL
            url = await Url.create({ originalUrl, shortUrl });
            res.status(200).send(url);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json("Server error");
    }
};

const redirect_url = async (req, res) => {
    try {
        const shortUrl = `${process.env.BASE_URL}/${req.params.shortUrl}`;
        const url = await Url.findOne({ where: { shortUrl } });

        if (url) {
            console.log(url.originalUrl);
            return res.json(url.originalUrl);
        } else {
            return res.status(404).json("URL not found");
        }
    } catch (err) {
        console.error(err);
        res.status(500).json("Server error");
    }
};

const getUrls = async (req, res) => {
    try {
        const { count, rows } = await Url.findAndCountAll({
            where: {
                shortUrl: {
                    [Op.like]: "%short%",
                },
            },
            offset: 0,
            limit: 2,
        });
        console.log(count);
        console.log(rows);

        res.status(200).send({ count, rows });
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    url_shortener,
    redirect_url,
    getUrls,
};
