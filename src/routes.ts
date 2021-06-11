import http from "http";

const SUBMIT_FORM_PATH = "/submit-form";

const requestHandler = (
  req: http.IncomingMessage,
  res: http.ServerResponse
) => {
  const { method, url } = req;

  if (method === "POST" && url === SUBMIT_FORM_PATH) {
    const reqDataChunks: any[] = [];
    req.on("data", (chunk) => reqDataChunks.push(chunk));
    return req.on("end", () => {
      const reqData = Buffer.concat(reqDataChunks).toString();
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(`
        <html>
          <h1>Data received!</h1>
          <p>${reqData}</p>
          <a href="/">Back To Home</a>
        </html>`);
      return res.end();
    });
  } else {
    return res.end(
      `<html>
        <form action="${SUBMIT_FORM_PATH}" method="post">
          Message: <input name="message" /> 
          <button type="submit">Send Message</button>
        </form>
      </html>`
    );
  }
};

// module.exports = {
//   requestHandler,
// };

// module.exports = requestHandler;

export default { requestHandler };
