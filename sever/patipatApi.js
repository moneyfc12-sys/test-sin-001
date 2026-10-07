import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import db from './config/firebase.js';

const app = express();
const port = 2006;

app.use(cors());
app.use(bodyParser.json());

const myShops =[
    {
    shopId: 100,
    shopName : "Adides",
    shopType : "Fashion",
    shopLoc : {lat:100,lon:150},
    shopStatus: true
    },
    {
    shopId: 200,
    shopName : "Bata",
    shopType : "Shoes",
    shopLoc : {lat:180,lon:190},
    shopStatus: true
    },
    {
    shopId: 300,
    shopName : "Nike",
    shopType : "Clothes",
    shopLoc : {lat:130,lon:290},
    shopStatus: true
    }
];


app.get('/api/shops', async(req, res) => { 
    try{
        // คำสั่ง: สำหรับการอ่านหรือดึงข้อมูลจาก Documents ที่จัดเก็บภายใน Collection
        const snapshot = await db
            .collection("shops_10030")
            .orderBy("shopName", "desc")
            .get();

        const shops =  snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));
        res.json(shops);
    } catch (error){
        res.statusCode(500).json(
            {
                message: "FAILED: การอ่านข้อมูล shops มีปัญหากรุณาตรวจสอบ",
                error: error.message
            }
        )
    }});
//http: //localhost:2006/
app.get('/',(req,res)=> {
    res.send('<h1>Web Programming in 2/2569.</h1>');
});

app.get('/api/shops/:id', async (req, res) => { 
    try{
    const doc = await db
        .collection("shops_10030")
        .doc(req.params.id)
        .get();

    res.json(
        {
            id: doc.id,
            ...doc.data()
        }
    )
    } catch (error){
        res.status(500).json(
            {
                message: "FAILED: การอ่านข้อมูล shops ด้วยรหัสร้านค้า (shopId) มีปัญหา กรุณาตรวจสอบ",
                error: error.message
            }
        )
    }
});

app.get('/shops{/:shopId}',(req,res)=>{
    const {shopId} = req.params;
    res.set('Content-type','application/json');
    if(isNaN(shopId)){
        res.send(myShops);
    }else{
        const shopItem = myShops.filter(
            shop => {return shop.shopId === Number(shopId)}
        );
        res.send(shopItem[0]);
    }
    //res.set('Content-type','application/json');
/*    const shopItems = myShops.map(
        shop => {
            `<b>Shop ID: </b>${shop.shopId}
            <br/><b>Shop Name: </b>${shop.shopName}
            <br/><b>Shop Type: </b>${shop.shopType}
            <br/><b>Shop loc: </b>Lat = ${shop.shopLoc.lat}, Lon = ${shop.shopLoc.lon}
            <br/><b>Shop Status: </b>${shop.shopStatus}
            `
        });
*/
    let myText ='';
    myText+='<h1>Shop information :</h1><hr/>';
    myText+=`<b>Shop ID: </b>${myShops.shopId}`;
    myText+=`<br/><b>Shop Name: </b>${myShops.shopName}`;
    myText+=`<br/><b>Shop Type: </b>${myShops.shopType}`;
    myText+=`<br/><b>Shop loc: </b>Lat = ${myShops.shopLoc.lat}, Lon = ${myShops.shopLoc.lon}`;
    myText+=`<br/><b>Shop Status: </b>${myShops.shopStatus}`;


    res.set('Content-type','text/html');
    res.send(myText);
});

app.listen(port,()=>{
    console.log(`App listening on port ${port}...`);
});