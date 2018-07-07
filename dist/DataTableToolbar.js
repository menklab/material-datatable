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

var _Toolbar = require("@material-ui/core/Toolbar");

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _Typography = require("@material-ui/core/Typography");

var _Typography2 = _interopRequireDefault(_Typography);

var _Input = require("@material-ui/core/Input");

var _Input2 = _interopRequireDefault(_Input);

var _InputAdornment = require("@material-ui/core/InputAdornment");

var _InputAdornment2 = _interopRequireDefault(_InputAdornment);

var _Search = require("@material-ui/icons/Search");

var _Search2 = _interopRequireDefault(_Search);

var _FormControl = require("@material-ui/core/FormControl");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var toolbarStyles = function toolbarStyles() {
  return {
    root: {},
    spacer: {
      flex: "1 1 100%"
    },
    title: {
      flex: "0 0 auto",
      marginTop: "14px"
    },
    search: {
      width: "75%",
      minWidth: "250px"
    },
    formControl: {
      marginTop: "0"
    }
  };
};

var DataTableToolbar = function (_React$Component) {
  _inherits(DataTableToolbar, _React$Component);

  function DataTableToolbar(props, context) {
    _classCallCheck(this, DataTableToolbar);

    var _this = _possibleConstructorReturn(this, (DataTableToolbar.__proto__ || Object.getPrototypeOf(DataTableToolbar)).call(this, props, context));

    _this.createSearchHandler = function (property) {
      return function (event) {
        _this.setState({ search: event.target.value });
        _this.props.onRequestSearch(event.target.value);
      };
    };

    _this.state = {
      search: ""
    };
    return _this;
  }

  _createClass(DataTableToolbar, [{
    key: "render",
    value: function () {
      function render() {
        var _props = this.props,
            classes = _props.classes,
            title = _props.title;


        return _react2["default"].createElement(
          _Toolbar2["default"],
          null,
          _react2["default"].createElement(
            "div",
            { className: classes.title },
            _react2["default"].createElement(
              _Typography2["default"],
              { variant: "title" },
              title
            )
          ),
          _react2["default"].createElement("div", { className: classes.spacer }),
          _react2["default"].createElement(
            "div",
            { className: classes.search },
            _react2["default"].createElement(
              _FormControl.FormControl,
              { fullWidth: true, className: classes.formControl },
              _react2["default"].createElement(_Input2["default"], {
                placeholder: "Search",
                id: "adornment-search",
                value: this.state.amount,
                onChange: this.createSearchHandler(),
                endAdornment: _react2["default"].createElement(
                  _InputAdornment2["default"],
                  { position: "end" },
                  _react2["default"].createElement(_Search2["default"], null)
                )
              })
            )
          )
        );
      }

      return render;
    }()
  }]);

  return DataTableToolbar;
}(_react2["default"].Component);

DataTableToolbar.propTypes = {
  classes: _propTypes2["default"].object.isRequired,
  onRequestSearch: _propTypes2["default"].func.isRequired
};

exports["default"] = (0, _styles.withStyles)(toolbarStyles)(DataTableToolbar);