import Create from "./pages/Create"
import Page from "./pages/Page"
import PostDetail from "./pages/PostDetail"
import {BrowserRouter , Routes , Route} from "react-router-dom"
import Register from "./pages/Signup"
import Login from "./pages/login"
import UserPosts from "./pages/Myprofile"
//import SearchResults from "./Components/Search"
const App = () => {
  return (

<BrowserRouter>
<Routes>

<Route path='/home'  element={<Page></Page>}></Route>
<Route path="/" element={<Register></Register>} />
<Route path="/login" element={<Login></Login>} /> 
<Route path="/post/:slug" element={<PostDetail />} />
<Route path="/create" element={<Create></Create>} />
<Route path="/:userId" element={<UserPosts></UserPosts>} />

</Routes>
</BrowserRouter>

  )
}

export default App