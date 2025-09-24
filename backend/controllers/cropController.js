import { asyncHandler } from '../middleware/asyncHandler.js';
import Crop from '../models/Crop.js';

// @desc    Get all crops
// @route   GET /api/crops
// @access  Public
const getCrops = asyncHandler(async (req, res) => {
  const crops = await Crop.find().populate('farmer', 'name email');
  res.json({
    success: true,
    count: crops.length,
    data: crops
  });
});

// @desc    Get single crop
// @route   GET /api/crops/:id
// @access  Public
const getCrop = asyncHandler(async (req, res) => {
  const crop = await Crop.findById(req.params.id).populate('farmer', 'name email phone');

  if (!crop) {
    return res.status(404).json({
      success: false,
      message: 'Crop not found'
    });
  }

  res.json({
    success: true,
    data: crop
  });
});

// @desc    Create new crop
// @route   POST /api/crops
// @access  Private
const createCrop = asyncHandler(async (req, res) => {
  // Add farmer to req.body
  req.body.farmer = req.user.id;

  const crop = await Crop.create(req.body);

  res.status(201).json({
    success: true,
    data: crop
  });
});

// @desc    Update crop
// @route   PUT /api/crops/:id
// @access  Private
const updateCrop = asyncHandler(async (req, res) => {
  let crop = await Crop.findById(req.params.id);

  if (!crop) {
    return res.status(404).json({
      success: false,
      message: 'Crop not found'
    });
  }

  // Make sure user owns the crop
  if (crop.farmer.toString() !== req.user.id) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to update this crop'
    });
  }

  crop = await Crop.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.json({
    success: true,
    data: crop
  });
});

// @desc    Delete crop
// @route   DELETE /api/crops/:id
// @access  Private
const deleteCrop = asyncHandler(async (req, res) => {
  const crop = await Crop.findById(req.params.id);

  if (!crop) {
    return res.status(404).json({
      success: false,
      message: 'Crop not found'
    });
  }

  // Make sure user owns the crop
  if (crop.farmer.toString() !== req.user.id) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to delete this crop'
    });
  }

  await crop.deleteOne();

  res.json({
    success: true,
    data: {}
  });
});

export {
  getCrops,
  getCrop,
  createCrop,
  updateCrop,
  deleteCrop
};
