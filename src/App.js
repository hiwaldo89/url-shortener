import { useState } from "react";
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard"
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [url, setUrl] = useState();
  const [loading, setLoading] = useState(false);
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setCopied(false);
    axios.post("/api/shorten", { url }).then(res => {
      setShortUrl(`${window.location}api/${res.data.shortUrl}`);
    }).catch(err => {
      console.log("err: ", err);
    }).finally(() => {
      setLoading(false);
    })
    console.log("submit");
  }

  return (
    <div className="container py-5">
      <h1>Url Shortener</h1>
      <div className="row">
        <div className="col col-lg-6">
          <form onSubmit={handleSubmit}>
            <label className="form-label" for="url">Enter url</label>
            <input className="form-control mb-3" type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
            <button type="submit" className="btn btn-primary" disabled={loading}>Shorten url</button>
          </form>
          {shortUrl && (
            <CopyToClipboard text={shortUrl} onCopy={() => setCopied(true)}>
              <div className="alert alert-success mt-4 d-flex" style={{cursor: "pointer"}}>
                <span>{shortUrl}</span>
                <span className="ms-auto">({copied ? "Copied!" : "Click to copy"})</span>
              </div>
            </CopyToClipboard>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
