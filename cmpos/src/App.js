import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Header from "./components/layouts/Header";
import Menu from "./components/layouts/Menu";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import LoginPage from "./components/pages/LoginPage/LoginPage";
import RegisterPage from "./components/pages/RegisterPage/RegisterPage";
import ShopPage from "./components/pages/ShopPage/ShopPage";
import StockPage from "./components/pages/StockPage/StockPage";
import StockCreatePage from "./components/pages/StockCreatePage/StockCreatePage";
import StockEditPage from "./components/pages/StockEditPage/StockEditPage";
import ReportPage from "./components/pages/ReportPage/ReportPage";
import TransactionPage from "./components/pages/TransactionPage/TransactionPage";
import * as loginActions from "./actions/login.action";
import { server } from "./constants";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    padding: theme.spacing(3)
  }
}));

const theme = createMuiTheme({
  palette: {
    primary: { 500: "#1E88E5" }
  },
  status: {
    danger: "orange"
  }
});

export default function App() {
  const loginReducer = useSelector(({ loginReducer }) => loginReducer);
  const [open, setOpen] = useState(true);
  const classes = useStyles();

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  // Protected Route
  const SecuredRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        // ternary condition
        loginActions.isLoggedIn() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );

  const LoginRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        // ternary condition
        loginActions.isLoggedIn() ? (
          <Redirect to="/stock" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );

  // const isLoggedIn = () => {
  //   return localStorage.getItem(server.TOKEN_KEY) ? true : false;
  // };

  return (
    <Router basename={process.env.REACT_APP_IS_PRODUCTION == 1 ? "/demo" : ""}>
      <Switch>
        <div className={classes.root}>
          {loginActions.isLoggedIn() && (
            <Header handleDrawerOpen={handleDrawerOpen} />
          )}
          {loginActions.isLoggedIn() && <Menu open={open} />}
          <Container className={classes.content} maxWidth={false}>
            <LoginRoute path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <SecuredRoute exact={true} path="/stock" component={StockPage} />
            <SecuredRoute path="/stock/create" component={StockCreatePage} />
            <SecuredRoute path="/stock/edit/:id" component={StockEditPage} />
            <SecuredRoute path="/shop" component={ShopPage} />
            <SecuredRoute path="/report" component={ReportPage} />
            <SecuredRoute path="/transaction" component={TransactionPage} />
            <Route
              exact={true}
              path="/"
              component={() => <Redirect to="/login" />}
            />
            {/* The Default not found component */}
            {/* <Route render={props => <Redirect to="/login" />} /> */}
          </Container>
        </div>
      </Switch>
    </Router>
  );
}
