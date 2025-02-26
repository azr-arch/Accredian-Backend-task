import express from "express";
import referralRouter from "./routes/referral.route";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

// To parse form data
app.use(express.urlencoded({ extended: true }));

app.get("/", (_, res) => {
    res.send({ ping: "pong" });
});

app.use("/api/referrals", referralRouter);

app.listen(8080, () => {
    console.log("server is listening on 8080");
});
