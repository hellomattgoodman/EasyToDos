/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Modal,
  KeyboardAvoidingView,
  Platform
} from 'react-native';


import Login from './components/login';
import LoginError from './components/login-error';
import Registration from './components/registration';
import RegistrationSuccess from './components/registration-success';
import Tasks from './components/tasks';

const App: () => React$Node = () => {
  //set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessageText, setErrorMessageText] = useState('');
  const [currentScreen, setCurrentScreen] = useState('login');

  const logoutUser = () => {
    auth()
      .signOut()
      .then(() => setCurrentScreen('login'));
  };

  const hideError = () => {
    setErrorModalVisible(false);
  };

  const switchScreen = screen => {
    setCurrentScreen(screen);
  };

  if (initializing) {
    return null;
  }

  if (!auth().currentUser) {
    return (
      <>
        <StatusBar barStyle="light-content" />
        <SafeAreaView>
          <Modal animationType='slide' transparent={true} visible={errorModalVisible} onRequestClose={() => hideError()}>
            <LoginError dismissError={hideError} ErrorMessage={errorMessageText} />
          </Modal>
          {currentScreen === 'login' ? <Login doLogin={doLogin} switchScreen={switchScreen} /> : null}
          {currentScreen === 'register' ? <Registration switchScreen={switchScreen} doRegister={doRegister} /> : null}
        </SafeAreaView>
      </>
    );
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flexGrow: 1}}>
        <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === "ios" ? "padding" : "height"}>
          {currentScreen === 'registration-success' ? <RegistrationSuccess switchScreen={switchScreen} /> : null}
          {currentScreen === 'tasks' ? <Tasks logoutUser={logoutUser} User={user} /> : null}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({

});

export default App;
