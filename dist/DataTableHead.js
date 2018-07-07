"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TableCell = require("@material-ui/core/TableCell");

var _TableCell2 = _interopRequireDefault(_TableCell);

var _TableHead = require("@material-ui/core/TableHead");

var _TableHead2 = _interopRequireDefault(_TableHead);

var _TableRow = require("@material-ui/core/TableRow");

var _TableRow2 = _interopRequireDefault(_TableRow);

var _TableSortLabel = require("@material-ui/core/TableSortLabel");

var _TableSortLabel2 = _interopRequireDefault(_TableSortLabel);

var _Tooltip = require("@material-ui/core/Tooltip");

var _Tooltip2 = _interopRequireDefault(_Tooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DataTableHead = function (_React$Component) {
  _inherits(DataTableHead, _React$Component);

  function DataTableHead() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DataTableHead);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DataTableHead.__proto__ || Object.getPrototypeOf(DataTableHead)).call.apply(_ref, [this].concat(args))), _this), _this.createSortHandler = function (property) {
      return function (event) {
        _this.props.onRequestSort(event, property);
      };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DataTableHead, [{
    key: "render",
    value: function () {
      function render() {
        var _this2 = this;

        var _props = this.props,
            order = _props.order,
            orderBy = _props.orderBy,
            columnData = _props.columnData;


        return _react2["default"].createElement(
          _TableHead2["default"],
          null,
          _react2["default"].createElement(
            _TableRow2["default"],
            null,
            _react2["default"].createElement(_TableCell2["default"], null),
            columnData.map(function (column) {
              return _react2["default"].createElement(
                _TableCell2["default"],
                {
                  key: column.id,
                  numeric: column.numeric,
                  padding: column.disablePadding ? "none" : "default",
                  sortDirection: orderBy === column.id ? order : false
                },
                _react2["default"].createElement(
                  _Tooltip2["default"],
                  {
                    title: "Sort",
                    placement: column.numeric ? "bottom-end" : "bottom-start",
                    enterDelay: 300
                  },
                  _react2["default"].createElement(
                    _TableSortLabel2["default"],
                    {
                      active: orderBy === column.id,
                      direction: order,
                      onClick: _this2.createSortHandler(column.id)
                    },
                    column.label
                  )
                )
              );
            }, this)
          )
        );
      }

      return render;
    }()
  }]);

  return DataTableHead;
}(_react2["default"].Component);

DataTableHead.propTypes = {
  onRequestSort: _propTypes2["default"].func.isRequired,
  order: _propTypes2["default"].string.isRequired,
  orderBy: _propTypes2["default"].string.isRequired,
  columnData: _propTypes2["default"].array.isRequired
};

exports["default"] = DataTableHead;