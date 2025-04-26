# MultiPlayerDrawing - Collaborative Whiteboard

A real-time collaborative whiteboard application that allows multiple users to draw together simultaneously. Built with React for the frontend and Node.js with Socket.IO for real-time communication.

## 🎨 Features

- **Real-time Drawing Collaboration**: Multiple users can join the same room and draw simultaneously
- **Drawing Tools**: Pencil, line, and rectangle drawing capabilities
- **Color Selection**: Choose from a wide range of colors using the color picker
- **Undo/Redo**: Ability to undo and redo your drawing actions
- **Room Creation**: Create your own drawing room and share the room ID with others
- **Room Joining**: Join existing rooms by entering the room ID
- **Clean Canvas**: Clear the entire canvas with one click

## 📋 Tech Stack

### Frontend
- **React.js**: UI components and state management
- **React Router**: Navigation between pages
- **Socket.IO Client**: Real-time client-server communication
- **RoughJS**: Canvas drawing with a hand-drawn style
- **TailwindCSS**: Styling and responsive design

### Backend
- **Node.js**: Server-side JavaScript runtime
- **Express**: Web application framework
- **Socket.IO**: WebSocket-based real-time communication
- **CORS**: Cross-origin resource sharing

## 🔄 WebSocket Architecture

```
                  +------------------+
                  |                  |
  +---------------+  Socket.IO Server+---------------+
  |               |     (Backend)    |               |
  |               +------------------+               |
  |                                                  |
  |                                                  |
  v                                                  v
+------------------+                         +------------------+
|                  |      WebSockets         |                  |
|   Client 1       | <------------------->   |   Client 2       |
|   (Browser)      |                         |   (Browser)      |
+------------------+                         +------------------+
       ^                                             ^
       |                                             |
       |         Drawing Data Flow                   |
       |                                             |
       v                                             v
+------------------+                         +------------------+
|                  |                         |                  |
|   Canvas         |                         |   Canvas         |
|   Component      |                         |   Component      |
+------------------+                         +------------------+
```

### How WebSockets Work in This Project:

1. **Connection Establishment**:
   - Client connects to the Socket.IO server
   - Server assigns a unique socket ID

2. **Room Management**:
   - User creates a room (uses socket ID as room ID) or joins with an existing room ID
   - Server adds the socket to the specified room using `socket.join(roomId)`

3. **Drawing Data Flow**:
   - When a user draws on the canvas, the drawing data is captured as elements (points, lines, rectangles)
   - The client emits a 'newData' event to the server with the updated elements, user name, and room ID
   - Server broadcasts this data to all clients in the same room using `io.to(room).emit('test', data)`
   - All clients receive the 'test' event and update their canvas accordingly

4. **State Management**:
   - The WhiteBoard component maintains a local state of all drawing elements
   - When drawing data is received from other users, it updates this state
   - The useEffect hook re-renders the canvas when the elements state changes

## 🚀 How to Run the Project

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Frontend Setup
1. Clone this repository
   ```bash
   git clone [repository-url]
   cd MultiPlayerDrawing/practice
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the React development server
   ```bash
   npm start
   ```
   This will run the app in development mode at [http://localhost:3000](http://localhost:3000)

### Backend Setup
1. Navigate to the Backend directory
   ```bash
   cd Backend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the server
   ```bash
   npm start
   ```
   or for development with auto-restart:
   ```bash
   npm run dev
   ```
   The backend server will run on port 5000.

## 📝 How to Use

1. **Create a Room**:
   - Enter your name
   - Click "Generate" to create a room code
   - Click "Create Room"

2. **Join a Room**:
   - Enter your name
   - Enter the room ID you want to join
   - Click "Join Room"

3. **Drawing Tools**:
   - Select a drawing tool (Pencil, Line, Rectangle)
   - Choose a color from the color picker
   - Start drawing on the canvas
   - Use Undo/Redo buttons to correct mistakes
   - Clear Canvas button removes all content

## 🔧 Project Structure

```
MultiPlayerDrawing/
├── Backend/                   # Server-side code
│   ├── index.js               # Socket.IO server setup
│   └── package.json           # Backend dependencies
├── public/                    # Static files
├── src/
│   ├── components/
│   │   ├── CreateRoom.jsx     # Room creation component
│   │   ├── JoinRoom.jsx       # Room joining and drawing interface
│   │   └── WhiteBoard.jsx     # Canvas and drawing implementation
│   ├── App.js                 # Main application component
│   └── index.js               # Entry point
└── package.json               # Frontend dependencies
```

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
