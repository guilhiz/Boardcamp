import { db } from "../database/database.js"
import dayjs from "dayjs";

export const rentalFinishedMiddleware = async (req, res, next) => {
  const { id } = req.params;
  try {
    const { rows: rentals } = await db.query(`
    SELECT rentals.*, games."pricePerDay"
    FROM rentals
    JOIN games ON rentals."gameId" = games.id
    WHERE rentals.id = $1
    `, [id]);

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
