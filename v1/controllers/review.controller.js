import {
  createReviewService,
  getBookReviewsService,
  getUserReviewsService,
  updateReviewService,
  deleteReviewService
} from '../services/review.services.js';
import LibraryItem from "../models/libraryItem.model.js";

export const createReview = async (req,res) =>{
    try{
        const review = await createReviewService(req.user._id, req.body);
        res.status(201).json({message: 'Review creada correctamente'})
    }catch (error){
        const status = error.status || 500;
        res.status(status).json({error: error.message})
    }
}




export const getBookReviews = async (req, res) => {
  try {
    const { originalBookId } = req.params;

    if (!originalBookId) {
      return res.status(400).json({ error: "Falta el ID del libro" });
    }

    const bookExists = await LibraryItem.findOne({ originalBookId });
    if (!bookExists) {
      return res.status(404).json({ error: "El libro no existe en la biblioteca" });
    }

    const reviews = await getBookReviewsService(originalBookId);

    if (reviews.length === 0) {
      return res.status(404).json({ error: "Este libro no tiene reseñas aún" });
    }

    res.status(200).json({ reviews, count: reviews.length });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ error: error.message });
  }
};




export const getUserReviews = async (req,res) =>{
    try{
        const reviews = await getUserReviewsService(req.user._id);
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
        const updatedReview = await updateReviewService(id, req.user._id, req.body);
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
        await deleteReviewService(id, req.user._id);
        res.status(204).send(); 
    }
    catch(error) 
    {
      const status = error.status || 500;
      res.status(status).json({ error: error.message }); 
    }
}