
import { asyncHandlers } from "../../utills/asyncHandler";
import { apiError } from "../../utills/apiErrorHandler";
import { apiResponseHandler } from "../../utills/apiresponseHandler";
import { db } from "../../libs/db";



export const isAdmin = asyncHandlers(async (req, res, next) => {
    try {
      const userId = req.user.id;
  
      const user = await db.user.findUnique({
        where: { id: userId },
        select: { role: true },
      });
  
      if (!user || user.role !== "ADMIN") {
        return res.status(403).json(
          new apiError(403, "Forbidden - You don't have permission to access this resource")
        );
      }
  
      next();
    } catch (error) {
        console.log("ye error isAdmin route ki hai");
        
      return res.status(500).json(new apiError(500, "Server Error"));
    }
  });
  