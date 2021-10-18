import * as stockActions from "./../../../actions/stock.action";

import React from "react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { Formik, Form, Field } from "formik";

import {
  fieldToTextField,
  TextField,
  TextFieldProps,
  Select,
  Switch
} from "formik-material-ui";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { CardHeader } from "@material-ui/core";

import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    width: "80%",
    marginTop: 100
  },
  field: {
    marginTop: 16
  },
  card: {
    padding: 20
  }
}));

export default props => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const showForm = ({ values, setFieldValue }) => {
    return (
      <Form>
        <Card className={classes.card}>
          <CardContent>
            <Typography gutterBottom variant="h3">
              Create Stock
            </Typography>
            <Button
              onClick={() => {
                setFieldValue("name", "");
                setFieldValue("stock", 0);
                setFieldValue("price", 0);
                setFieldValue("file", null);
                setFieldValue("file_obj", null);
              }}
            >
              RESET
            </Button>
            <Field
              className={classes.field}
              fullWidth
              component={TextField}
              name="name"
              type="text"
              label="Name"
            />
            <br />
            <Field
              className={classes.field}
              fullWidth
              component={TextField}
              name="price"
              type="number"
              label="Price"
            />

            <Field
              className={classes.field}
              fullWidth
              component={TextField}
              name="stock"
              type="number"
              label="Stock"
            />

            <div>{showPreviewImage(values)}</div>

            <div className={classes.field}>
              <img
                src={`${process.env.PUBLIC_URL}/images/ic_photo.png`}
                style={{ width: 25, height: 20 }}
              />
              <span style={{ color: "#00B0CD", marginLeft: 10 }}>
                Add Picture
              </span>
              <input
                type="file"
                onChange={e => {
                  e.preventDefault();
                  setFieldValue("file", e.target.files[0]); // for upload
                  setFieldValue(
                    "file_obj",
                    URL.createObjectURL(e.target.files[0])
                  ); // for preview image
                }}
                name="image"
                click-type="type1"
                className="picupload"
                multiple
                accept="image/*"
                id="files"
                style={{ padding: "20px 0" }}
              />
            </div>
          </CardContent>
          <CardActions>
            <Button variant="contained" color="primary" type="submit">
              Create
            </Button>
            <Button component={Link} to="/stock" color="default" raised>
              Cancl
            </Button>
          </CardActions>
        </Card>
      </Form>
    );
  };

  const showPreviewImage = values => {
    if (values.file_obj) {
      return <img src={values.file_obj} style={{ height: 100 }} />;
    }
  };

  return (
    <Container className={classes.root}>
      {/* Main content */}

      <div className="box-body" style={{ marginTop: 30 }}>
        <Formik
          initialValues={{ name: "", stock: 10, price: 90 }}
          onSubmit={(values, { setSubmitting }) => {
            let formData = new FormData();
            formData.append("name", values.name);
            formData.append("price", values.price);
            formData.append("stock", values.stock);
            formData.append("image", values.file);
            dispatch(stockActions.addProduct(formData, props.history));
            setSubmitting(false);
          }}
        >
          {props => showForm(props)}
        </Formik>
      </div>
      {/* /.content */}
    </Container>
  );
};
