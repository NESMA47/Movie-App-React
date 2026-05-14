import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Movies from './components/Movies';
import TodoApp from './TODOApp/TodoApp';
import MovieDetails from './components/MovieDetails';
import Favorites from './components/Favorites';
// 1. عدلي الاسم هنا عشان يطابق اللي تحت
import LangProvider from './Context/LangContext'; 

function App() {
 return (
    <BrowserRouter>
      {/* 2. كدة الـ LangProvider بقى متعرف صح */}
      <LangProvider>
        <Navbar />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/movies" component={Movies} />
          <Route path="/todo" component={TodoApp} />
          <Redirect exact from="/" to="/movies" /> 
          <Route path="/movie-details/:id" component={MovieDetails} />
          <Route path="/favorites" component={Favorites} />
        </Switch>
      </LangProvider>
    </BrowserRouter>
  );
}
export default App;