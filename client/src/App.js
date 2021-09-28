import React, { useEffect, lazy, Suspense }  from 'react';
import { connect } from 'react-redux';
import {Route, Switch} from 'react-router-dom';

import Version from './components/version/Version.component';

import ErrorBoundary from './components/error-boundary/ErrorBoundary.component';
import HeaderLogedIn from './components/header/HeaderLogedIn.component';
import HeaderLogedOut from './components/header/HeaderLogedOut.component';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.component';
import HomePageRoute from './components/homePageRoute/HomePageRoute.component';
import { isUserLogedIn, activeSpinnerLoader } from './redux/user/user.actions';
import Spinner from './components/Spinner/Spinner';

const HomePage = lazy(() => import('./pages/HomePage/HomePage.page'))
const EnterCoinsPage = lazy(() => import('./pages/EnterCoinsPage/EnterCoinsPage.page'))
const SignInAndSignUpPage = lazy(() => import('./pages/SignInAndSignUpPage/SignInAndSignUpPage.page'))
const WalletTrackerPage = lazy(() => import('./pages/WalletTrackerPage/WalletTrackerPage.page'))
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard.page'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage.page'))
const ConnectorPage = lazy(() => import('./pages/ConnectorPage/ConnectorPage'))

function App({ activeSpinnerLoader, spinnerLoader, isUserLogedIn, logedIn, theme }) {

  // using sagas and redux, storing user in reducer.
  // on componentDidMount sending query to backand asking if user is actually
  // authorized by jwt in cookie. 

 
  useEffect(() => {
    activeSpinnerLoader();
    isUserLogedIn();
  }, [])

  if (!spinnerLoader) {
  return (
    <div >  
          {
            logedIn ? <HeaderLogedIn /> : <HeaderLogedOut />
          }
          <ErrorBoundary> 
            <Suspense fallback={<div className={`suspense suspense__${theme}`}><Spinner theme={theme} /></div>}>
              <Switch>
                <HomePageRoute path='/' component={HomePage} exact  />
                <PrivateRoute path='/enterCoins' component={EnterCoinsPage} exact/>
                <PrivateRoute path='/dashboard' component={Dashboard} exact />
                <PrivateRoute path='/wallet' component={WalletTrackerPage} exact />
                <Route path='/connect' component={ConnectorPage} exact />
                <Route exact path='/signUpSignIn' component={SignInAndSignUpPage} />
                <Route path='*' component={NotFoundPage}/>
              </Switch>
            </Suspense>
          </ErrorBoundary> 
          <Version />
    </div>
  );
  } else {
    return <Spinner color='#511db8' />
  }
}

const mapDispatchToProps = dispatch => ({
  isUserLogedIn: () => dispatch(isUserLogedIn()),
  activeSpinnerLoader: () => dispatch(activeSpinnerLoader())
});

const mapStateToProps = state => ({
  logedIn: state.user.logedIn,
  spinnerLoader: state.user.spinnerLoader,
  theme: state.user.theme
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
