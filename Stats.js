import React from "react";
import { Card, CardContent, Typography } from "@mui/material";


const Stats = ({ stats }) => {
return (
<div>
{stats.map((item, index) => (
<Card key={index} style={{ margin: "10px 0" }}>
<CardContent>
<Typography variant="body1">Short URL: {item.shortUrl}</Typography>
<Typography variant="body2">Clicks: {item.clicks}</Typography>
<Typography variant="body2">Created: {item.created}</Typography>
<Typography variant="body2">Expiry: {item.expiry}</Typography>
{item.clickDetails && item.clickDetails.map((c, i) => (
<Typography key={i} variant="caption">
Click at {c.timestamp}, from {c.source}, location: {c.location}
</Typography>
))}
</CardContent>
</Card>
))}
</div>
);
};


export default Stats;