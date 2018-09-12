const massive = require('massive');

const getAllPics = (req, res, next) => 
{
  const dbInst = req.app.get('db');
  dbInst.get_photos()
    .then(response => res.status(200).send(response))
    .catch(err => console.log(`Error in get_photos() - ${err}`))
}

const getPhoto = (req, res, next) =>
{
  const dbInst = req.app.get('db');
  dbInst.get_photo(req.params.pid)
    .then(response => res.status(200).send(response))
    .catch(err => console.log(`Error in get_photo() - ${err}`))
};

//requires an image url (up to 200 char) and an integer representing the user's id
const addPhoto = (req, res, next) =>
{
  const dbInst = req.app.get('db');
  const {url, uid} = req.body;
  dbInst.post_photo([url, uid]) //TODO - user id is set to 1 for now, but change this when there are users
    // .then(response => res.status(200).send(response))
    .then(response => res.status(200).send(response))
    .catch(err => console.log(`Error in add_photo() - ${err}`))
};

const editTitle = (req, res, next) =>
{
  //TODO: Server does not complain if there is no image with a matching ID
  const dbInst = req.app.get('db');
  const {pid, title} = req.body;
  dbInst.edit_photo_title([pid, title])
    .then(response => res.sendStatus(200))
    .catch(err => console.log(`Error in edit_photo_title() - ${err}`))
}

// This function adds new tags, but it does not delete them.
// This should only be used in conjunction with NewUploadForm component
// TODO: Make  this into a general purpose tag editor
const editTags = (req, res, next) =>
{
  // Declare db instance and dereference variables
  const dbInst = req.app.get('db');
  const {pid, tags} = req.body;
  console.log('pid', pid);
  console.log('tags', tags);

  // Assume that the user has sent a large number of tags.
  // Handling an arbirtary number of values in SQL is really difficult, so instead of handling that in SQL, I'll do it in JS
  // Step 1: Go through the new tags and check if any of them need to be added to the tag reference table
  massive(process.env.DB_CONNECTION)
    .then(db => db.test_table.find() //get a copy of the test_table
    .then(tagObjArray => { //reference each entry in the table
        // check the database and filter out all user tags that already exist in the database
      let noDupes = tags.filter(usersTag => {
        // This DOES NOT remove duplicates in the user's input
        return !tagObjArray.some(e => (e.tag_name === usersTag) || (usersTag === ''));
      })
      //Step 2: Before defining noDupes, filter out all duplicate tags
      .filter((e, i, self) => i === self.indexOf(e));
      // At this point, the user's list is pared down to only the items that are not in the db and not duplicates of each other
      // Step 3: construct a query
      console.log("noDupes", noDupes);
      console.log("noDupes", noDupes);
      if(noDupes.length)
      {
        let queryStr = "INSERT INTO test_table (tag_name) VALUES ";
        let queryStrValues = noDupes.map(e => `('${e}')`);
        queryStr += queryStrValues.join(",") + ";";
        console.log("queryString: ", queryStr);
        db.query(queryStr).then(response => res.sendStatus(200))
      }
      else { res.sendStatus(200) }
    })
    )
    .catch(console.log)
  // console.log("User Input:", req.body);
  // dbInst.edit_photo_tags([pid, tags])
  //   .then(response => {
  //     console.log("EditTags2", response);
  //     return res.sendStatus(200);
  //   })
  //   .catch(err => {
  //     console.log(`Error in edit_photo_tags() - ${err}`)
  //     return res.sendStatus(400);
  //   })
}

module.exports =
{
  getAllPics,
  getPhoto,
  addPhoto,

  //pic data editing
  editTitle,
  editTags
};