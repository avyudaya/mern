const requestMiddleware = (req, res, next) => {
    console.log('Method: ' + req.method);
    console.log('Path: ' + req.path);
    console.log('Body: ' + req.body);
    next();
}

const unknownEndpoint = (req, res, next) => {
    res.status(404).send({ error: 'unknown endpoint' });
}

const errorHandlerMiddleware = (error, req, res, next) => {
    console.log(error.name);

    if(error.name === 'CastError'){
        return res.status(400).send({error: 'malformatted id'});
    } else if (error.name === 'ValidationError'){
        return res.status(400).send({error: error.message});
    }

    return res.status(400).send({error: 'please try again.'});
}

module.exports = {
    requestMiddleware,
    unknownEndpoint,
    errorHandlerMiddleware,
}