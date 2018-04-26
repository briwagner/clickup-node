const express = require('express');
const url = require('url');
const bodyParser = require('body-parser');
const axios = require('axios');

var app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('The home page for clickup tickets');
})

app.get('/page', (req, res) => {
  res.send('the page page.')
})

app.get('/projects', (req, res) => {
  //'https://api.clickup.com/api/v1/space/61186/project');
  getProjects()
    .then((d) => {
      res.send(d.data);
    })
    .catch((e) => {
      console.log(e);
    });
})

app.get('/tasks/:id', (req, res) => {
  const id = req.params.id;
  getTasks(id).
    then((d) => {
      res.send(d.data);
    })
    .catch((e) => {
      console.log(e);
    });
})

/**
 * @return Axios request
 */
function getProjects() {
  const options = {
    baseURL: 'https://api.clickup.com',
    url: '/api/v1/space/61186/project',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'pk_GBDHRAVJJEEQ8Q3JSZKY3C2QHQ1NELWE'
    }
  }
  return axios.request(options);
}

/**
 *
 * @param {integer} id List ID, i.e. open
 *
 * @return Axios request
 */
function getTasks(id) {
  const options = {
    baseURL: 'https://api.clickup.com',
    url: '/api/v1/team/55958/task',
    method: 'GET',
    params: {
      list_ids: [id]
    },
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'pk_GBDHRAVJJEEQ8Q3JSZKY3C2QHQ1NELWE'
    }
  }
  return axios.request(options);
}

app.listen(4220);