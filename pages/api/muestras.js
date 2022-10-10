const { connectToDatabase } = require('../../lib/mongodb');
const ObjectId = require('mongodb').ObjectId;

// Handler
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

async function getMuestras(req, res) {
    try {
        // connect to the database
        let { db } = await connectToDatabase();

        // fetch 
        // console.log("REQ:", req.headers);
        let collection = req.headers.collection
        let limit = req.headers.limit
        let idCodigo = req.headers.idcodigo

        let muestra

        // console.log("1", idCodigo, collection, limit, typeof idCodigo, idCodigo.length === 12)
        // En find se puede poner búsqueda por ID u otros ej: 62b6833576a1ea506e185d12
        // Se puede crear el objeto de manera dinamica, pero se deja para después 
        if (typeof idCodigo !== 'undefined' && idCodigo.length === 12 || idCodigo.length === 24) {
            muestra = await db
                .collection(collection)
                .find({ _id: ObjectId(idCodigo) }).limit(Number(limit))
                .sort({ published: -1 })
                .toArray();
        } else {
            muestra = await db
                .collection(collection)
                .find({}).limit(Number(limit))
                .sort({ published: -1 })
                .toArray();
        }

        // return JSON
        return res.json({
            message: JSON.parse(JSON.stringify(muestra)),
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

async function addMuestras(req, res) {
    let collection = req.headers.collection

    try {
        // connect to the database
        let { db } = await connectToDatabase();
        // add the post
        await db.collection(collection).insertOne(JSON.parse(req.body));
        // return a message
        return res.json({
            message: 'Muestra agregada de manera correcta',
            success: true,
        });
    } catch (error) {
        // return an error
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}