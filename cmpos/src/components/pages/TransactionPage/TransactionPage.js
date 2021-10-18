import React, { useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import * as transactionActions from "./../../../actions/transaction.action";
import { makeStyles } from "@material-ui/core/styles";
import Moment from "react-moment";
import NumberFormat from "react-number-format";
import { Typography, Grid } from "@material-ui/core";
import MaterialTable, { MTableToolbar } from "material-table";
import { imageUrl } from "./../../../constants";

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
    height: 95
  }
}));

export default props => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [selectedRow, setSelectedRow] = useState(null);
  const [orderList, setorderList] = useState([]);

  const transactionReducer = useSelector(
    ({ transactionReducer }) => transactionReducer
  );

  useEffect(() => {
    dispatch(transactionActions.getTransactions());
  }, []);

  const transactionColumns = [
    {
      title: "ID",
      field: "transaction_id"
    },

    {
      title: "DATE",
      render: item => <Moment format="YYYY/MM/DD">{item.timestamp}</Moment>
    },
    {
      title: "TIME",
      render: item => <Moment format="HH:mm">{item.timestamp}</Moment>
    },
    {
      title: "STAFF",
      field: "staff_id"
    },
    {
      title: "TOTAL",
      render: item => (
        <NumberFormat
          value={item.total}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"฿"}
        />
      )
    },
    {
      title: "PAID",
      render: item => (
        <NumberFormat
          value={item.paid}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"฿"}
        />
      )
    },
    {
      title: "#SKU",
      render: item => (
        <Typography>{JSON.parse(item.order_list).length} SKU</Typography>
      )
    },
    {
      title: "WAY",
      field: "payment_type"
    }
  ];

  const orderColumns = [
    {
      title: "ID",
      field: "product_id",
      render: item => <Typography variant="body1">{item.product_id}</Typography>
    },
    {
      title: "IMAGE",
      field: "image",
      cellStyle: { padding: 0 },
      render: item => (
        <img
          src={`${imageUrl}/images/${item.image}?dummy=${Math.random()}`}
          style={{ width: 80, height: 80, borderRadius: "5%" }}
        />
      )
    },
    {
      title: "NAME",
      cellStyle: { minWidth: 400 },
      field: "name",
      render: item => <Typography variant="body1">{item.name}</Typography>
    },
    {
      title: "PRICE",
      field: "price",
      render: item => (
        <Typography variant="body1">
          <NumberFormat
            value={item.price}
            displayType={"text"}
            thousandSeparator={true}
            decimalScale={2}
            fixedDecimalScale={true}
            prefix={"฿"}
          />
        </Typography>
      )
    },
    {
      title: "STOCK",
      field: "stock",
      render: item => (
        <Typography variant="body1">
          <NumberFormat
            value={item.stock}
            displayType={"text"}
            thousandSeparator={true}
            decimalScale={0}
            fixedDecimalScale={true}
            suffix={" pcs"}
          />
        </Typography>
      )
    }
  ];

  const clickTransactionRow = data => {
    setSelectedRow(data);
    setorderList(JSON.parse(data.order_list));
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <MaterialTable
            id="root_stock"
            title="Stock"
            columns={transactionColumns}
            data={transactionReducer.result ? transactionReducer.result : []}
            onRowClick={(evt, data) => clickTransactionRow(data)}
            options={{
              pageSize: 10,
              rowStyle: rowData => ({
                backgroundColor:
                  selectedRow &&
                  selectedRow.tableData.id === rowData.tableData.id
                    ? "#EEE"
                    : "#FFF"
              })
            }}
          />
        </Grid>

        <Grid item xs={6}>
          <MaterialTable
            title="Order List"
            columns={orderColumns}
            data={orderList}
            options={{
              search: false,
              paging: false
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};
