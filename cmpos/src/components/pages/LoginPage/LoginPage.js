import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import CircularProgress from "@material-ui/core/CircularProgress";

import * as loginActions from "./../../../actions/login.action";
import loginReducer from "../../../reducers/login.reducer";
const useStyles = makeStyles({
  root: {
    maxWidth: 345
  },
  media: {
    height: 240
  }
});

const LoginPage = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loginReducer = useSelector(({ loginReducer }) => loginReducer);

  const showForm = ({
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting
  }) => {
    return (
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          onChange={handleChange}
          value={values.username}
          autoComplete="email"
          autoFocus
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="password"
          label="Password"
          onChange={handleChange}
          value={values.password}
          type="password"
          id="password"
          autoComplete="current-password"
        />

        {loginReducer.isError && (
          <Alert severity="error" style={{ marginBottom: 8 }}>
            Invalid Account
          </Alert>
        )}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={isSubmitting}
          className={classes.submit}
        >
          Sign In
        </Button>

        {isSubmitting && <CircularProgress style={{ marginTop: 10 }} />}

        <Grid container justify="flex-end">
          <Link component={RouterLink} to="/register" variant="body2">
            Register
          </Link>
        </Grid>
      </form>
    );
  };

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={`${process.env.PUBLIC_URL}/images/authen_header.jpg`}
        title="Contemplative Reptile"
      />

      <CardContent>
        <Typography variant="h4">Login</Typography>
        {/* HOC */}
        <Formik
          onSubmit={(values, { setSubmitting }) => {
            // alert(JSON.stringify(values));
            dispatch(loginActions.login(values, props.history));
            setSubmitting(false);
          }}
          initialValues={{ username: "", password: "" }}
        >
          {props => showForm(props)}
        </Formik>
      </CardContent>
    </Card>
  );
};

export default LoginPage;
