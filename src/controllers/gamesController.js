import { db } from "../database/database.js";

export const getGames = async (req, res) => {
  try {
    const games = await db.query("SELECT * FROM games");
    res.status(200).send(games.rows);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const newGames = async (req, res) => {
  const { name, image, stockTotal, pricePerDay } = req.body;
  console.log(name, image, stockTotal, pricePerDay);
  try {
    const games = await db.query(`INSERT INTO games (name,image,"stockTotal","pricePerDay") VALUES ($1, $2, $3, $4)`, [
      name,
      image,
      stockTotal,
      pricePerDay
    ]);
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err);
  }
};
