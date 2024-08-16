const express = require("express");
require("./connect/Connect");
// const User = require('./modals/User');
const auth = require('./routes/auth');
const classroom = require('./routes/classroom')

const app = express();

// Init middleware
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("<h2>This Is Backend </h2>")
})

app.use('/api/k1', auth);
app.use('/api/k2', classroom);

// const createPrincipalAccount = async () => {
//     const principalEmail = 'principal@classroom.com';
//     const principalPassword = 'Admin';
//     const existingPrincipal = await User.findOne({ email: principalEmail });
  
//     if (!existingPrincipal) {
//       const salt = await bcrypt.genSalt(10);
//       const hashedPassword = await bcrypt.hash(principalPassword, salt);
//       const principal = new User({
//         email: principalEmail,
//         password: hashedPassword,
//         role: 'Principal'
//       });
//       await principal.save();
//       console.log('Principal account created');
//     } else {
//       console.log('Principal account already exists');
//     }
//   };

app.listen(1000, ()=>{
    console.log("Running")
    //  await createPrincipalAccount();
})