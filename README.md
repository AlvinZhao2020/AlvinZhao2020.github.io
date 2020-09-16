[See it live](https://alvinzhao2020.github.io/JS-GO-Game/)


## Overview
JS GO is a Javascript webpage game, its rules are as same as an tradational Chinese Go 
game. In this game there are two models a player can pick ,one is to play with AI, the
other is to play with another player. one player takes black and the other takes white,
black always go first. Who gets the first 5 same-color pieces in a row will win the game.like this pic shows below

<img src="images/Screen Shot 2020-09-16 at 2.31.24 PM.png" width="500" title="JS GO">

## Features

### Search Items

Users can search for their favorite foods and leave comments!

![Alt Text](https://github.com/xdeng9/sunday-market/blob/master/frontend/src/image/search.gif?raw=true)

### Account Management

User can list new products available for sale.

![Alt Text](https://github.com/xdeng9/sunday-market/blob/master/frontend/src/image/account.gif?raw=true)

## Code Snippets

We use AWS S3 to support image storage and limit the size of the files allowed to be uploaded.

```javascript
  const imgUpload = multer({
    storage: multerS3({
      s3: s3,
      bucket: "sundaymarketbucket",
      acl: "public-read",
      key: function (req, file, cb) {
        cb(
          null,
          path.basename(file.originalname, path.extname(file.originalname)) +
            "-" +
            Date.now() +
            path.extname(file.originalname)
        );
      },
    }),
    limits: { fileSize: 3000000 }, 
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
    },
  }).single("listingImage");
```

## Functionality and MVP
- [ ] User auth. Login and sign up.
- [ ] Users can view a list of homemade food in their local area and seller's information
- [ ] Logged in users can create, update, and delete their listings
- [ ] Sellers have their own profile page to manage all the listings
- [ ] Logged in users can comment on the listings.
- [ ] Users able to search for listings.

## Bonus Features
- [ ] Users able to select locations
- [ ] Rating system. 