import Building from '../models/Building.model.js';

export const addBuilding = async (req, res) => {
  try {
    const {
      name,
      code,
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


    if (!name || !type || !coordinates || !coordinates.x || !coordinates.y) {
      return res.status(400).json({ message: 'Name, type, and coordinates (x,y) are required' });
    }

    const newBuilding = new Building({
      name,
      code,
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


export const getAllBuildings=async(req,res)=>{
  try{
    const buildings=await Building.find();
    res.status(200).json(buildings);
  }catch(err){
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

export const getBuildingById=async(req,res)=>{
  try{
    const building=await Building.findById(req.params.id);
    if(!building){
      return res.status(404).json({ message: 'Building not found' });
    }
    res.status(200).json(building);
  }catch(err){
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}