import {
  createReviewService,
  getBookReviewsService,
  getUserReviewsService,
  updateReviewService,
  deleteReviewService
} from '../services/review.services.js';


export const createReview = async (req,res) =>{
    try{
        const review = await createReviewService(req.user._id, req.body);
        res.status(201).json({message: 'Review creada correctamente'})
    }catch (error){
        const status = error.status || 500;
        res.status(status).json({error: error.message})
    }
}

export const getBookReviews = async (req,res)=>{
    try{
        const {bookId} =req.params;
        const reviews = await getBookReviewsService(bookId);
        res.status(200).json({reviews, count: reviews.length});
    }
    catch(error)
    {
        const status = error.status || 500;
        res.status(status).json({error: error.message});
    }
}


export const getUserReviews = async (req,res) =>{
    try{
        const reviews = await getUserReviewsService(req.user.id);
        res.status(200).json({reviews, count: reviews.length});
    }
    catch(error)
    {
        const status = error.status || 500;
        res.status(status).json({error:error.message})
    }
}


export const updateReview = async (req, res) =>{
    try{
        const {id} = req.params;
        const updatedReview = await updateReviewService(id, req.user.id, req.body);
        res.status(200).json({message: 'Review actualizada con éxito.'});
    }
    catch(error){
        const status = error.status || 500;
        res.status(status).json({error: error.message});
    }
}

export const deleteReview = async (req,res) =>{
    try{
        const {id} = req.params;
        await deleteReviewService(id, req.user.id);
        res.status(204).send(); 
    }
    catch(error) 
    {
      const status = error.status || 500;
      res.status(status).json({ error: error.message }); 
    }
}