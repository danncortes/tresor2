// import router from '@/router'

const getToken = () => {
  if (process.browser) {
    const tresor = sessionStorage.getItem('tresor')
    console.log('getToken -> tresor', tresor)
    const { token } = tresor && JSON.parse(tresor)
    console.log('getToken -> token', token)
    return token
  }
  //   try {
  //     return token
  //   } catch (err) {
  //     return null
  //   }
}

const getTokenOrReject = () => {
  try {
    const tresor = sessionStorage.getItem('tresor')
    const { token } = tresor && JSON.parse(tresor)
    return token
  } catch (err) {
    // router.push('/login')
    return null
  }
}

const removeToken = () => {
  sessionStorage.removeItem('tresor')
}

const removeTokenAndReject = () => {
  sessionStorage.removeItem('tresor')
  // router.history.current.path !== '/login' && router.push('/login')
}

export { getToken, getTokenOrReject, removeToken, removeTokenAndReject }
