import Footer from './components/Footer'
import Navbar from './components/Navbar'
import SidePanel from './components/SidePannel'
import Navigation from './pages/Navigation'

const App = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-100 flex flex-col">

      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      <div className="flex flex-1 mt-32 mb-16 relative">

        <div className="fixed top-36 left-4 bottom-20 z-40 w-[400px]">
          <SidePanel />
        </div>

        <div className="ml-[430px] flex-1 overflow-y-auto p-6">
          <Navigation />
        </div>

      </div>

      <div className="fixed bottom-0 left-0 w-full z-50">
        <Footer />
      </div>
    </div>
  )
}

export default App