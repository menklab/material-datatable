"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require("@material-ui/core/styles");

var _Paper = require("@material-ui/core/Paper");

var _Paper2 = _interopRequireDefault(_Paper);

var _Grid = require("@material-ui/core/Grid");

var _Grid2 = _interopRequireDefault(_Grid);

var _DataTableList = require("./DataTableList");

var _DataTableList2 = _interopRequireDefault(_DataTableList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultDimensions = {
  initial: {
    list: 8,
    details: 4
  },
  selected: {
    list: 8,
    details: 4
  }
};

var styles = function styles(theme) {
  return {
    root: {
      width: "100%",
      minWidth: 1000
    },
    dataTableList: {},
    dataTableEditor: {
      minHeight: "300px"
    }
  };
};

var DataTable = function (_React$Component) {
  _inherits(DataTable, _React$Component);

  function DataTable(props, context) {
    _classCallCheck(this, DataTable);

    var _this = _possibleConstructorReturn(this, (DataTable.__proto__ || Object.getPrototypeOf(DataTable)).call(this, props, context));

    _this.getDimensions = function (area) {
      var idAttribute = _this.state.idAttribute;
      var _this$state = _this.state,
          selected = _this$state.selected,
          dimensions = _this$state.dimensions;


      if (!!selected && !!selected[idAttribute]) {
        return dimensions.selected[area];
      }

      return dimensions.initial[area];
    };

    _this.handleClick = function (event, item) {
      var _this$state2 = _this.state,
          selected = _this$state2.selected,
          idAttribute = _this$state2.idAttribute;

      var newSelected = {};

      if (!!selected && selected[idAttribute] === item[idAttribute]) {
        newSelected = {};
      } else {
        newSelected = item;
      }
      _this.setState({ selected: newSelected });
    };

    _this.resetSelected = function () {
      _this.setState({ selected: {} });
    };

    _this.state = {
      order: _this.props.order,
      orderBy: _this.props.orderBy,
      searchBy: "",
      selected: {},
      page: _this.props.page,
      rowsPerPage: _this.props.rowsPerPage,
      title: _this.props.title,
      dimensions: _this.props.dimensions || defaultDimensions,
      idAttribute: !!_this.props.idAttribute ? _this.props.idAttribute : "id"
    };
    return _this;
  }

  _createClass(DataTable, [{
    key: "render",
    value: function () {
      function render() {
        var _props = this.props,
            data = _props.data,
            columnData = _props.columnData,
            classes = _props.classes,
            title = _props.title,
            children = _props.children,
            loading = _props.loading,
            passProps = _props.passProps;
        var _state = this.state,
            selected = _state.selected,
            rowsPerPage = _state.rowsPerPage,
            orderBy = _state.orderBy,
            order = _state.order,
            searchBy = _state.searchBy,
            page = _state.page,
            idAttribute = _state.idAttribute;


        var childrenWithProps = _react2["default"].cloneElement(children, Object.assign({ selected: selected, order: order, resetSelected: this.resetSelected }, passProps));
        return _react2["default"].createElement(
          "div",
          { className: classes.root },
          _react2["default"].createElement(
            _Grid2["default"],
            { container: true, spacing: 16 },
            _react2["default"].createElement(
              _Grid2["default"],
              { item: true, xs: this.getDimensions("list") },
              _react2["default"].createElement(
                _Paper2["default"],
                { className: classes.dataTableList },
                _react2["default"].createElement(_DataTableList2["default"], {
                  title: title,
                  columnData: columnData,
                  data: data,
                  order: order,
                  orderBy: orderBy,
                  page: page,
                  rowsPerPage: rowsPerPage,
                  searchBy: searchBy,
                  selectHandler: this.handleClick,
                  selected: selected,
                  loading: loading,
                  idAttribute: idAttribute
                })
              )
            ),
            _react2["default"].createElement(
              _Grid2["default"],
              { className: classes.grid, item: true, xs: this.getDimensions("details") },
              _react2["default"].createElement(
                _Paper2["default"],
                { className: classes.dataTableEditor },
                childrenWithProps
              )
            )
          )
        );
      }

      return render;
    }()
  }]);

  return DataTable;
}(_react2["default"].Component);

DataTable.propTypes = {
  classes: _propTypes2["default"].object.isRequired,
  children: _propTypes2["default"].object.isRequired,
  title: _propTypes2["default"].string.isRequired,
  order: _propTypes2["default"].string.isRequired,
  orderBy: _propTypes2["default"].string.isRequired,
  page: _propTypes2["default"].number.isRequired,
  rowsPerPage: _propTypes2["default"].number.isRequired,
  data: _propTypes2["default"].array.isRequired,
  columnData: _propTypes2["default"].array.isRequired,
  loading: _propTypes2["default"].bool.isRequired,
  passProps: _propTypes2["default"].object
};

exports["default"] = (0, _styles.withStyles)(styles)(DataTable);