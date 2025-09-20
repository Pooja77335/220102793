import React from "react";
import { Card, CardContent, Typography, Link } from "@mui/material";


const URLList = ({ urls }) => {
return (
<div>
{urls.map((url, index) => (
<Card key={index} style={{ margin: "10px 0" }}>
<CardContent>
<Typography variant="body1">Original: {url.longUrl}</Typography>
<Typography variant="body2">
Short: <Link href={url.shortUrl}>{url.shortUrl}</Link>
</Typography>
<Typography variant="body2">Expiry: {url.expiry}</Typography>
</CardContent>
</Card>
))}
</div>
);
};


export default URLList;