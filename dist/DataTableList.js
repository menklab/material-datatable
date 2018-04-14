"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require("material-ui/styles");

var _Table = require("material-ui/Table");

var _Table2 = _interopRequireDefault(_Table);

var _Checkbox = require("material-ui/Checkbox");

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _DataTableHead = require("./DataTableHead");

var _DataTableHead2 = _interopRequireDefault(_DataTableHead);

var _DataTableToolbar = require("./DataTableToolbar");

var _DataTableToolbar2 = _interopRequireDefault(_DataTableToolbar);

var _Progress = require("material-ui/Progress");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = function styles(theme) {
  return {
    root: {
      width: "100%",
      minWidth: 650,
      maxWidth: 1000,
      marginTop: theme.spacing.unit * 3
    },
    table: {
      minWidth: 650
    },
    tableWrapper: {
      overflowX: "auto"
    },
    itemLoader: {
      marginLeft: "14px",
      marginTop: "6px"
    }
  };
};

var DataTableList = function (_React$Component) {
  _inherits(DataTableList, _React$Component);

  function DataTableList(props, context) {
    _classCallCheck(this, DataTableList);

    var _this = _possibleConstructorReturn(this, (DataTableList.__proto__ || Object.getPrototypeOf(DataTableList)).call(this, props, context));

    _this.handleRequestSort = function (event, property) {
      var orderBy = property;
      var order = "desc";

      if (_this.state.orderBy === property && _this.state.order === "desc") {
        order = "asc";
      }
      _this.setState({ order: order, orderBy: orderBy });
    };

    _this.handleRequestSearch = function (searchBy) {
      _this.setState({ searchBy: searchBy });
    };

    _this.handleClick = function (event, item) {
      if (item.id !== "-") {
        _this.props.selectHandler(event, item);
      }
    };

    _this.handleChangePage = function (event, page) {
      _this.setState({ page: page });
    };

    _this.handleChangeRowsPerPage = function (event) {
      _this.setState({ rowsPerPage: event.target.value });
    };

    _this.isSelected = function (id) {
      if (!!_this.state.selected && _this.state.selected.id === id) {
        return true;
      }
    };

    _this.getDisplayData = function () {
      var _this$state = _this.state,
          rowsPerPage = _this$state.rowsPerPage,
          page = _this$state.page,
          order = _this$state.order,
          orderBy = _this$state.orderBy,
          searchBy = _this$state.searchBy;
      var data = _this.props.data;

      // search

      var displayData = [];
      // if there is nothing to searchBy return the entire result set
      if (searchBy === "") {
        displayData = data;
      } else {
        // otherwise filter based upon searchBy
        displayData = data.filter(function (n) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = Object.values(n)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var v = _step.value;

              if (String(v).toLowerCase().includes(searchBy.toLowerCase())) {
                return true;
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator["return"]) {
                _iterator["return"]();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          return false;
        });
      }

      // sort
      displayData = order === "desc" ? displayData.sort(function (a, b) {
        return b[orderBy] < a[orderBy] ? -1 : 1;
      }) : displayData.sort(function (a, b) {
        return a[orderBy] < b[orderBy] ? -1 : 1;
      });

      var count = displayData.length;

      // page
      displayData = displayData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

      return { displayData: displayData, count: count };
    };

    _this.state = {
      order: _this.props.order,
      orderBy: _this.props.orderBy,
      page: _this.props.page,
      rowsPerPage: _this.props.rowsPerPage,
      searchBy: _this.props.searchBy,
      title: _this.props.title,
      selected: {}
    };
    return _this;
  }

  _createClass(DataTableList, [{
    key: "componentWillReceiveProps",
    value: function () {
      function componentWillReceiveProps(nextProps) {
        if (nextProps.selected !== this.state.selected) {
          this.setState({ selected: nextProps.selected });
        }
      }

      return componentWillReceiveProps;
    }()
  }, {
    key: "render",
    value: function () {
      function render() {
        var _this2 = this;

        var _props = this.props,
            classes = _props.classes,
            columnData = _props.columnData;
        var _state = this.state,
            order = _state.order,
            orderBy = _state.orderBy,
            rowsPerPage = _state.rowsPerPage,
            page = _state.page,
            title = _state.title;

        var _getDisplayData = this.getDisplayData(),
            displayData = _getDisplayData.displayData,
            count = _getDisplayData.count;

        var emptyRows = rowsPerPage - Math.min(rowsPerPage, count - page * rowsPerPage);

        return _react2["default"].createElement(
          "div",
          null,
          _react2["default"].createElement(_DataTableToolbar2["default"], {
            title: title,
            onRequestSearch: this.handleRequestSearch
          }),
          _react2["default"].createElement(
            "div",
            { className: classes.tableWrapper },
            _react2["default"].createElement(
              _Table2["default"],
              { className: classes.table },
              _react2["default"].createElement(_DataTableHead2["default"], {
                order: order,
                orderBy: orderBy,
                columnData: columnData,
                onRequestSort: this.handleRequestSort
              }),
              _react2["default"].createElement(
                _Table.TableBody,
                null,
                displayData !== [] ? displayData.map(function (n) {
                  var isSelected = _this2.isSelected(n.id);
                  return _react2["default"].createElement(
                    _Table.TableRow,
                    {
                      hover: true,
                      onClick: function () {
                        function onClick(event) {
                          return _this2.handleClick(event, n);
                        }

                        return onClick;
                      }(),
                      role: "checkbox",
                      "aria-checked": isSelected,
                      tabIndex: -1,
                      key: n.id,
                      selected: isSelected
                    },
                    _react2["default"].createElement(
                      _Table.TableCell,
                      { padding: "checkbox" },
                      n.id[0] === "-" ? _react2["default"].createElement(_Progress.CircularProgress, {
                        className: classes.itemLoader,
                        size: 20
                      }) : _react2["default"].createElement(
                        "span",
                        null,
                        _react2["default"].createElement(_Checkbox2["default"], { checked: !!isSelected })
                      )
                    ),
                    columnData.map(function (column) {
                      return _react2["default"].createElement(
                        _Table.TableCell,
                        {
                          key: column.id,
                          padding: column.padding,
                          numeric: column.numeric
                        },
                        !!column.mutation ? column.mutation(n[column.id]) : n[column.id]
                      );
                    }, _this2)
                  );
                }) : null,
                emptyRows > 0 && _react2["default"].createElement(
                  _Table.TableRow,
                  { style: { height: 49 * emptyRows } },
                  _react2["default"].createElement(_Table.TableCell, { colSpan: 6 })
                )
              ),
              _react2["default"].createElement(
                _Table.TableFooter,
                null,
                _react2["default"].createElement(
                  _Table.TableRow,
                  null,
                  _react2["default"].createElement(_Table.TablePagination, {
                    colSpan: 6,
                    count: count,
                    rowsPerPage: rowsPerPage,
                    page: page,
                    backIconButtonProps: {
                      "aria-label": "Previous Page"
                    },
                    nextIconButtonProps: {
                      "aria-label": "Next Page"
                    },
                    onChangePage: this.handleChangePage,
                    onChangeRowsPerPage: this.handleChangeRowsPerPage
                  })
                )
              )
            )
          )
        );
      }

      return render;
    }()
  }]);

  return DataTableList;
}(_react2["default"].Component);

DataTableList.propTypes = {
  classes: _propTypes2["default"].object.isRequired,
  title: _propTypes2["default"].string.isRequired,
  order: _propTypes2["default"].string.isRequired,
  orderBy: _propTypes2["default"].string.isRequired,
  searchBy: _propTypes2["default"].string.isRequired,
  selected: _propTypes2["default"].object.isRequired,
  selectHandler: _propTypes2["default"].func.isRequired,
  page: _propTypes2["default"].number.isRequired,
  rowsPerPage: _propTypes2["default"].number.isRequired,
  data: _propTypes2["default"].array.isRequired,
  columnData: _propTypes2["default"].array.isRequired
};

exports["default"] = (0, _styles.withStyles)(styles)(DataTableList);