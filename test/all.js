exports['test tabris Tern completion'] = require('./test_completion');
exports['test tabris Action'] = require('./test_Action');
exports['test tabris Button'] = require('./test_Button');
exports['test tabris Canvas'] = require('./test_Canvas');
exports['test tabris CheckBox'] = require('./test_CheckBox');
exports['test tabris CollectionView'] = require('./test_CollectionView');
exports['test tabris Composite'] = require('./test_Composite');
exports['test tabris Drawer'] = require('./test_Drawer');
exports['test tabris ImageView'] = require('./test_ImageView');
exports['test tabris Page'] = require('./test_Page');
exports['test tabris Picker'] = require('./test_Picker');
exports['test tabris ProgressBar'] = require('./test_ProgressBar');
exports['test tabris RadioButton'] = require('./test_RadioButton');
exports['test tabris SearchAction'] = require('./test_SearchAction');
exports['test tabris ScrollView'] = require('./test_ScrollView');
exports['test tabris Slider'] = require('./test_Slider');
exports['test tabris Switch'] = require('./test_Switch');
exports['test tabris Tab'] = require('./test_Tab');
exports['test tabris TabFolder'] = require('./test_TabFolder');
exports['test tabris TextView'] = require('./test_TextView');
exports['test tabris TextInput'] = require('./test_TextInput');
exports['test tabris ToggleButton'] = require('./test_ToggleButton');
exports['test tabris Video'] = require('./test_Video');
exports['test tabris Widget'] = require('./test_Widget');

if (require.main === module) require("test").run(exports);