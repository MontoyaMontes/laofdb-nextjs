const { connectToDatabase } = require('../../lib/mongodb');
const ObjectId = require('mongodb').ObjectId;

export default async function handler(req, res) {
    // switch the methods
    switch (req.method) {
        case 'GET': {
            return getMuestras(req, res);
        }

        case 'POST': {
            return addMuestras(req, res);
        }

        case 'PUT': {
            return updateMuestras(req, res);
        }

        case 'DELETE': {
            return deleteMuestras(req, res);
        }
    }
}

async function getMuestras(req,res){
    try {
        // connect to the database
        let { db } = await connectToDatabase();
        // fetch pesomandibulas
        let pesomandibulas = await db
            .collection('pesomandibulas')
            .find({}).limit(40)
            .sort({ published: -1 })
            .toArray();
        // return pesomandibulas
        return res.json({
            message: JSON.parse(JSON.stringify(pesomandibulas)),
            success: true,
        });
    } catch (error) {
        // return the error
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}