# 🚗 AutoAxis  
*A modern full-stack car marketplace built with the MERN stack*

> Buy, sell, and manage cars with a beautiful, fast, and responsive web experience.

---


## 🔗 Live Demo
### ``` https://auto-axis-cp.vercel.app ```
---

## ✨ Features

- 🔐 **User Authentication** – Signup, Login, Logout with JWT-secured sessions  
- 🚙 **List a Car for Sale** – Upload car details and images via Cloudinary  
- 🛒 **Browse Marketplace** – Filter & sort by make, model, year, price, and more  
- 🖼️ **Image Carousel** – View cars in a sleek image slider  
- ✏️ **Manage Listings** – Update or delete your own cars  
- 🌙 **Dark Mode UI** – Built with Tailwind CSS & shadcn/ui  
- ☁️ **Cloudinary Integration** – For secure and fast image uploads  
- 🛡️ **Secure Backend** – JWT Auth, Multer, Express, and MongoDB

---

## 🧱 Tech Stack

### 🔧 Frontend
- React + Vite  
- Tailwind CSS + shadcn/ui  
- React Router  
- React Hot Toast  

### 🖥️ Backend
- Node.js + Express  
- MongoDB + Mongoose  
- JWT (Authentication)  
- Multer (File Uploads)  
- Cloudinary (Image Hosting)  

---

## 📁 Folder Structure

```bash
autoAxis/
├── client/                  # Frontend (React)
│   ├── src/
│   │   ├── components/      # Reusable React Components
│   │   ├── App.jsx          # Main App Component
│   │   └── index.css        # Global Styles
│   ├── public/
│   └── package.json

├── server/                  # Backend (Node.js + Express)
│   ├── models/              # Mongoose Models
│   ├── routes/              # API Routes (Auth, Cars)
│   ├── controllers/         # Route Controllers
│   ├── middlewares/         # JWT Auth, File Upload Middleware
│   ├── utils/               # Cloudinary Config
│   └── index.js             # Server Entry Point

└── README.md                # Project Readme
```
---
## 🚀 Getting Started

###  1. Clone the Repository

```bash
git clone https://github.com/Chakradhar-0208/autoAxis.git
cd autoAxis
```

### 2. Install Dependencies
#### 📦 Frontend
```bash
cd client
npm install
```

#### 🖥️ Backend
```bash
cd ../server
npm install
```


### 3. Setup Environment Variables

*Create a ```.env``` file inside the ```server/``` directory:*

```MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
CLIENT_URL=http://localhost:5173
```



### 4.Run the Application
#### Start Backend
```bash 
npm start
```
#### Start Frontend
```bash 
cd ../client
npm run dev
```

### 5. Open in Browser
```bash 
http://localhost:5173
```
---

## 💡 Usage Guide
 
 
- 🔐 Sign up or log in 

- 🚘 List your car for sale with detailed info & images

- 🧭 Browse and filter through listings

- 🛠️ Update or delete your own car listings

---
## 📝 License

This project is licensed under the MIT License.

---
## 🤝 Contributing

Found a bug or want to contribute features?

Please open an issue or submit a pull request on GitHub!

---

## 📷 UI Sneak Peek (Optional)
> **Screenshots** 
