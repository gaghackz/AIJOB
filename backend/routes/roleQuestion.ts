import Router from "express";
import { questionsGenerator } from "../controllers/prepareAnswerQuestions";
import { roleSelect } from "../controllers/roleSelect";

export const roleRouter = Router();

roleRouter.post("/generate-question", questionsGenerator);
roleRouter.post("/role-select", roleSelect);
