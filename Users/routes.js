// import db from "../Database/index.js";
import * as dao from "./dao.js";

export default function UserRoutes(app) {
  // CRUD
  const fetchAllUsers = async (req, res) => {
    const users = await dao.fetchAllUsers();
    res.json(users);
  };
  const findUserById = async (req, res) => {
    const id = req.params.id;
    const user = await dao.findUserById(id); //db.users.find((user) => user._id === id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send(`User with id ${id} not found`);
    }
  };
  const createUser = (req, res) => {};
  const register = async (req, res) => {
    const newUser = req.body;
    // const existingUser = db.users.find(
    //   (user) => user.username === newUser.username
    // );
    const existingUser = await dao.findUserByUsername(newUser.username);
    if (existingUser) {
      res.status(400).send("Username already exists");
      return;
    }
    // newUser._id = Date.now().toString();
    const createdUser = await dao.createUser(newUser);
    req.session["currentUser"] = createdUser;
    // db.users.push(newUser);
    res.json(createdUser);
  };
  const login = async (req, res) => {
    const credentials = req.body;
    const username = credentials.username;
    const password = credentials.password;
    const user = await dao.findUserByCredentials(username, password);
    // const user = db.users.find(
    //   (user) => user.username === username && user.password === password
    // );
    if (user) {
      req.session["currentUser"] = user;
      res.json(user);
    } else {
      res.status(403).send("Username or password is incorrect");
    }
  };
  const updateUser = (req, res) => {};
  const logout = (req, res) => {
    req.session.destroy();
    res.send("Session Destroyed");
  };
  const profile = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (currentUser) {
      res.json(currentUser);
    } else {
      res.status(403).send("Not logged in");
    }
  };

  app.get("/api/users", fetchAllUsers);
  app.get("/api/users/:id", findUserById);
  app.post("/api/users/register", register);
  app.post("/api/users/login", login);
  app.post("/api/users/profile", profile);
  app.post("/api/users/logout", logout);
}