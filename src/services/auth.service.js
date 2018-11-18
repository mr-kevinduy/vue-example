import firebase from './firebase';

/**
 * Register user with firebase authentication
 * @param  {tring} username   username/email
 * @param  {string} password user password
 * @param  {string} name name of user
 * @param  {string} role     ADMIN/SHOP/USER
 * @return {Promise}
 */
export const register = async (username, password, name = '', role = 'USER') => {
  try {
    const credential = await firebase
      .auth()
      .createUserWithEmailAndPassword(username, password);

    if (credential !== null && credential.user !== null) {
      await credential.user.sendEmailVerification();

      const data = {
        username,
        name,
        role,
        userId: credential.user.uid
      };

      await firebase
        .firestore()
        .collection('users')
        .doc(data.userId)
        .set(data);

      return {
        status: 1,
        code: 'success.AUTH001'
      };
    } else {
      return {
        status: 0,
        code: 'error.AUTH001'
      };
    }
  } catch (err) {
    return {
      status: 0,
      code: 'error.AUTH001'
    };
  }
}

/**
 * Login with firebase authentication
 * @param  {string} username username/email
 * @param  {string} password user password
 * @return {Promise}
 */
export const login = async (username, password) => {
  try {
    const credential = await firebase
        .auth()
        .signInWithEmailAndPassword(username, password);
    console.log(credential);
    if (credential !== null && credential.user !== null) {
      if (credential.user.emailVerified === false) {
        return {
          status: 0,
          code: 'error.AUTH006',
          description: null
        };
      }

      const idToken = await credential.user.getIdToken();

      setToken(firebase.auth().currentUser);

      return {
        status: 1,
        code: 'success.AUTH002',
        description: null
      };
    } else {
      return {
        status: 0,
        code: 'error.AUTH002',
        description: null
      };
    }
  } catch (err) {
    console.log(err);
    return {
      status: 0,
      code: 'error.AUTH002',
      description: null
    }
  }
}

/**
 * Logout with firebase authentication
 * @return {Promise}
 */
export const logout = async () => {
  try {
    await firebase
      .auth()
      .signOut();

    return {
      status: 1,
      code: 'AUTH001'
    };
  } catch (err) {
    return {
      status: 0,
      code: 'AUTH001'
    };
  }
}

/**
 * Get current user
 * @return {Promise}
 */
export const getCurrentUser = async () => {
  try {
    const user = await firebase.auth().onAuthStateChanged();

    return {
      status: 1,
      code: 'AUTH001',
      payload: user
    };
  } catch (err) {
    return {
      status: 0,
      code: 'AUTH001'
    };
  }
}

/**
 * Get user session
 * @return {any}
 */
export function getUserSession() {
  return firebase.auth().currentUser;
}

/**
 * Set token
 * @param {void} token
 */
export function setToken(token) {
  localStorage.setItem('access_token', JSON.stringify(token));
}

/**
 * Set info login
 * @param {any} data
 */
export function setInfoLogin(data) {
  localStorage.setItem('access_token', JSON.stringify(data.access_token));
  localStorage.setItem('refresh_token', JSON.stringify(data.refresh_token));
  localStorage.setItem('user_info', JSON.stringify(data.user_info));
}

/**
 * Get token
 * @return {string} token
 */
export function getToken() {
  return localStorage.getItem('access_token');
}

/**
 * Clear token
 * @return {void}
 */
export function clearToken() {
  localStorage.removeItem('access_token');
}

/**
 * Clear all localstorage
 * @return {void}
 */
export function clearAll() {
  localStorage.clear();
}
