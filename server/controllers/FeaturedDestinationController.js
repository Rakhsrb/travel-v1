const FeaturedDestination = require("../models/FeaturedDestination");

// Получить все рекомендованные направления
const getAllFeaturedDestinations = async (req, res) => {
  try {
    const allFeaturedDestinations = await FeaturedDestination.find();
    res.status(200).json({ data: allFeaturedDestinations }); // Отправить найденные рекомендованные направления
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message }); // Отправить сообщение об ошибке сервера
  }
};

// Получить одно рекомендованное направление по ID
const getOneFeaturedDestination = async (req, res) => {
  try {
    const featuredDestination = await FeaturedDestination.findById(
      req.params.id
    );
    if (!featuredDestination) {
      return res
        .status(404)
        .json({ message: "Featured Destination Not Found!" }); // Отправить сообщение об отсутствии рекомендованного направления
    }
    res.status(200).json({ data: featuredDestination }); // Отправить найденное рекомендованное направление
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message }); // Отправить сообщение об ошибке сервера
  }
};

// Создать новое рекомендованное направление
const createFeaturedDestination = async (req, res) => {
  try {
    const newFeaturedDestination = new FeaturedDestination(req.body);
    await newFeaturedDestination.save();
    res.status(201).json({ data: newFeaturedDestination }); // Отправить созданное рекомендованное направление
  } catch (error) {
    res.status(400).json({
      message: "Failed to create Featured Destination",
      error: error.message,
    }); // Отправить сообщение об ошибке при создании
  }
};

// Обновить существующее рекомендованное направление по ID
const updateFeaturedDestination = async (req, res) => {
  try {
    const updatedFeaturedDestination =
      await FeaturedDestination.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
    if (!updatedFeaturedDestination) {
      return res
        .status(404)
        .json({ message: "Featured Destination Not Found!" }); // Отправить сообщение об отсутствии рекомендованного направления для обновления
    }
    res.status(200).json({ data: updatedFeaturedDestination }); // Отправить обновленное рекомендованное направление
  } catch (error) {
    res.status(400).json({
      message: "Failed to update Featured Destination",
      error: error.message,
    }); // Отправить сообщение об ошибке при обновлении
  }
};

// Удалить рекомендованное направление по ID
const deleteFeaturedDestination = async (req, res) => {
  try {
    const deletedFeaturedDestination =
      await FeaturedDestination.findByIdAndDelete(req.params.id);
    if (!deletedFeaturedDestination) {
      return res
        .status(404)
        .json({ message: "Featured Destination Not Found!" }); // Отправить сообщение об отсутствии рекомендованного направления для удаления
    }
    res
      .status(200)
      .json({ message: "Featured Destination Deleted Successfully" }); // Отправить сообщение об успешном удалении
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message }); // Отправить сообщение об ошибке сервера
  }
};

module.exports = {
  getAllFeaturedDestinations,
  getOneFeaturedDestination,
  createFeaturedDestination,
  updateFeaturedDestination,
  deleteFeaturedDestination,
};
