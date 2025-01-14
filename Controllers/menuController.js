const Menu = require('./models/Menu');

exports.getMenus = async (req, res) => {
  const menus = await Menu.find();
  res.json(menus);
};

exports.createMenu = async (req, res) => {
  const { meal, items, diet } = req.body;
  const newMenu = new Menu({ meal, items, diet });
  await newMenu.save();
  res.status(201).json(newMenu);
};

exports.updateMenu = async (req, res) => {
  const { id } = req.params;
  const updatedMenu = await Menu.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updatedMenu);
};

exports.deleteMenu = async (req, res) => {
  const { id } = req.params;
  await Menu.findByIdAndDelete(id);
  res.json({ message: 'Menu deleted' });
};
