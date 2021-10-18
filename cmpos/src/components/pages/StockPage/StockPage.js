import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { imageUrl } from "./../../../constants";
import * as stockActions from "./../../../actions/stock.action";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import NumberFormat from "react-number-format";
import MaterialTable, { MTableToolbar } from "material-table";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Typography, Grid } from "@material-ui/core";
import StockCard from "./../../fragments/StockCard/StockCard";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import NewReleasesIcon from "@material-ui/icons/NewReleases";
import AssignmentReturnIcon from "@material-ui/icons/AssignmentReturn";
import StarIcon from "@material-ui/icons/Star";
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: 60
  }
}));

export default props => {
  const classes = useStyles();
  const stockReducer = useSelector(({ stockReducer }) => stockReducer);
  const dispatch = useDispatch();

  const [selectedRow, setSelectedRow] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    dispatch(stockActions.getProducts());
  }, []);

  const columns = [
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
          style={{ width: 70, height: 70, borderRadius: "5%" }}
        />
      )
    },
    {
      title: "NAME",
      field: "name",
      cellStyle: { minWidth: 700 },
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
    },
    {
      title: "CREATED",
      field: "created",
      render: item => (
        <Typography>
          <Moment format="DD/MM/YYYY">{item.created}</Moment>
        </Typography>
      )
    }
  ];

  const actions = [
    {
      icon: "edit",
      iconProps: { color: "primary" },
      tooltip: "Edit",
      onClick: (event, rowData) =>
        props.history.push("/stock/edit/" + rowData.product_id)
    },
    {
      icon: "delete",
      iconProps: { color: "action" },
      tooltip: "Delete",
      onClick: (event, rowData) => {
        setSelectedProduct(rowData);
        setOpenDialog(true);
      }
    }
  ];

  const handleDeleteConfirm = () => {
    dispatch(stockActions.deleteProduct(selectedProduct.product_id));
    dispatch(stockActions.getProducts());
    setOpenDialog(false);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const showDialog = () => {
    if (selectedProduct == null) {
      return "";
    }

    return (
      <Dialog
        open={openDialog}
        keepMounted
        onClose={() => {}}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          <img
            src={`${imageUrl}/images/${
              selectedProduct.image
            }?dummy=${Math.random()}`}
            style={{ width: 100, borderRadius: "5%" }}
          />
          <br />
          Confirm to delete the product? : {" " + selectedProduct.name}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            You cannot restore deleted product.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="default">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <div className={classes.root}>
      <Grid container style={{ marginBottom: 16 }} spacing={5}>
        <Grid item xs>
          <StockCard
            icon={AddShoppingCartIcon}
            title="TOTAL"
            subtitle="112 THB"
            color="#00a65a"
          />
        </Grid>

        <Grid item xs>
          <StockCard
            icon={NewReleasesIcon}
            title="EMPTY"
            subtitle="9 PCS."
            color="#f39c12"
          />
        </Grid>

        <Grid item xs>
          <StockCard
            icon={AssignmentReturnIcon}
            title="RETURN"
            subtitle="1 PCS."
            color="#dd4b39"
          />
        </Grid>

        <Grid item xs>
          <StockCard
            icon={StarIcon}
            title="DISCOUNT"
            subtitle="5 PCS."
            color="#00c0ef"
          />
        </Grid>
      </Grid>
      <MaterialTable
        id="root_stock"
        title="Stock"
        columns={columns}
        actions={actions}
        data={stockReducer.result ? stockReducer.result : []}
        onRowClick={(evt, selectedRow) => setSelectedRow(selectedRow)}
        options={{
          pageSize: 5,
          rowStyle: rowData => ({
            backgroundColor:
              selectedRow && selectedRow.tableData.id === rowData.tableData.id
                ? "#EEE"
                : "#FFF"
          })
        }}
        components={{
          Toolbar: props => (
            <div>
              <MTableToolbar {...props} />
              <div style={{ padding: "0px 10px" }}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/stock/create"
                >
                  Create
                </Button>
              </div>
            </div>
          )
        }}
      />

      {/* Dialog */}
      {showDialog()}
    </div>
  );
};
