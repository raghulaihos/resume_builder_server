const search = (req,res,next) => {
    res.status(200).json({ res:'server is up!'});
}

const welcome = (req,res,next) => {
    res.status(200).json({ res:'Hey there, welcome to resume builder!'});
}

module.exports = {search, welcome};