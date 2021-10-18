import "./ShopPage.css"; // Tell Webpack that Button.js uses these styles
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Payment from "./../../fragments/Payment/Payment";
import * as stockActions from "./../../../actions/stock.action";
import * as shopActions from "./../../../actions/shop.action";
import { imageUrl } from "./../../../constants";
import NumberFormat from "react-number-format";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import StarsIcon from "@material-ui/icons/Stars";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

export default props => {
  const shopReducer = useSelector(({ shopReducer }) => shopReducer);
  const stockReducer = useSelector(({ stockReducer }) => stockReducer);

  const dispatch = useDispatch();

  const useStyles = makeStyles(theme => ({
    root: {
      width: "100%",
      marginTop: 55
    },
    star: {
      color: "red"
    },
    orderList: {
      overflowX: "hidden",
      height: 490,
      flex: 1,
      width: "100%",
      maxHeight: 490
    },
    orderListItem: {
      height: 100,
      maxHeight: 100
    },
    productContainer: {
      height: 720
    },
    paymentButton: {
      height: 95,
      marginTop: 24
    },
    leftLabel: {
      marginLeft: 20
    },
    rightLabel: {
      marginRight: 20
    }
  }));

  const classes = useStyles();

  const renderPayment = () => {
    return (
      <div className="col-md-8" style={{ maxHeight: 710 }}>
        <Payment order={JSON.stringify(shopReducer.mOrderLines)} />
      </div>
    );
  };

  const isSelectedItem = product => {
    let index = shopReducer.mOrderLines.indexOf(product);
    return index != -1;
  };

  const renderOrderRows = () => {
    const { mOrderLines } = shopReducer;

    return mOrderLines.map(item => (
      <ListItem button divider className={classes.orderListItem}>
        <Grid container key={item.product_id} spacing={1}>
          {/* Image Order  */}
          <Grid item xs={2}>
            <img
              alt="to be done"
              src={`${imageUrl}/images/${item.image}`}
              style={{ height: 90, width: 90 }}
            />
          </Grid>
          {/* Name Order  */}
          <Grid item xs={8} alignitem="center">
            <Typography
              color="textSecondary"
              component="p"
              style={{ maxHeight: 50, marginLeft: 32 }}
            >
              {item.name}
            </Typography>
          </Grid>
          {/* Price and Qty Order  */}
          <Grid item xs={2} alignContent="center">
            <Typography align="right" color="textPrimary">
              <NumberFormat
                value={item.price}
                displayType={"text"}
                thousandSeparator={true}
                decimalScale={2}
                fixedDecimalScale={true}
                prefix={"฿"}
              />
              <br />X {item.qty}.
              <br />
              <DeleteOutlineIcon
                onClick={() => dispatch(shopActions.removeOrder(item))}
              />
            </Typography>
          </Grid>
        </Grid>
      </ListItem>
    ));
  };

  const renderProductRows = () => {
    const { result } = stockReducer;
    return (
      <Container style={{ height: "100%", overflowY: "scroll" }}>
        <Grid container spacing={1} className={classes.productContainer}>
          {result != null &&
            result.map((item, i) => (
              <Grid
                key={i}
                item
                xs={3}
                onClick={() => dispatch(shopActions.addOrder(item))}
                style={{ cursor: "pointer" }}
              >
                <Card>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt="Contemplative Reptile"
                      height="200"
                      image={`${imageUrl}/images/${item.image}`}
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography noWrap gutterBottom>
                        {item.name}
                      </Typography>
                      <Grid container style={{ height: 24 }}>
                        <Grid item xs={10}>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            D{item.product_id} / ฿{item.price}
                          </Typography>
                        </Grid>
                        {isSelectedItem(item) && (
                          <Grid item xs={2}>
                            <StarsIcon className={classes.star} />
                          </Grid>
                        )}
                      </Grid>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Container>
    );
  };

  const renderPR = () => {
    return (
      <Container>
        <Grid container spacing={3}>
          {stockReducer.result &&
            stockReducer.result.map(item => (
              <Grid item xs={3}>
                <Card>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt="Contemplative Reptile"
                      height="200"
                      image={`${imageUrl}/images/${item.image}`}
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography noWrap gutterBottom>
                        {item.name}
                      </Typography>
                      <Grid container style={{ height: 24 }}>
                        <Grid item xs={10}>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            D{item.product_id} / ฿{item.price}
                          </Typography>
                        </Grid>
                        {isSelectedItem(item) && (
                          <Grid item xs={2}>
                            <StarsIcon className={classes.star} />
                          </Grid>
                        )}
                      </Grid>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Container>
    );
  };

  useEffect(() => {
    dispatch(stockActions.getProducts());
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        {/* Left section */}
        <Grid item xs={8}>
          <Paper
            elevation={1}
            style={{
              paddingTop: 24,
              paddingBottom: 24,
              backgroundColor: "#e0f5fd"
            }}
          >
            {shopReducer.mIsPaymentMade ? renderPayment() : renderProductRows()}
          </Paper>
        </Grid>
        {/* <Grid item xs={8}>
          {renderPR()}
        </Grid> */}
        {/* Right section */}
        <Grid item xs={4}>
          <div
            style={{
              maxWidth: "100%"
            }}
          >
            <Paper style={{ paddingTop: 16, marginTop: 8 }} elevation={1}>
              {/* Tax section */}
              <Grid
                container
                justify="space-between"
                style={{ marginBottom: 24 }}
              >
                <Typography variant="h3" className={classes.leftLabel}>
                  Tax 7%
                </Typography>
                <Typography
                  variant="h3"
                  color="primary"
                  className={classes.rightLabel}
                >
                  <NumberFormat
                    value={shopReducer.mTaxAmt}
                    displayType={"text"}
                    decimalScale={2}
                    thousandSeparator={true}
                    prefix={"฿"}
                  />
                </Typography>
              </Grid>

              {/* Total section */}
              <Grid container justify="space-between">
                <Typography variant="h3" className={classes.leftLabel}>
                  Total
                </Typography>
                <Typography
                  variant="h3"
                  color="primary"
                  className={classes.rightLabel}
                >
                  <NumberFormat
                    value={shopReducer.mTotalPrice}
                    displayType={"text"}
                    thousandSeparator={true}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    prefix={"฿"}
                  />
                </Typography>
              </Grid>

              <Button
                className={classes.paymentButton}
                fullWidth
                variant="contained"
                color="secondary"
                disabled={
                  !(shopReducer.mTotalPrice > 0) && !shopReducer.mIsPaymentMade
                }
                onClick={() => dispatch(shopActions.togglePaymentState())}
              >
                <Typography variant="h3">Payment</Typography>
              </Button>
            </Paper>

            <Paper
              elevation={1}
              style={{
                height: 490,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              {shopReducer.mOrderLines.length > 0 ? (
                <List
                  component="nav"
                  className={classes.orderList}
                  aria-label="mailbox folders"
                >
                  {renderOrderRows()}
                </List>
              ) : (
                <img
                  src={`${process.env.PUBLIC_URL}/images/waiting_for_sale.png`}
                  style={{ height: 300, width: 300 }}
                />
              )}
            </Paper>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
