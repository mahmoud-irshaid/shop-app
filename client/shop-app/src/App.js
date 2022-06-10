import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { AuthProvider } from './AuthContext';
import { CartProvider } from './CartContext';

import { VerifyAuth } from './VerifyAuth';

const CreateItem = lazy(() => import('./pages/createItem/createItem'));
const CreateStore = lazy(() => import('./pages/createStore/createStore'));
const Item = lazy(() => import('./pages/Item/Item'));
const Store = lazy(() => import('./pages/store/store'));
const Orders = lazy(() => import('./pages/orders/orders'));
const Revenues = lazy(() => import('./pages/revenues/revenues'));
const ShowStore = lazy(() => import('./pages/store/showStore'));
const ShowItem = lazy(() => import('./pages/Item/showItem'));
const Cart = lazy(() => import('./pages/cart/cart'));
const Welcome = lazy(() => import('./pages/welcome/welcome'))
const HomeSeller = lazy(() => import('./pages/homeSeller/home'))
const HomeShopper = lazy(() => import('./pages/homeShopper/home'))
const LogInSeller = lazy(() => import('./pages/signupSeller/login'))
const SignUpSeller = lazy(() => import('./pages/signupSeller/signup'))
const LogInShopper = lazy(() => import('./pages/signupShopper/login'))
const SignUpShopper = lazy(() => import('./pages/signupShopper/signup'))

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>

        <Router>
          <Suspense fallback={
            <center>Loading . . . </center>
          }>
            <Switch>
              <Redirect exact from='/' to='/home-seller' />
              <Route exact path='/signup-seller' component={SignUpSeller} />
              <Route exact path='/login-seller' component={LogInSeller} />
              <Route exact path='/signup-shopper' component={SignUpShopper} />
              <Route exact path='/login-shopper' component={LogInShopper} />
              <Route exact path='/welcome' component={Welcome} />


              <Route exact path='/home-seller'  >
                <VerifyAuth userType={1}>
                  <HomeSeller />
                </VerifyAuth>
              </Route>

              <Route exact path='/home-shopper' >
                <VerifyAuth userType={2}>
                  <HomeShopper />
                </VerifyAuth>
              </Route>


              <Route exact path='/create-store' >
                <VerifyAuth userType={1}>
                  <CreateStore />
                </VerifyAuth>
              </Route>


              <Route exact path='/store/:id' >
                <VerifyAuth userType={1} >
                  <Store />
                </VerifyAuth>
              </Route>


              <Route exact path='/show-store/:id' >
                <VerifyAuth userType={2} >
                  <ShowStore />
                </VerifyAuth>
              </Route>

              <Route exact path='/create-item' >
                <VerifyAuth userType={1}>
                  <CreateItem />
                </VerifyAuth>
              </Route>

              <Route exact path='/item/:id' >
                <VerifyAuth userType={1}>
                  <Item />
                </VerifyAuth>
              </Route>

              <Route exact path='/show-item/:id' >
                <VerifyAuth userType={2}>
                  <ShowItem />
                </VerifyAuth>
              </Route>

              <Route exact path='/orders' >
                <VerifyAuth userType={2}>
                  <Orders />
                </VerifyAuth>
              </Route>

              <Route exact path='/revenues' >
                <VerifyAuth userType={1}>
                  <Revenues />
                </VerifyAuth>
              </Route>

              <Route exact path='/cart' >
                <VerifyAuth userType={2}>
                  <Cart />
                </VerifyAuth>
              </Route>

            </Switch>
          </Suspense>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
export default App;