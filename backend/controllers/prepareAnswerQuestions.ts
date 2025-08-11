import { GoogleGenAI } from "@google/genai";
import { Request, Response } from "express";
import fs from "fs";
import path from "path";

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API });

export async function questionsGenerator(req: Request, res: Response) {
  const filePath = path.join(__dirname, `../prompts/${req.body.role}.txt`);
  const promptText = fs.readFileSync(filePath, "utf-8");
  try {
    const resp: any = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: promptText,
    });
    console.log(resp);
    return res.json({
      questions: resp.candidates[0].content.parts[0],
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: err,
    });
  }
}

export async function responseEval(req: Request, res: Response) {
  const body = req.body;

  try {
    const evaluated: any = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `THIS IS THE QUESTION ${body.question} EVALUATE THE ANSWER PROPERLY AND GIVE FEEDBACK ${body.response}`,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err,
    });
  }
}
