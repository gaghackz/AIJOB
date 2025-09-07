import Router from "express";
import { questionsGenerator,responseEval } from "../controllers/prepareAnswerQuestions";
import { roleSelect } from "../controllers/roleSelect";

export const roleRouter = Router();

roleRouter.post("/generate-question", questionsGenerator);
roleRouter.post("/evaluate",responseEval);
roleRouter.post("/role-select", roleSelect);
