const express=require("express")
const dotenv=require('dotenv')
const mongoose =require('mongoose');


const globalErrorHandler =require('./controller/errorController')
const AppError=require('./utils/AppError')
const authRouter=require('./router/authRouter')


const app=express();
dotenv.config();



mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true 
  }).then(() => console.log('DB connection successful!')).catch((err)=>
    console.log(err)
);



app.use(express.json())
app.use('/api/v1/user',authRouter);

app.all('*',(req,res,next)=>{
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
})
app.use(globalErrorHandler);

const port=process.env.PORT||3002
app.listen(port,
    console.log(`working on port ${port}`)
)