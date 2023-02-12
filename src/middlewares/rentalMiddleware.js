import { db } from "../database/database.js";
import dayjs from "dayjs";

export const newRentalMiddleware = async (req, res, next) => {
  const { customerId, gameId } = req.body;
  try {
    const { rowCount: gameCount } = await db.query(
      `SELECT * FROM games WHERE id = $1`,
      [gameId]
    );

    if (gameCount === 0) return res.sendStatus(400);

    const { rowCount: customerCount } = await db.query(
      `SELECT * FROM customers WHERE id = $1`,
      [customerId]
    );

    if (customerCount === 0) return res.sendStatus(400);

    const game = await db.query(
      `SELECT "stockTotal", COUNT(rentals.id) as "rented" FROM games
       LEFT JOIN rentals ON games.id = rentals."gameId"
       WHERE games.id = $1
       GROUP BY games.id`,
      [gameId]
    );

    if (!game.rows[0] || game.rows[0].stockTotal <= game.rows[0].rented) return res.sendStatus(400);

    next();
  } catch (err) {
    res.status(500).send(err);
  }
};

export const rentalFinishedMiddleware = async (req, res, next) => {
  const { id } = req.params;
  try {
    const { rows: rentals } = await db.query(
      `
    SELECT rentals.*, games."pricePerDay"
    FROM rentals
    JOIN games ON rentals."gameId" = games.id
    WHERE rentals.id = $1
    `,
      [id]
    );

    if (rentals.length === 0) return res.sendStatus(404);

    if (rentals[0].returnDate !== null) return res.sendStatus(400);

    res.locals.daysRented = rentals[0].daysRented;
    res.locals.rentDate = dayjs(rentals[0].rentDate).format("YYYY-MM-DD");
    res.locals.pricePerDay = rentals[0].pricePerDay;

    next();
  } catch (err) {
    res.status(500).send(err);
  }
};
