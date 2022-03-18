## Background

whatsGood, is a platform for users to share lists of books. Users can create their own lists, follow other users, or follow other lists.

## Find out [whatsGood](https://whats-good-now.herokuapp.com/#/) today!

## Technologies Used

- MongoDB
- MongooseODM
- Express
- React
- Node
- Google Books API
- Webpack
- Babel
- Bcrypt
- Passport
- Passport-JWT
- JSON Web Token
- Validator
- Heroku
- Git feature branching workflow
- Trello KanBan project management 
- Icons from [Font Awesome](https://fontawesome.com/)

## Technical Challenge 

### Backend Routing 

MongoDB is a NoSQL database.

```js
router.get('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId)
            .populate({
                path: "followingLists",
                model: "List",
                populate: {
                    path: "bookItems",
                    model: "Book"
                },
            })
            .populate({
                path: "followingLists",
                model: "List",
                populate: {
                    path: "followers",
                    model: "User"
                },
            })
            .populate({
                path: "followingLists",
                model: "List",
                populate: {
                    path: "owner",
                    model: "User"
                },
            })

            .populate({
                path: "myLists",
                model: "List",
                populate: {
                    path: "followers",
                    model: "User"
                },
            })
            .populate({
                path: "myLists",
                model: "List",
                populate: {
                    path: "bookItems",
                    model: "Book"
                },

            })

            .populate({
                path: "followingUsers",
                model: "User",
                populate: {
                    path: "myLists",
                    model: "User"
                },
            })
            .populate({
                path: "followingUsers",
                model: "User",
                populate: {
                    path: "followingLists",
                    model: "List"
                },
            })
            .populate({
                path: "followingUsers",
                model: "User",
                populate: {
                    path: "followingUsers",
                    model: "User"
                },
            })

        res.json(user)
    } catch (e) {
        res.status(404).json({ user: 'No user found' })
    }
})
```

## Feature

### Search bar with throttled API requests

Users can use the search bar to search for books or other users. The search bar throttles the API request and maps through the JSON response. When user clicks user or book, they are taken to the approriate show page.

```js
  const fetch = React.useMemo(
    () =>
      throttle((request) => {
        fetchBooksAndUsers(request)
          .then(json => {
            return setOptions(Object
              .values(json.data)
              .reverse()
              .flat()
              .map((res) => {
                if (res.volumeInfo) {
                  return ({
                    id: res.id,
                    volumeInfo: res.volumeInfo
                  });
                } else if (res.username) {
                  return ({
                    id: res._id,
                    username: res.username
                  });
                } else {
                  return null;
                }
              })
            )
          });
      }, 200),
    [],
  );
```

