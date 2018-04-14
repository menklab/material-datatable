import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "material-ui/styles";
import Paper from "material-ui/Paper";
import Grid from "material-ui/Grid";
import DataTableList from "./DataTableList";

const styles = theme => ({
  root: {
    width: "100%",
    minWidth: 1000
  },
  dataTableList: {},
  dataTableEditor: {
    minHeight: "300px"
  }
});


class DataTable extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      order: this.props.order,
      orderBy: this.props.orderBy,
      searchBy: "",
      selected: {},
      page: this.props.page,
      rowsPerPage: this.props.rowsPerPage,
      title: this.props.title
    };
  }

  handleClick = (event, item) => {
    const {selected} = this.state;
    let newSelected = {};

    if (!!selected && selected.id === item.id) {
      newSelected = {};
    } else {
      newSelected = item
    }
    this.setState({selected: newSelected});
  };

  render() {
    const {data, columnData, classes, title, children} = this.props;
    const {
      selected,
      rowsPerPage,
      orderBy,
      order,
      searchBy,
      page
    } = this.state;

    const childrenWithProps = React.cloneElement(children, {selected, order});
    return (
      <div className={classes.root}>
        <Grid container spacing={16}>
          <Grid item xs={8}>
            <Paper className={classes.dataTableList}>
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
              />
            </Paper>
          </Grid>
          <Grid item xs={4}>
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
  columnData: PropTypes.array.isRequired
};

export default withStyles(styles)(DataTable);
