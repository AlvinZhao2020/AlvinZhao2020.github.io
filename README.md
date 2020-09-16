[See it live](https://alvinzhao2020.github.io/JS-GO-Game/)


## Overview
Sunday Market is a web app that allows people to buy and sell homemade food in their local communities. Users
also have the option to list items at no cost so people can try their food for free!

<img src="https://github.com/xdeng9/sunday-market/blob/master/frontend/src/image/sunday-logo.png?raw=true" width="200" height="200" title="Sunday Market">

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