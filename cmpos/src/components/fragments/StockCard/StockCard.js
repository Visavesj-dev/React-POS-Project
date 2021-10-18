import React from "react";
import Card from "@material-ui/core/Card";
import { Typography, Grid, CardContent } from "@material-ui/core";

const StockCard = props => {
  return (
    <Card>
      <Grid container style={{ minHeight: 70 }}>
        <Grid item style={{ flexGrow: 1, padding: 24 }}>
          <Typography variant="h4" color="textPrimary">
            {props.title}
          </Typography>
          <Typography variant="h5" color="textSecondary">
            {props.subtitle}
          </Typography>
        </Grid>

        <Grid
          item
          style={{
            backgroundColor: props.color,
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: 75
          }}
        >
          {React.createElement(props.icon, { fontSize: "large" })}
        </Grid>
      </Grid>
    </Card>
  );
};

export default StockCard;
