const express = require('express');
const url = require('url');
const bodyParser = require('body-parser');
const axios = require('axios');
const Task = require('./Task');
const Project = require('./Project');

const creds = require('./creds');

var app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  let links = [
    '<li><a href="/projects">Projects</a></li>'
  ];
  res.send(render(links.join("")));
})

/**
 * Get Projects.
 */
app.get('/projects', (req, res) => {
  getProjects(creds.spaceID)
    .then((d) => {
      let projects = d.data.projects.map((x) => new Project(x));
      let markup = projects.map((y) => y.markup());
      res.send(render(markup.join("")));
    })
    .catch((e) => {
      console.log(e);
      res.send('Error ' + e.response.statusText);
    });
})

/**
 * Get tasks for a List.
 *
 * @param number id ID of project list.
 */
app.get('/list/:id', (req, res) => {
  const id = req.params.id;
  getTasks(creds.teamID, id).
    then((d) => {
      if (d.data.tasks.length > 0) {
        let tasks = d.data.tasks.map((x) => new Task(x));
        let taskMarkup = tasks.map((y) => y.markup());
        res.send(render(taskMarkup.join("")));
      } else {
        res.send('No tasks');
      }
    })
    .catch((e) => {
      res.send('Failed to get page: ' + e.response.statusText);
    });
})

/**
 *
 * @param {string} content HTML markup.
 *
 * @return {string}
 */
function render(content) {
  return `
  <html>
    <body>
      ${content}
    </body>
  </html>`;
}

/**
 * @param {integer} spaceID
 *
 * @return Axios request
 */
function getProjects(spaceID) {
  let url = `/api/v1/space/${spaceID}/project`;
  const options = {
    baseURL: 'https://api.clickup.com',
    url: url,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': creds.privateKey
    }
  }
  return axios.request(options);
}

/**
 * @param {integer} teamID
 *
 * @param {integer} id List ID, i.e. open
 *
 * @return Axios request
 */
function getTasks(teamID, id) {
  let url = `/api/v1/team/${teamID}/task`;
  const options = {
    baseURL: 'https://api.clickup.com',
    url: url,
    method: 'GET',
    params: {
      list_ids: [id]
    },
    headers: {
      'Content-Type': 'application/json',
      'Authorization': creds.privateKey
    }
  }
  return axios.request(options);
}

app.listen(80);