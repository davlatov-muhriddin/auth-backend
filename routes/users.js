import { Router } from "express";
import User from "../modles/User.js";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    console.log(firstName, lastName, email, password);

    if (!firstName || !lastName || !email || !password) {
      res.json({ message: "iltimos barcha inputlarni to'ldiring" });
      return;
    }

    const user = await User.create({ firstName, lastName, email, password });
    const token = jwt.sign({ user }, "secret", { expiresIn: "1h" });
    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({ message: "success", token, user });
  } catch (error) {
    console.log(error);
  }
});

export default router;
