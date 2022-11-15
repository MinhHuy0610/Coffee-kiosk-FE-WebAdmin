import React from 'react'
import { AppContent, StaffAppSidebar, AppFooter, AppHeader } from '../components/index'

const StaffDefaultLayout = () => {
  return (
    <div>
      <StaffAppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default StaffDefaultLayout
