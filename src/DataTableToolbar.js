import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Search from "@material-ui/icons/Search";
import { FormControl } from "@material-ui/core/FormControl";

const toolbarStyles = () => ({
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
});

class DataTableToolbar extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      search: ""
    };
  }

  createSearchHandler = property => event => {
    this.setState({ search: event.target.value });
    this.props.onRequestSearch(event.target.value);
  };

  render() {
    const { classes, title } = this.props;

    return (
      <Toolbar>
        <div className={classes.title}>
          <Typography variant="title">{title}</Typography>
        </div>
        <div className={classes.spacer} />
        <div className={classes.search}>
          <FormControl fullWidth className={classes.formControl}>
            <Input
              placeholder="Search"
              id="adornment-search"
              value={this.state.amount}
              onChange={this.createSearchHandler()}
              endAdornment={
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              }
            />
          </FormControl>
        </div>
      </Toolbar>
    );
  }
}

DataTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSearch: PropTypes.func.isRequired
};

export default withStyles(toolbarStyles)(DataTableToolbar);
