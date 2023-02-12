import { db } from "../database/database.js";
import dayjs from "dayjs";

export const getRentals = async (req, res) => {
  try {
    const rentals = await db.query(`
    SELECT rentals.*,
    json_build_object('id', customers.id, 'name', customers.name) AS customer,
    json_build_object('id', games.id, 'name', games.name) AS game
    FROM rentals
    JOIN games ON rentals."gameId" = games.id
    JOIN customers ON rentals."customerId" = customers.id
    `);
    res.status(200).send(rentals.rows);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const newRental = async (req, res) => {
  const { customerId, gameId, daysRented } = req.body;
  const rentDate = dayjs().format("YYYY-MM-DD");
  const returnDate = null;
  const delayFee = null;
  try {
    await db.query(
      `
    INSERT INTO rentals
      ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
    VALUES
      ($1, $2, $3::date, $4, $5, $4 * (SELECT games."pricePerDay" as "originalPrice" FROM games WHERE games.id = $2) ,$6)
    `,
      [customerId, gameId, rentDate, daysRented, returnDate, delayFee]
    );

    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const rentalFinished = async (req, res) => {
  const { id } = req.params;
  const { daysRented, rentDate, pricePerDay } = res.locals;
  const returnDate = dayjs().format("YYYY-MM-DD");
  let delayFee = 0;

  try {
    const daysDelay = dayjs().diff(rentDate, "day");

    if (daysDelay > daysRented) delayFee = daysDelay - daysRented;

    await db.query(
      `
    UPDATE rentals SET
    "returnDate" = $1,
    "delayFee" = $2
    WHERE id = $3
    `,
      [returnDate, delayFee * pricePerDay, id]
    );

    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const deleteRental = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows: rentals } = await db.query(`SELECT * FROM rentals WHERE rentals.id = $1`, [id]);

    if (rentals.length === 0) return res.sendStatus(404);

    if (rentals[0].returnDate === null) return res.sendStatus(400);

    await db.query(`DELETE FROM rentals WHERE id = $1`, [id]);

    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err);
  }
};
