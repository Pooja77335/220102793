import React, { useState } from "react";
import { Container, AppBar, Toolbar, Button } from "@mui/material";
import URLForm from "./components/URLForm";
import URLList from "./components/URLList";
import Stats from "./components/Stats";
import { LoggingProvider, useLogger } from "./context/LoggingContext";


const RedirectHandler = ({ urls }) => {
const { code } = useParams();
const navigate = useNavigate();
const { log } = useLogger();


React.useEffect(() => {
const match = urls.find((u) => u.shortUrl.endsWith(code));
if (match) {
log("Redirected", { code, to: match.longUrl });
window.location.href = match.longUrl;
} else {
navigate("/");
}
}, [code, urls, navigate, log]);


return null;
};


function App() {
const [shortenedUrls, setShortenedUrls] = useState([]);
const [stats, setStats] = useState([]);


const handleShorten = (urls) => {
const newUrls = urls.map((u) => {
const code = u.shortcode || Math.random().toString(36).substring(2, 7);
const expiry = new Date(Date.now() + (u.validity ? u.validity : 30) * 60000);
return {
...u,
shortUrl: `${window.location.origin}/${code}`,
expiry: expiry.toLocaleString(),
};
});
setShortenedUrls([...shortenedUrls, ...newUrls]);
setStats([...stats, ...newUrls.map(u => ({ shortUrl: u.shortUrl, clicks: 0, created: new Date().toLocaleString(), expiry: u.expiry, clickDetails: [] }))]);
};


return (
<LoggingProvider>
<Router>
<AppBar position="static">
<Toolbar>
<Button color="inherit" component={Link} to="/">Shortener</Button>
<Button color="inherit" component={Link} to="/stats">Statistics</Button>
</Toolbar>
</AppBar>
<Container style={{ marginTop: "20px" }}>
<Routes>
<Route path="/" element={<><URLForm onShorten={handleShorten} /><URLList urls={shortenedUrls} /></>} />
<Route path="/stats" element={<Stats stats={stats} />} />
<Route path="/:code" element={<RedirectHandler urls={shortenedUrls} />} />
</Routes>
</Container>
</Router>
</LoggingProvider>
);
}


export default App;