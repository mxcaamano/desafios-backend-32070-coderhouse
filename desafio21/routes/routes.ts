import { Router } from "../deps.ts";
import { getMain, getColor, saveColor, getColorById, deleteColorById, deleteAllColors} from "../controllers/controller.color.ts";

export const router = new Router();
router.get('/',getMain);
router.post('/color', saveColor);
router.get('/color/:id', getColorById);
router.get('/color', getColor);
router.delete('/color/:id', deleteColorById);
router.delete('/', deleteAllColors);