const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client')
const bodyParser = require('body-parser');

const prisma = new PrismaClient();

var corsOptions = {
  origin: ["*"],
  optionsSuccessStatus: 200 // For legacy browser support
}

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use(express.static(path.join(__dirname, "/../fe/dist")));

app.get('/test', (req, res) => {
  res.send('Successful response.');
});

app.post('/api/notifications/subscribe', async (req, res) => {
  const token = req.body.token;
  console.log('Received token: ', token);
  if (!token) {
    res.send({
      success: false,
      message: "No token provided"
    });
  } else {

    let vendors = {
      amd: false,
      nvidia: false
    };

    try {
      // const docRef = await addDoc(collection(db, "subscribers"), {
      //   token: token
      // });
      console.log('Checking if token exists');

      const tokenExists = await prisma.subscriber.findUnique({
        where: {
          id: token
        }
      });

      console.log(tokenExists);

      if (!tokenExists) {
        vendors.amd = true;
        vendors.nvidia = true;
        console.log("no existing token, creating one");

        const subscriber = await prisma.subscriber.create({
          data: {
            id: token,
            registerTime: new Date(),
            lastUpdated: new Date(),
            userAgent: req.get('User-Agent'),
            subscribeVendors: {
              amd: true,
              nvidia: true
            }
          }
        });
      } else {
        console.log("existing token");
        vendors.amd = tokenExists.subscribeVendors.amd;
        vendors.nvidia = tokenExists.subscribeVendors.nvidia;
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    res.send({
      success: true,
      token: req.body.token,
      vendors: vendors
    })
  }
});

app.post('/api/notifications/update', async (req, res) => {
  const token = req.body.token;
  let amd = req.body.amd;
  let nvidia = req.body.nvidia;

  if (typeof amd == 'string') {
    amd = amd == "true";
  }

  if (typeof nvidia == 'string') {
    nvidia = nvidia == "true";
  }

  if (!token) {
    res.send({
      success: false,
      message: "No token provided"
    });
    return;
  }
  const newData = {
    lastUpdated: new Date(),
    userAgent: req.get('User-Agent'),
    subscribeVendors: {
      amd: amd,
      nvidia: nvidia
    }
  };
  await prisma.subscriber.update({
    where: {
      id: token
    },
    data: newData
  })
  res.send({
    success: true,
    token: req.body.token
  })
});

app.route("/*").get(function (req, res) {
  res.sendFile(path.join(__dirname + "/../fe/dist/index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('Example app is listening on port ' + PORT));
