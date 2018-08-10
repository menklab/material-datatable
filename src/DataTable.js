import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import DataTableList from "./DataTableList";

const defaultDimensions = {
  initial: {
    list: 8,
    details: 4
  },
  selected: {
    list: 8,
    details: 4
  }
};

const styles = theme => ({
  root: {
    width: "100%",
    minWidth: 1000
  },
  dataTableList: {},
  dataTableEditor: {
    minHeight: "300px",
  },
});


class DataTable extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      order: this.props.order,
      orderBy: this.props.orderBy,
      searchBy: "",
      selected: this.props.selected || {},
      page: this.props.page,
      rowsPerPage: this.props.rowsPerPage,
      title: this.props.title,
      dimensions: this.props.dimensions || defaultDimensions,
      idAttribute: !!this.props.idAttribute ? this.props.idAttribute : "id"
    };
  }



  getDimensions = (area) => {
    let {idAttribute} = this.state;
    let {selected, dimensions} = this.state;

    if (!!selected && !!selected[idAttribute]) {
      return dimensions.selected[area];
    }

    return dimensions.initial[area];
  };

  handleClick = (event, item) => {
    const {onItemClick} = this.props;
    const {selected, idAttribute} = this.state;
    let newSelected = {};

    if (!!selected && selected[idAttribute] === item[idAttribute]) {
      newSelected = {};
    } else {
      newSelected = item
    }
    this.setState({selected: newSelected});
    onItemClick(newSelected);
  };


  resetSelected = (newSelected) => {
    this.setState({selected: !!newSelected ? newSelected : {}});
  };

  render() {
    const {data, columnData, classes, title, children, loading, passProps, breadCrumb} = this.props;
    const {selected, rowsPerPage, orderBy, order, searchBy, page, idAttribute} = this.state;


    const childrenWithProps = React.cloneElement(children, {selected, order, resetSelected: this.resetSelected, ...passProps});
    return (
      <div className={classes.root}>
        <Grid container spacing={16}>
          <Grid item xs={this.getDimensions("list")}>
            <Paper className={classes.dataTableList}>
              {!!breadCrumb ? breadCrumb() : null}
              <DataTableList
                title={title}
                columnData={columnData}
                data={data}
                order={order}
                orderBy={orderBy}
                page={page}
                rowsPerPage={rowsPerPage}
                searchBy={searchBy}
                selectHandler={this.handleClick}
                selected={selected}
                loading={loading}
                idAttribute={idAttribute}
              />
            </Paper>
          </Grid>
          <Grid className={classes.grid} item xs={this.getDimensions("details")}>
            <Paper className={classes.dataTableEditor}>
              {childrenWithProps}
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }

}

DataTable.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  columnData: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  passProps: PropTypes.object,
  onItemClick: PropTypes.func.isRequired,
  selected: PropTypes.object.isRequired
};

export default withStyles(styles)(DataTable);
