import React, { useState } from "react";
const URLForm = ({ onShorten }) => {
const [urls, setUrls] = useState([{ longUrl: "", validity: "", shortcode: "" }]);
const { log } = useLogger();


const handleChange = (index, field, value) => {
const newUrls = [...urls];
newUrls[index][field] = value;
setUrls(newUrls);
};


const addField = () => {
if (urls.length < 5) setUrls([...urls, { longUrl: "", validity: "", shortcode: "" }]);
};


const handleSubmit = (e) => {
e.preventDefault();
onShorten(urls);
log("URLs submitted for shortening", urls);
};


return (
<form onSubmit={handleSubmit}>
<Typography variant="h5">Shorten up to 5 URLs</Typography>
{urls.map((url, index) => (
<Grid container spacing={2} key={index} style={{ marginBottom: "10px" }}>
<Grid item xs={12} sm={6}>
<TextField
label="Long URL"
fullWidth
required
value={url.longUrl}
onChange={(e) => handleChange(index, "longUrl", e.target.value)}
/>
</Grid>
<Grid item xs={12} sm={3}>
<TextField
label="Validity (mins)"
type="number"
fullWidth
value={url.validity}
onChange={(e) => handleChange(index, "validity", e.target.value)}
/>
</Grid>
<Grid item xs={12} sm={3}>
<TextField
label="Custom Shortcode"
fullWidth
value={url.shortcode}
onChange={(e) => handleChange(index, "shortcode", e.target.value)}
/>
</Grid>
</Grid>
))}
<Button onClick={addField} disabled={urls.length >= 5}>+ Add URL</Button>
<Button type="submit" variant="contained" color="primary">Shorten</Button>
</form>
);
};


export default URLForm;