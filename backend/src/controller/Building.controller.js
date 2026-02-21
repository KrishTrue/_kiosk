import Building from '../models/Building.model.js';

export const addBuilding = async (req, res) => {
  try {
    const {
      name,
      type,
      description,
      coordinates,
      totalFloors,
      isAccessible,
      hasLift,
      rooms,
      departments,
      openTime,
      closeTime,
      isOpenWeekends,
      contactNumber,
      contactEmail,
      imageUrl,
    } = req.body;

    // Basic validation
    if (!name || !type || !coordinates || !coordinates.x || !coordinates.y) {
      return res.status(400).json({ message: 'Name, type, and coordinates (x,y) are required' });
    }

    const newBuilding = new Building({
      name,
      type,
      description,
      coordinates,
      totalFloors,
      isAccessible,
      hasLift,
      rooms,
      departments,
      openTime,
      closeTime,
      isOpenWeekends,
      contactNumber,
      contactEmail,
      imageUrl,
    });

    const savedBuilding = await newBuilding.save();
    res.status(201).json(savedBuilding);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
