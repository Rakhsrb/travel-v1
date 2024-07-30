const SpecialOffers = require("../models/SpecialOffers");

// Контроллер для получения всех специальных предложений
const GetAllSpecialOffers = async function (req, res) {
  try {
    // Деструктурируем параметры запроса или устанавливаем значения по умолчанию
    const { title = "", category = "", pageNum = 1, pageSize = 10 } = req.query;
    const titleRegExp = new RegExp(title, "i"); // Регулярное выражение без учета регистра для заголовка
    const categoryRegExp = new RegExp(category, "i"); // Регулярное выражение без учета регистра для категории

    // Запрос к базе данных для получения специальных предложений на основе заголовка и категории
    const allSpecialOffers = await SpecialOffers.find({
      title: titleRegExp,
      category: categoryRegExp,
    })
      .skip((pageNum - 1) * parseInt(pageSize)) // Пагинация: пропустить записи на основе номера страницы
      .limit(parseInt(pageSize)); // Пагинация: ограничить количество записей на странице

    // Подсчет общего числа специальных предложений на основе заголовка и категории (для пагинации)
    const total = await SpecialOffers.countDocuments({
      title: titleRegExp,
      category: categoryRegExp,
    });

    // Ответ с данными и общим количеством
    res.status(200).json({ data: allSpecialOffers, total });
  } catch (error) {
    // Обработка ошибок сервера
    res
      .status(500)
      .json({ message: "Внутренняя ошибка сервера", error: error.message });
  }
};

// Контроллер для получения одного специального предложения по ID
const GetOneSpecialOffer = async function (req, res) {
  try {
    const rpID = req.params.id; // Получение параметра ID из запроса
    const oneSpecialOffer = await SpecialOffers.findById(rpID); // Поиск специального предложения по ID в базе данных
    if (!oneSpecialOffer) {
      return res.status(404).json({ message: "Предложение не найдено!" }); // Обработка случая, когда предложение не найдено
    }
    res.status(200).json({ data: oneSpecialOffer }); // Ответ с найденным специальным предложением
  } catch (error) {
    // Обработка ошибок сервера
    res
      .status(500)
      .json({ message: "Внутренняя ошибка сервера", error: error.message });
  }
};

// Контроллер для создания нового специального предложения
const CreateNewSpecialOffer = async function (req, res) {
  try {
    const newSpecialOffer = new SpecialOffers(req.body); // Создание нового экземпляра специального предложения
    await newSpecialOffer.save(); // Сохранение нового специального предложения в базе данных
    res.status(201).json({ data: newSpecialOffer }); // Ответ с созданным специальным предложением
  } catch (error) {
    // Обработка ошибок клиента (например, ошибок валидации)
    res.status(400).json({
      message: "Не удалось создать новое специальное предложение",
      error: error.message,
    });
  }
};

// Контроллер для обновления существующего специального предложения по ID
const UpdateSpecialOffer = async function (req, res) {
  try {
    const rpID = req.params.id; // Получение параметра ID из запроса
    const updatedSpecialOffer = await SpecialOffers.findByIdAndUpdate(
      rpID,
      req.body,
      { new: true } // Вернуть обновленный документ
    );
    if (!updatedSpecialOffer) {
      return res.status(404).json({ message: "Предложение не найдено!" }); // Обработка случая, когда предложение не найдено
    }
    res.status(200).json({ data: updatedSpecialOffer }); // Ответ с обновленным специальным предложением
  } catch (error) {
    // Обработка ошибок клиента (например, ошибок валидации)
    res.status(400).json({
      message: "Не удалось обновить специальное предложение",
      error: error.message,
    });
  }
};

// Контроллер для удаления специального предложения по ID
const DeleteSpecialOffer = async function (req, res) {
  try {
    const rpID = req.params.id; // Получение параметра ID из запроса
    const deletedSpecialOffer = await SpecialOffers.findByIdAndDelete(rpID); // Удаление специального предложения по ID
    if (!deletedSpecialOffer) {
      return res.status(404).json({ message: "Предложение не найдено!" }); // Обработка случая, когда предложение не найдено
    }
    res.status(200).json({ message: "Предложение успешно удалено" }); // Ответ с сообщением об успешном удалении
  } catch (error) {
    // Обработка ошибок сервера
    res
      .status(500)
      .json({ message: "Внутренняя ошибка сервера", error: error.message });
  }
};

module.exports = {
  GetAllSpecialOffers,
  GetOneSpecialOffer,
  CreateNewSpecialOffer,
  UpdateSpecialOffer,
  DeleteSpecialOffer,
};
