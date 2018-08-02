import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Search from "@material-ui/icons/Search";
import FormControl from "@material-ui/core/FormControl";

const styles = theme => ({
  root: {},
  spacer: {
    flex: "0 0 10%"
  },
  title: {
    flex: "1 0 30%",
    marginTop: theme.spacing.unit *2,
    marginBottom: theme.spacing.unit *2
  },
  search: {
    flex: "2 0 50%",
    minWidth: "250px"
  },
  formControl: {
    marginTop: "0"
  },
  toolbar: {
    display: "flex",
    flexWrap: "wrap",
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
      <Toolbar className={classes.toolbar}>
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

export default withStyles(styles)(DataTableToolbar);
