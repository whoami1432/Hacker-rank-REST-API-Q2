const Posts = require('../models/posts');

const create = async (req, res) => {
    const { title, author, timestamp, isPublished} = req.body;
    if(isPublished){
        const { dataValues } = await Posts.create({title, author, timestamp, publishedDate: Date.now(), isPublished});
        return res.status(201).send(dataValues);
    } else {
        const { dataValues } = await Posts.create({title, author, timestamp, isPublished});
        return res.status(201).send(dataValues);
    }
}

const get = async (req, res) => {

    const { author, isPublished} = req.query;
    if((!author && !isPublished)){
        const dataValues = await Posts.findAll();
        return res.status(200).send(dataValues);
    } else if(author && isPublished) {
        if (isPublished == 'true') {
            const dataValues = await Posts.findAll({where: {isPublished: true, author: author}});
            return res.status(200).send(dataValues);
        } else if(isPublished == 'false') {
            const dataValues = await Posts.findAll({where: {isPublished: false, author: author}});
            return res.status(200).send(dataValues);
        } else {
             const dataValues = await Posts.findAll({where: { author: +author}});
            return res.status(200).send(dataValues);
        }
    } else if(author) {
        const dataValues = await Posts.findAll({where: { author: author}});
        return res.status(200).send(dataValues);
    } else if(isPublished) {
        if (+isPublished === 1 || +isPublished === 0) {
            const dataValues  = await Posts.findAll({where: {isPublished: isPublished}});
            return res.status(200).send(dataValues);
        } else {
            const dataValues = await Posts.findAll();
            return res.status(200).send(dataValues);
        }
    }
}

const common = async (req, res) => {
  return res.status(405).send();  
}

const getid = async (req, res) => {
    const { id } = req.params;
    const dataValues = await Posts.findAll({where: {id: id}});
    if (dataValues.length > 0) {
        return res.status(200).send(...dataValues);
    } 
    return res.status(404).send('ID not found');   
}

module.exports = {create, get, common, getid}