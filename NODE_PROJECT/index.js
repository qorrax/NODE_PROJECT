
// create server here

import server  from "./api/server.js";

const PORT = 9000;

server.listen(PORT, () => console.log(`\n** server is listening  on port ${PORT} **\n`) );