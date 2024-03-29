import React, { Component } from "react";
import axios from "axios";
//import { loadProgressBar } from "axios-progress-bar";
import { loadProgressBar } from "axios-progress-bar";
import NProgress from "nprogress";
import "./nprogress.css";

const eAxios = axios.create();
/*
eAxios.interceptors.request.use(config => {
  //const token = localStorage.getItem("token");
  config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  return config;
});
*/
const AppContext = React.createContext();

export class AppContextProvider extends Component {
  constructor() {
    super();
    //  NProgress.configure({ showSpinner: false });
    NProgress.configure({ minimum: 0.5 });
    this.state = {
      events: {},
      showevents: false,
      eventscols: [
        { title: "Event Name", field: "eventname" },
        { title: "Event Date", field: "eventdate" },
        { title: "Location", field: "eventloc" },
        { title: "Description", field: "eventdes" }
      ],
      user: JSON.parse(localStorage.getItem("user")) || {},
      token: localStorage.getItem("token") || "",
      errmsg: null
    };
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*"
      }
    };
  }

  componentDidMount() {
    this.getEvents(this.state.user.userId);
  }
  /*
  getTodos = () => {
    return todoAxios.get("/api/todo").then(response => {
      this.setState({ todos: response.data });
      return response;
    });
  };

  addTodo = newTodo => {
    return todoAxios.post("/api/todo/", newTodo).then(response => {
      this.setState(prevState => {
        return { todos: [...prevState.todos, response.data] };
      });
      return response;
    });
  };

  editTodo = (todoId, todo) => {
    return todoAxios.put(`/api/todo/${todoId}`, todo).then(response => {
      this.setState(prevState => {
        const updatedTodos = prevState.todos.map(todo => {
          return todo._id === response.data._id ? response.data : todo;
        });
        return { todos: updatedTodos };
      });
      return response;
    });
  };

  deleteTodo = todoId => {
    return todoAxios.delete(`/api/todo/${todoId}`).then(response => {
      this.setState(prevState => {
        const updatedTodos = prevState.todos.filter(todo => {
          return todo._id !== todoId;
        });
        return { todos: updatedTodos };
      });
      return response;
    });
  };

  signup = userInfo => {
    return todoAxios.post("/auth/signup", userInfo).then(response => {
      const { user, token } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      this.setState({
        user,
        token
      });
      return response;
    });
  };
  */
  getEvents = userId => {
    let getEventsURL =
      'https://eventmanagerapi.herokuapp.com/api/events?filter={"where" : {"userId" : "' +
      userId +
      '" }}&access_token=' +
      this.state.token;
    eAxios
      .get(getEventsURL)
      .then(response => {
        this.setState({ events: response.data });
        console.log("response received:", response);
        //    this.setState({ events: response.data }, function() {
        //     console.log(this.state.events);
        //  });
        console.log("events retrieved: ", this.state.events);
        if (
          typeof this.state.events != "undefined" &&
          this.state.events != null &&
          this.state.events.length != null &&
          this.state.events.length > 0
        ) {
          console.log("Entered If block true");
          this.setState({ showevents: true });
        } else {
          console.log("Entered If block false");
          this.setState({ showevents: false });
        }
      })
      .catch(function(error) {
        console.log("AXIOS ERROR: ", error);
      });
  };
  getUser = userId => {
    let getUserURL =
      "https://eventmanagerapi.herokuapp.com/api/Users/" +
      userId +
      "?access_token=" +
      this.state.token;
    eAxios
      .get(getUserURL)
      .then(res => {
        console.log("RESPONSE RECEIVED: ", res);
        this.setState({
          user: {
            realm: res.data.realm,
            username: res.data.username,
            email: res.data.email,
            emailVerified: false,
            userId: res.data.id
          }
        });
        console.log(
          "user updated in context state: " + JSON.stringify(this.state.user)
        );
        localStorage.setItem("user", JSON.stringify(this.state.user));
      })
      .catch(err => {
        console.log("AXIOS ERROR: ", err);
        console.log(err.response.data.error.statuscode);
        let errmsgobj = JSON.stringify(err.response.data.error.statusCode);
        if (errmsgobj === "401") {
          let mesg = "Login Failed. Username or password incorrect";
          console.log(mesg);
          this.setState(state => ({
            errmsg: mesg
          }));
        }
        this.setState(state => ({
          errmsg: err.response.data
        }));
      });
  };

  login = credentials => {
    console.log(credentials);
    NProgress.start();
    return eAxios
      .post(
        "https://eventmanagerapi.herokuapp.com/api/Users/login",
        credentials,
        this.axiosConfig
      )
      .then(response => {
        console.log("RESPONSE RECEIVED: ", response);
        NProgress.done();
        this.setState(state => ({ token: response.data.id }));
        const userId = response.data.userId;
        localStorage.setItem("token", response.data.id);
        this.getUser(userId);
        this.getEvents(userId);
        return response;
      })
      .catch(err => {
        console.log("AXIOS ERROR: ", err);
        NProgress.done();
        console.log(err.response.data.error.statuscode);
        let errmsgobj = JSON.stringify(err.response.data.error.statusCode);
        let mesg = "";
        if (errmsgobj === "401") {
          mesg = "Login Failed. Username or password incorrect";
          console.log(mesg);
          this.setState(state => ({
            errmsg: mesg
          }));
        }
      });
  };
  signup = credentials => {
    console.log(credentials);
    NProgress.start();
    return eAxios
      .post(
        "https://eventmanagerapi.herokuapp.com/api/Users",
        credentials,
        this.axiosConfig
      )
      .then(response => {
        NProgress.done();
        console.log("RESPONSE RECEIVED: ", response);
        /* this.setState(state => ({ token: response.data.id }));
        const userId = response.data.userId;
        localStorage.setItem("token", response.data.id);
        this.getUser(userId); */
        this.setState(state => ({
          errmsg: "Sign up Successful. Please login !"
        }));
        return response;
      })
      .catch(err => {
        NProgress.done();
        console.log("AXIOS ERROR: ", err);
        console.log(err.response.data.error.statuscode);
        let errmsgobj = JSON.stringify(err.response.data.error.statusCode);
        let mesg = "";
        if (errmsgobj === "401") {
          mesg = "Sign Up Failed.";
          console.log(mesg);
          this.setState(state => ({
            errmsg: mesg
          }));
        }
        if (errmsgobj === "422") {
          mesg = "Sign Up Failed. Invalid Email/Username !";
          console.log(mesg);
          this.setState(state => ({
            errmsg: mesg
          }));
        }
      });
  };

  logout = () => {
    NProgress.start();
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    this.setState({
      events: [],
      user: {},
      token: "",
      errmsg: null
    });
    NProgress.done();
  };

  render() {
    return (
      <AppContext.Provider
        value={{
          // getTodos: this.getTodos,
          //addTodo: this.addTodo,
          //editTodo: this.editTodo,
          //deleteTodo: this.deleteTodo,
          //signup: this.signup,
          login: this.login,
          logout: this.logout,
          signup: this.signup,
          getUser: this.getUser,
          getEvents: this.getEvents,
          ...this.state
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export const withContext = Component => {
  return props => {
    return (
      <AppContext.Consumer>
        {globalState => {
          return <Component {...globalState} {...props} />;
        }}
      </AppContext.Consumer>
    );
  };
};
