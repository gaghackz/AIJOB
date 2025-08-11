import express from "express";
import { Request, Response } from "express";
import { userRouter } from "./routes/userAuth";
import { roleRouter } from "./routes/roleQuestion";

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send({
    meow: "HI SIR",
  });
});

app.use("/api/v1", userRouter);
app.use("/api/v1", roleRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
