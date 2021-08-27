# <center>Axios</center>

## Importing axios

```js
import axios from "./axios";
```

## Example

```js
import axios from "./axios";

// axios.<method> will now provide autocomplete and parameter typings
```

#### Performing a `GET` request

```js
// Make a request for a user with a given ID
axios
    .get("/user?ID=12345")
    .then(function ({ error, response }) { // note the object destructuring
        if(error) {
            // handle error
            console.log(error);
        } else {
            // handle success
            console.log(response);
        }
    })
// Optionally the request above could also be done as'
axios.get("/user",
    params: {
        ID: 12345,
    },
).then(function ({ error, response }) {
    if(error) {
        // handle error
        console.log(error);
    } else {
        // handle success
        console.log(response);
    }
});

// Want to use async/await? Add the `async` keyword to your outer function/method.
async function getUser() {
        const { error, response } = await axios.get("/user?ID=12345");
        console.log(error, response);
    }
}
```

#### Performing a `POST` request

```js
axios
    .post("/user", {
        firstName: "Fred",
        lastName: "Smith",
    })
    .then(function ({ error, response }) {
        console.log(error, response);
    });
```

Performing multiple concurrent requests

```js
function getUserAccount() {
    return axios.get("/user/12345");
}

function getUserPermissions() {
    return axios.get("/user/12345/permissions");
}

Promise.all([getUserAccount(), getUserPermissions()]).then(function (results) {
    const acct = results[0].response;
    const perm = results[1].response;
});
```

##### axios(url[, config])

```js
// Send a GET request (default method)
axios("/user/12345");
```

### Request method aliases

For convenience aliases have been provided for all supported request methods.

##### axios.request(config)

##### [axios.get(url, params[, config])](#performing-a-get-request)

##### [axios.delete(url[, config])](#performing-a-post-request)

##### axios.head(url[, config]) -

Returns `Response`

##### axios.options(url[, config])

##### axios.post(url[, data[, config]])

##### axios.put(url[, data[, config]])

##### axios.patch(url[, data[, config]])
