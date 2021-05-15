import express from 'express';
import bodyParser from 'body-parser';

const router = express.Router();

router.get("/:id", (req,res)=>{
    res.status(200).json(req.params.id);
})

export default router;