const Blogs = require("../models/Blogs");

// Получить все блоги
const getAllBlogs = async (req, res) => {
  try {
    const allBlogs = await Blogs.find(); // Найти все блоги в базе данных
    res.status(200).json({ data: allBlogs, total: allBlogs.length }); // Ответ со всеми блогами
  } catch (error) {
    res
      .status(500)
      .json({ message: "Внутренняя ошибка сервера", error: error.message });
  }
};

// Получить один блог по ID
const getOneBlog = async (req, res) => {
  try {
    const blog = await Blogs.findById(req.params.id); // Найти блог по ID в базе данных
    if (!blog) {
      return res.status(404).json({ message: "Блог не найден!" }); // Обработка случая, когда блог не найден
    }
    res.status(200).json({ data: blog }); // Ответ с найденным блогом
  } catch (error) {
    res
      .status(500)
      .json({ message: "Внутренняя ошибка сервера", error: error.message });
  }
};

// Создать новый блог
const createNewBlog = async (req, res) => {
  try {
    const newBlog = new Blogs(req.body); // Создать новый экземпляр блога
    await newBlog.save(); // Сохранить новый блог в базе данных
    res.status(201).json({ data: newBlog }); // Ответ с созданным блогом
  } catch (error) {
    res
      .status(400)
      .json({ message: "Не удалось создать новый блог", error: error.message });
  }
};

// Обновить существующий блог по ID
const updateBlog = async (req, res) => {
  try {
    const updatedBlog = await Blogs.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Вернуть обновленный документ
      runValidators: true, // Запустить валидацию
    });
    if (!updatedBlog) {
      return res.status(404).json({ message: "Блог не найден!" }); // Обработка случая, когда блог не найден
    }
    res.status(200).json({ data: updatedBlog }); // Ответ с обновленным блогом
  } catch (error) {
    res
      .status(400)
      .json({ message: "Не удалось обновить блог", error: error.message });
  }
};

// Удалить блог по ID
const deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await Blogs.findByIdAndDelete(req.params.id); // Удалить блог по ID
    if (!deletedBlog) {
      return res.status(404).json({ message: "Блог не найден!" }); // Обработка случая, когда блог не найден
    }
    res.status(200).json({ message: "Блог успешно удален" }); // Ответ с сообщением об успешном удалении
  } catch (error) {
    res
      .status(500)
      .json({ message: "Внутренняя ошибка сервера", error: error.message });
  }
};

module.exports = {
  getAllBlogs,
  getOneBlog,
  createNewBlog,
  updateBlog,
  deleteBlog,
};
