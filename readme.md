**Chat Server/Client**
# the client should:
- console.log a ‘connected’ message when it has successfully connected to the server
- console.log any messages received from the server.
- Forward input from stdin

# the server should:
- Uniquely identify every new client connection.

# When a new client connects:
- Send a welcome message to the newly connected client
- Send a notification to all other clients indicating that a new user has connected
- Log the connection message to a chat.log file

# When a client sends a message:
- Rebroadcast the client’s message to all clients (excluding the client that sent the message), include the name of the client that sent the message. E.g. Client1: Hi All!
- Log the message to chat.log

# When a client disconnects your server should:
- Remove the client from the list of connected clients
- Send a notification to all other clients indicating that the user has disconnected
- Log the disconnection message to chat.log


# consider to install
- npm install --save-dev nodemon
- git init
- echo 'node_modules/' >.gitignore
- npm init
- git add .
- git commit -m 'git and app init setup'

if needed:
- npm i csv-parser csv-writer nodemailer