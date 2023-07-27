# -------------BikeService_Application----------------------

# 1. Install the frontend dependencies
cd frontend
npm install

# 2. Install the backend dependencies
cd backend
npm install

# 3. Configuring the Backend
   # create .env file in the backend (it should clude these items)
     URL = "mongodb://0.0.0.0:27017/bikeservicebooking" (mongodb connection url)
     USER_EMAIL = provide the admin gmail here to get notification
     NODEMAILER_PASS = provide the gmail App password here

# 4. Testing Locally
  # Test frontend
      cd frontend
      npm run dev
      // access the frontend on: 'http://ocalhost:5173'

  # Test backend
    open another terminal
    cd backend
    npm start
    // access the backend on: 'http://localhost:3000'

# 5. To access Admin
    url: '/admin'
  # for login 
    email:'admin@gmail.com'
    password:'12345'

# 6. Data base schema design
    url : https://drive.google.com/file/d/1XuT-MgZRH97JDPcNQ_W--krqgeQVPMka/view?usp=sharing

# 7. Sample Data
    url : https://drive.google.com/drive/folders/1kucJNxRzgn1WTpAVP1XliwD6OTUc6ZiU?usp=drive_link








    
      
