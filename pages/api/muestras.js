const { connectToDatabase } = require('../../lib/mongodb');
const ObjectId = require('mongodb').ObjectId;

export default async function handler(req, res) {
    // switch the methods
    switch (req.method) {
        case 'GET': {
            return getMuestras(req, res, );
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
        
        // fetch 
        console.log("REQ:",req.headers);
        let collection = req.headers.collection
        let limit = req.headers.limit

        // En find se puede poner búsqueda por ID u otros
        let morfologiamandibulas = await db
            .collection(collection)
            .find({}).limit(Number(limit))
            .sort({ published: -1 })
            .toArray();

        // return 
        return res.json({
            message: JSON.parse(JSON.stringify(morfologiamandibulas)),
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