// import { useState } from 'react'
// import { PopupProvider } from './contexts/PopupContext'
// import { CartProvider } from './contexts/CartContext'
// import { ClearancePopup } from './components/ClearancePopup'
// import { MockStore } from './components/MockStore'
// import { AdminDashboard } from './components/AdminDashboard'
// import { Navigation } from './components/Navigation'
// import { Cart } from './components/Cart'
// import './App.css'
// import HomePage from './components/HomePage';


// type Page = 'store' | 'dashboard'

// function App() {
//   const [currentPage, setCurrentPage] = useState<Page>('store')

//   return (
//     <CartProvider>
//       <PopupProvider>
//         <div className="app">
//           <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
          
//           <main className="main-content">
//             {currentPage === 'store' ? (
//               <MockStore />
//             ) : (
//               <AdminDashboard />
//             )}
//           </main>
          
//           <ClearancePopup />
//           <Cart />
//         </div>
//       </PopupProvider>
//     </CartProvider>
//   )
// }

// export default App


import { useState } from 'react'
import { PopupProvider } from './contexts/PopupContext'
import { CartProvider } from './contexts/CartContext'
import { ClearancePopup } from './components/ClearancePopup'
import { MockStore } from './components/MockStore'
import { AdminDashboard } from './components/AdminDashboard'
import { Navigation } from './components/Navigation'
import { Cart } from './components/Cart'
import { QuickCart } from './components/QuickCart'
import HomePage from './components/HomePage'
import SmartAssistant from './components/SmartAssistant'
import './App.css'
import './container.css'

// 🔧 Updated Page type
type Page = 'home' | 'store' | 'dashboard' | 'assistant'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home') // ✅ Start on HomePage

  return (
    <CartProvider>
      <PopupProvider>
        <div className="app">
          <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />

          <main className="main-content">
            {currentPage === 'home' ? (
              <HomePage onPageChange={setCurrentPage} />
            ) : currentPage === 'store' ? (
              <MockStore />
            ) : currentPage === 'assistant' ? (
              <SmartAssistant />
            ) : (
              <AdminDashboard />
            )}
          </main>
          <ClearancePopup />
          
          <QuickCart /> 
          {/* <Cart />  */}
          
        </div>
      </PopupProvider>
    </CartProvider>
  )
}

export default App
