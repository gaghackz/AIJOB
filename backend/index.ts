import express from "express";
import { Request, Response } from "express";
import { userRouter } from "./routes/userAuth";
import { roleRouter } from "./routes/roleQuestion";
import cors from "cors";

const app = express();
app.use(express.json());
const corsOption = {
  origin: ["http://localhost:4000", "http://172.18.168.225:4000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use(cors(corsOption));

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
