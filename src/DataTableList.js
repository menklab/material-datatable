import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  TableRow
} from "material-ui/Table";
import Checkbox from "material-ui/Checkbox";
import DataTableHead from "./DataTableHead";
import DataTableToolbar from "./DataTableToolbar";
import { CircularProgress } from "material-ui/Progress";

const styles = theme => ({
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
});

class DataTableList extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      order: this.props.order,
      orderBy: this.props.orderBy,
      page: this.props.page,
      rowsPerPage: this.props.rowsPerPage,
      searchBy: this.props.searchBy,
      title: this.props.title
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selected !== this.state.selected) {
      this.setState({ selected: nextProps.selected });
    }
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }
    this.setState({ order, orderBy });
  };

  handleRequestSearch = searchBy => {
    this.setState({ searchBy });
  };

  handleClick = (event, id) => {
    if (id[0] !== "-") {
      this.props.selectHandler(event, id);
    }
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected === id;

  getDisplayData = () => {
    const { rowsPerPage, page, order, orderBy, searchBy } = this.state;
    const { data } = this.props;

    // search
    let displayData = [];
    // if there is nothing to searchBy return the entire result set
    if (searchBy === "") {
      displayData = data;
    } else {
      // otherwise filter based upon searchBy
      displayData = data.filter(n => {
        for (let v of Object.values(n)) {
          if (
            String(v)
              .toLowerCase()
              .includes(searchBy.toLowerCase())
          ) {
            return true;
          }
        }
        return false;
      });
    }

    // sort
    displayData =
      order === "desc"
        ? displayData.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : displayData.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    let count = displayData.length;

    // page
    displayData = displayData.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );

    return { displayData, count };
  };

  render() {
    const { classes, columnData } = this.props;
    const { order, orderBy, rowsPerPage, page, title } = this.state;
    const { displayData, count } = this.getDisplayData();

    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, count - page * rowsPerPage);

    return (
      <div>
        <DataTableToolbar
          title={title}
          onRequestSearch={this.handleRequestSearch}
        />
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <DataTableHead
              order={order}
              orderBy={orderBy}
              columnData={columnData}
              onRequestSort={this.handleRequestSort}
            />
            <TableBody>
              {displayData !== []
                ? displayData.map(n => {
                    const isSelected = this.isSelected(n.id);
                    return (
                      <TableRow
                        hover
                        onClick={event => this.handleClick(event, n.id)}
                        role="checkbox"
                        aria-checked={isSelected}
                        tabIndex={-1}
                        key={n.id}
                        selected={isSelected}
                      >
                        <TableCell padding="checkbox">
                          {n.id[0] === "-" ? (
                            <CircularProgress
                              className={classes.itemLoader}
                              size={20}
                            />
                          ) : (
                            <Checkbox checked={isSelected} />
                          )}
                        </TableCell>
                        {columnData.map(column => {
                          return (
                            <TableCell
                              key={column.id}
                              padding={column.padding}
                              numeric={column.numeric}
                            >
                              {!!column.mutation
                                ? column.mutation(n[column.id])
                                : n[column.id]}
                            </TableCell>
                          );
                        }, this)}
                      </TableRow>
                    );
                  })
                : null}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={6}
                  count={count}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  backIconButtonProps={{
                    "aria-label": "Previous Page"
                  }}
                  nextIconButtonProps={{
                    "aria-label": "Next Page"
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    );
  }
}

DataTableList.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  searchBy: PropTypes.string.isRequired,
  selected: PropTypes.string.isRequired,
  selectHandler: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  columnData: PropTypes.array.isRequired
};

export default withStyles(styles)(DataTableList);