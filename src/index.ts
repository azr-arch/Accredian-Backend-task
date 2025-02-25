import express from "express";
import referralRouter from "./routes/referral.route";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send({ ping: "pong" });
});

app.get("/api", (req, res) => {
    res.send({ api: "pong" });
});

app.use("/api/referrals", referralRouter);

app.listen(8080, () => {
    console.log("server is listening on 8080");
});
