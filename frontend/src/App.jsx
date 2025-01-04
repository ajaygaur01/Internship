import Create from "./pages/Create"
import Page from "./pages/Page"
import PostDetail from "./pages/PostDetail"
import Chat from "./pages/Resume"
import {BrowserRouter , Routes , Route} from "react-router-dom"
const App = () => {
  return (

<BrowserRouter>
<Routes>

<Route path='/'  element={<Page></Page>}></Route>
<Route path="/post/:id" element={<PostDetail />} />
<Route path="/create" element={<Create></Create>} />
<Route path="/chat" element={<Chat></Chat>} />
</Routes>
</BrowserRouter>

  )
}

export default App