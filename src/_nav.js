/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  // {
  //   component: CNavItem,
  //   name: 'Dashboard',
  //   to: '/dashboard',
  //   icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  //   badge: {
  //     color: 'info',
  //     text: 'NEW',
  //   },
  // },
  // {
  //   component: CNavTitle,
  //   name: 'Theme',
  // },
  // {
  //   component: CNavItem,
  //   name: 'Colors',
  //   to: '/theme/colors',
  //   icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: 'Typography',
  //   to: '/theme/typography',
  //   icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavTitle,
  //   name: 'Components',
  // },
  {
    component: CNavGroup,
    name: 'Coffee',
    to: '/Coffee',
    // icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Sản Phẩm',
        to: '/product/products',
      },
      {
        component: CNavItem,
        name: 'Loại Sản Phẩm',
        to: '/category/categories',
      },
      {
        component: CNavItem,
        name: 'Khu vực',
        to: '/area/areas',
      },
      {
        component: CNavItem,
        name: 'Chiến dịch',
        to: '/campaign/campaigns',
      },
      {
        component: CNavItem,
        name: 'Khuyến mãi',
        to: '/discount/discounts',
      },
      {
        component: CNavItem,
        name: 'Cửa hàng',
        to: '/shop/shops',
      },
      {
        component: CNavItem,
        name: 'Tài khoản',
        to: '/account/accounts',
      },

    ],
  },
]

export default _nav
