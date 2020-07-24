const knex = require("../database/knex");

module.exports = {
  async index(req, res, next) {
    try {
      const connectDB = await knex.connect();

      const allSlots = await connectDB("slots");
      return res.json(allSlots);
    } catch (error) {
        next(error);
    }
  },

  async view(req, res, next) {
    try {
      const connectDB = await knex.connect();

      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "Missing Slot ID" });
      }

      const slotFromDB = await connectDB("slots").where({ id: id }).first();

      if (!slotFromDB) return res.status(400).json({ message: "No Slot Found" });

      return res.status(200).json({ slot : slotFromDB });

    } catch (error) {
        next(error);
    }
  },

  async create(req, res, next) {
    try {
      const connectDB = await knex.connect();

      const { startTime, duration, maxCapacity, monday, tuesday, wednesday, thursday, friday, saturday, sunday } = req.body;

      if (!startTime || !duration || !maxCapacity) {
        return res.status(400).json({ message: "Missing Required Information from Request" });
      }

      const slotFromDB = await connectDB("slots").where({ start_time: startTime }).first();

      if(slotFromDB) return res.status(400).json({ message: "Slot already exists" });

      const newSlot = await connectDB('slots').insert({
        start_time: startTime,
        duration: duration,
        max_capacity: maxCapacity,
        monday: monday,
        tuesday: tuesday,
        wednesday: wednesday,
        thursday: thursday,
        friday: friday,
        saturday: saturday,
        sunday: sunday
      });

      return res.status(201).json({ message: "Slot Created Successfully" });

    } catch (error) {
        next(error);
    }
  },

  async update(req, res, next) {
    try {
      const connectDB = await knex.connect();

      const { id, startTime, duration, maxCapacity, monday, tuesday, wednesday, thursday, friday, saturday, sunday } = req.body;

      if (!id || !startTime || !duration || !maxCapacity) {
        return res.status(400).json({ message: "Missing Required Information from Request" });
      }

      const slotFromDB = await connectDB("slots").where({ id: id }).first();

      if(!slotFromDB) return res.status(400).json({ message: "No Slot Found" });

      const updatedSlot = await connectDB('slots').where({ id: id }).update({
        start_time: startTime,
        duration: duration,
        max_capacity: maxCapacity,
        monday: monday,
        tuesday: tuesday,
        wednesday: wednesday,
        thursday: thursday,
        friday: friday,
        saturday: saturday,
        sunday: sunday
      });

      return res.status(200).json({ message: 'Slot updated successfully'});

    } catch (error) {
        next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const connectDB = await knex.connect();

      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ message: "Missing Required Information from Request" });
      }

      const slotFromDB = await connectDB("slots").where({ id: id }).first();

      if(!slotFromDB) return res.status(400).json({ message: "No Slot Found" });

      const deletedSlot = await connectDB('slots').where({ id: id}).del();

      return res.status(200).json({ message: 'Slot deleted successfully' });

    } catch (error) {
        next(error);
    }
  },
};